import "reflect-metadata";
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import AppDataSource from "./database/connection.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { validateCommentId } from "./middlewares/validation/validateCommentId.js";
import { seedCategories } from "./database/seeds/seedCategories.js";
import { openApiDoc } from "./docs/registry.js";
import { apiReference } from "@scalar/express-api-reference"
import { validatePostId } from "./middlewares/validation/validatePostId.js";
import { validateAvatarId } from "./middlewares/validation/validateAvatarId.js";
import createRouter from "express-file-routing";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

/* Auto-register routes from the routes directory */
await createRouter(app, {
  directory: path.join(import.meta.dirname, 'routes'),
});

/* Validate parameters */
app.param('postId', validatePostId);
app.param('commentId', validateCommentId);
app.param('avatarId', validateAvatarId);


/* Other */
app.use(errorHandler);
app.use(
  "/docs",
  apiReference({
    spec: {
      url: "/openapi.json"
    }
  })
)

app.get("/openapi.json", (_, res) => res.json(openApiDoc))

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database')

    /** Seeding */
    if (process.env.SEED) seedCategories();
  })

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});
