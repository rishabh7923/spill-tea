import "reflect-metadata";
import 'dotenv/config';

import AppDataSource from "./database/connection.js";

import { seedCategories } from "./database/seeds/seedCategories.js";
import { app } from "./app.js";

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database')

    /** Seeding */
    if (process.env.SEED) seedCategories();
  })

app.listen(+process.env.PORT || 3000, "0.0.0.0", () => {
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});
