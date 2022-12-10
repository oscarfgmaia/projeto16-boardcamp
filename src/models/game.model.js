import joi from "joi";

const gameModel = joi.object({
    name: joi.string().min(3).max(20).required(),
    image: joi.string().uri().required(),
    categoryId:joi.number().integer().required(),
    stockTotal: joi.number().integer().required(),
    pricePerDay: joi.number().required()
})

export default gameModel;