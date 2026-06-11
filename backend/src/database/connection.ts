import { DataSource } from 'typeorm'
import { User } from './entities/User.js';
import { Otp } from './entities/Otp.js';
import { Post } from './entities/Post.js';
import { Category } from './entities/Category.js';
import { Attachment } from './entities/Attachment.js';
import { Reaction } from './entities/Reaction.js';
import { Comment } from './entities/Comment.js';
import { Hashtag } from './entities/Hashtag.js';
import { Avatar } from './entities/Avatar.js';

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
        Hashtag,
        Avatar
    ],
    subscribers: [],
    migrations: [],
    timezone: 'Z'
})


export default AppDataSource;