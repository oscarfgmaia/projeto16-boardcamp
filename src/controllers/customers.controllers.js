import { connectionDb } from "../database/db.js"
export async function create(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        await connectionDb.query(`
        INSERT INTO
            customers (name, phone, cpf, birthday)
        VALUES
            ($1,$2,$3,$4);
        `, [name, phone, cpf, birthday])
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findAll(req, res) {
    try {
        const customers = await connectionDb.query(`
        SELECT * FROM customers;
        `)
        res.status(201).send(customers.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
}