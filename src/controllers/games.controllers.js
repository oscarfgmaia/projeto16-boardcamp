import { connectionDb } from "../database/db.js"

export async function create(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await connectionDb.query(`
        INSERT INTO
            games (name, image, "stockTotal","categoryId","pricePerDay") 
        VALUES
            ($1,$2,$3,$4,$5);
    `, [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findAll(req, res) {
    try {
        const games = await connectionDb.query(`
        SELECT * FROM games;
        `)
        res.status(201).send(games.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
} 