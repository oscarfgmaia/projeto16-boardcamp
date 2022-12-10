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
    const name = req.query.name;
    try {
        if (name) {
            const query = "SELECT * FROM games WHERE name ILIKE $1;"
            const pattern = `${name}%`;
            const gamesToBeFound = await connectionDb.query(query,[pattern]);
            if(gamesToBeFound.rowCount>0){
                return res.status(201).send(gamesToBeFound.rows);
            }else{
                return res.sendStatus(404);
            }
        }
        const games = await connectionDb.query(`
        SELECT * FROM games;
        `)
        res.status(201).send(games.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
} 