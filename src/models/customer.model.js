import joi from 'joi'
const customerModel = joi.object({
    name:joi.string().min(3).max(25).required(),
    phone:joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    cpf:joi.string().min(11).max(11).pattern(/^[0-9]+$/).required(),
    birthday:joi.date().max('now').required()//yyyy-mm-dd
})

export default customerModel;