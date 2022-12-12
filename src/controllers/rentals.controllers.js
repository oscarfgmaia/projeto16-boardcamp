import { connectionDb } from "../database/db.js"

export async function create(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    if (daysRented <= 0) {
        return res.sendStatus(400);
    }
    try {
        //todo change fixed price
        const gameToBeRented = await connectionDb.query(`
            SELECT * FROM games WHERE id=$1;
        `, [gameId])
        if (gameToBeRented.rowCount === 0) {
            return res.sendStatus(400);
        }
        const customerRenting = await connectionDb.query(`
        SELECT * FROM customers WHERE id=$1;
    `, [customerId])
        if (customerRenting.rowCount === 0) {
            return res.sendStatus(400);
        }
        const priceOfGameToBeRented = gameToBeRented.rows[0].pricePerDay;
        await connectionDb.query(`
        INSERT INTO rentals
            ("customerId","gameId","daysRented","rentDate","returnDate","delayFee","originalPrice")
        VALUES
            ($1,$2,$3,now()::date,null,null,$4);
    `, [customerId, gameId, daysRented, priceOfGameToBeRented * daysRented])
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findAll(req, res) {
    const { customerId, gameId } = req.query;
    let rentals =[];
    try {
        if (customerId || gameId) {
            rentals = await connectionDb.query(`
            SELECT rentals.*,c.name as customer_name,g.name as g_name,categories.name as category_name
        FROM rentals
        LEFT JOIN customers c
        ON rentals."customerId" = c.id
        LEFT JOIN games g
        ON rentals."gameId" = g.id
        LEFT JOIN categories
        ON g."categoryId"=categories.id WHERE "customerId"=$1 OR g.id=$2;
        `, [customerId, gameId])
        } else {
            rentals = await connectionDb.query(`
            SELECT rentals.*,c.name as customer_name,g.name as g_name,categories.name as category_name
        FROM rentals
        LEFT JOIN customers c
        ON rentals."customerId" = c.id
        LEFT JOIN games g
        ON rentals."gameId" = g.id
        LEFT JOIN categories
        ON g."categoryId"=categories.id;
        `,)
        }
        //RETURN QUERY AS JSON FORMAT row_to_json
        // const rentals = await connectionDb.query(`
        // select row_to_json(t)
        // from (
        //   select *,
        //   (
        //     select row_to_json(customers)
        //     from customers
        //     where "customerId"=customers.id
        //   ) as customer,
        //   (
        //     select row_to_json(games)
        //     from games
        //     where "gameId"=games.id
        //   ) as game

        //   from rentals
        // ) t;
        // `)
        const newRentalsObj = rentals.rows.map(r => {
            return {
                id: r.id,
                customerId: r.customerId,
                gameId: r.gameId,
                rentDate: r.rentDate,
                daysRented: r.daysRented,
                returnDate: r.returnDate,
                originalPrice: r.originalPrice,
                delayFee: r.delayFee,
                customer: {
                    id: r.customerId,
                    name: r.customer_name
                },
                game: {
                    id: r.gameId,
                    name: r.g_name,
                    categoryId: r.categoryId,
                    categoryName: r.category_name
                }
            }
        })
        res.status(200).send(newRentalsObj);
    } catch (error) {
        res.status(500).send(error.message)
    }
} 

export async function deleteById(req,res){
    const {id} = req.params;
    const rentalExists = await connectionDb.query(`
        SELECT * FROM rentals WHERE id=$1
    `,[id]);
    if(rentalExists.rowCount===0){
        return res.sendStatus(404);
    }
    if(rentalExists.rowCount>0){
        const returnDateFilled = rentalExists.rows[0].returnDate;
        console.log(returnDateFilled)
        if(!returnDateFilled){
            return res.sendStatus(400);
        }
    }
    await connectionDb.query(`
    DELETE FROM rentals WHERE id=$1
    `,[id])
    res.sendStatus(200);
}