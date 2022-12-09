import { connectionDb } from "../database/db.js"

export async function create(req, res) {
    const { name } = req.body;
    try {
        await connectionDb.query(`
        INSERT INTO categories (name) VALUES ($1);
    `, [name])
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findAll(req, res) {
    try {
        const categories = await connectionDb.query(`
        SELECT * FROM categories;
        `)
        res.status(201).send(categories.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
} 