import { Category } from "../entities/Category.js";

export async function seedCategories() {
    await Category.insert([
        {
            id: 1,
            name: "issue",
        },
        {
            id: 2,
            name: "confession"
        }, {
            id: 3,
            name: "meme"
        }, {
            id: 4,
            name: "question"
        },
        {
            id: 5,
            name: "general"
        }
    ])

    console.log("Categories seeded successfully")
}