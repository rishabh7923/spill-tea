import type { Handler } from "express";
import { isAuthenticated } from "../../middlewares/auth/isAuthenticated.js";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

import multer from "multer";

import { Post } from "../../database/entities/Post.js";
import { Hashtag } from "../../database/entities/Hashtag.js";
import { In } from "typeorm";
import { optionalAuthenticated } from "../../middlewares/auth/optionalAuthenticated.js";
import { INVALID_PARAMETERS } from "../../common/errors.js";
import { listPostRequestSchema } from "../../schemas/post.js";
import { createPostRequestSchema } from "../../schemas/post.js";
import { validateSchema } from "../../common/utils/validateSchema.js";
import { GoogleGenAI } from "@google/genai";

const upload = multer({ storage: multer.memoryStorage() });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const post: Handler[] = [
    isAuthenticated,
    upload.array("attachments"),
    async (req, res) => {
        const parsed = createPostRequestSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({
            success: false,
            error: Object.assign(INVALID_PARAMETERS, { message: parsed.error.issues[0]?.message })
        })

        const { content, category_id } = parsed.data;

        const files = Array.isArray(req.files) ? req.files : [];
        const tags = Array.from(
            new Set(
                (String(content ?? "")
                    .match(/#(\w+)/g) ?? [])
                    .map((tag) => tag.slice(1).toLowerCase())
            )
        );

        const uploaded = await Promise.all(
            files.map(file =>
                cloudinary.uploader.upload(
                    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                    { folder: 'attachments' }
                )
            )
        );

        if (tags.length) {
            await Hashtag.upsert(tags.map((name) => ({ name })), ["name"]);
        }

        const hashtags = tags.length
            ? await Hashtag.find({ where: { name: In(tags) } })
            : [];

        const newPost = Post.create({
            content,
            category: { id: category_id },
            hashtags,
            user: { id: req.user.id },
            attachments: uploaded.map((x) => ({
                url: x.secure_url,
                public_id: x.public_id
            })),
        })

        if (content.length > 1024) {
            const response = await ai.models.generateContent({
                model: "gemini-3.1-flash-lite",
                contents: `
            You are an AI assistant that summarizes social media posts.
            Summarize the following post in 2-3 sentences.
            Keep the important information.
            Do not add information that isn't present.

            Post: ${content}
            `
            })

            newPost.summary = response.text;
        }

        const { id: postId } = await newPost.save()

        const post = await Post.findOne({
            where: { id: postId },
            relations: { attachments: true, user: true, category: true, hashtags: true }
        });

        res.status(201).json({ success: true, data: { post } });
    }
]

export const get: Handler[] = [
    optionalAuthenticated,
    async (req, res) => {
        const { cursor, limit } = validateSchema(listPostRequestSchema, req.query);
        const [cursorCreatedAt, cursorId] = cursor ? cursor.split("_") : [undefined, undefined];

        const qb = Post.createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("user.avatar", "avatar")
            .leftJoinAndSelect("post.attachments", "attachments")
            .leftJoinAndSelect("post.category", "category")
            .leftJoinAndSelect("post.hashtags", "hashtags");

        if (req.user && req.user.id) {
            qb
                .leftJoin("reactions", "reaction", "reaction.post_id = post.id AND reaction.user_id = :userId", { userId: req.user.id })
                .addSelect("CASE WHEN reaction.id IS NOT NULL THEN true ELSE false END", "liked");
        }

        let { entities: posts, raw } = await qb
            .where(
                (cursorCreatedAt && cursorId)
                    ? "(post.created_at < :createdAt) OR (post.created_at = :createdAt AND post.id < :id)"
                    : "1=1",
                { createdAt: new Date(cursorCreatedAt), id: Number(cursorId) }
            )
            .orderBy("post.created_at", "DESC")
            .addOrderBy("post.id", "DESC")
            .take(limit)
            .getRawAndEntities();

        posts = posts.map((post: any, i) => Object.assign(post, { liked: req.user ? Boolean(+raw[i].liked) : false }))

        const lastPost = posts[posts.length - 1];

        return res.status(200).json({
            success: true,
            data: { posts },
            pagination: {
                next_cursor: lastPost ? `${lastPost.created_at.toISOString()}_${lastPost.id}` : null
            }
        })
    }
]