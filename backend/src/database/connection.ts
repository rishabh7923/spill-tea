import { DataSource } from 'typeorm'
import { User } from './entity/User.js';
import { Otp } from './entity/Otp.js';
import { Post } from './entity/Post.js';
import { Category } from './entity/Category.js';
import { Attachment } from './entity/Attachment.js';
import { Reaction } from './entity/Reaction.js';
import { Comment } from './entity/Comment.js';
import { Hashtag } from './entity/Hashtag.js';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.SQL_HOST!,
    port: Number(process.env.SQL_PORT!),
    username: process.env.SQL_USERNAME!,
    password: process.env.SQL_PASSWORD!,
    database: process.env.SQL_DATABASE!,
    synchronize: true,
    logging: false,
    entities: [
        User,
        Otp,
        Post,
        Category,
        Attachment,
        Reaction,
        Comment,
        Hashtag
    ],
    subscribers: [],
    migrations: [],
    timezone: 'Z'
})


export default AppDataSource;