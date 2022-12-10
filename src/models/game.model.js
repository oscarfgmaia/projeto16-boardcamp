import joi from "joi";

const gameModel = joi.object({
    name: joi.string().min(3).max(20).required(),
    image: joi.string().uri().required(),
    categoryId:joi.number().integer().greater(0).required(),
    stockTotal: joi.number().integer().greater(0).required(),
    pricePerDay: joi.number().required()
})

export default gameModel;