import { connectionDb } from "../database/db.js"
export async function create(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const alreadyExists = await connectionDb.query(`
        SELECT * FROM customers WHERE cpf=$1;
        `,[cpf])
        if(alreadyExists.rowCount>0){
            return res.sendStatus(409)
        }
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
        const cpf = req.query.cpf;
        try {
            if (cpf) {
                const query = "SELECT * FROM customers WHERE cpf LIKE $1;"
                const pattern = `${cpf}%`;
                const cpfToBeFound = await connectionDb.query(query,[pattern]);
                if(cpfToBeFound.rowCount>0){
                    return res.status(200).send(cpfToBeFound.rows);
                }else{
                    return res.sendStatus(404);
                }
            }
        const customers = await connectionDb.query(`
        SELECT * FROM customers;
        `)
        res.status(201).send(customers.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findById(req, res) {
    const {id}= req.params;
    try {
        const customer = await connectionDb.query(`
        SELECT id,name,phone,cpf,TO_CHAR(birthday,'yyyy-mm-dd') as birthday FROM customers WHERE id=$1;
        `,[id]);
        if(customer.rowCount===0){
            return res.sendStatus(404)
        }
        res.status(201).send(customer.rows[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function updateById(req, res) {
    const {id}= req.params;
    const { name, phone, cpf, birthday } = req.body;
    try {
        const customer = await connectionDb.query(`
        UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5;
        `,[name,phone,cpf,birthday,id]);
        if(customer.rowCount===0){
            return res.sendStatus(404)
        }
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message)
    }
}