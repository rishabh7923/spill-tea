import express from 'express';
import cors from 'cors';
import createRouter from 'express-file-routing';
import path from 'path';

import { validatePostId } from './middlewares/validation/validatePostId.js';
import { validateCommentId } from './middlewares/validation/validateCommentId.js';
import { validateAvatarId } from './middlewares/validation/validateAvatarId.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiReference } from '@scalar/express-api-reference';
import { openApiDoc } from './docs/registry.js';

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

export { app };

