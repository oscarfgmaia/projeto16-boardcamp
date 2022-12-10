import customerModel from "../models/customer.model.js";
export default function customerValidate(req, res, next) {
    console.log(req.body)
    const { error } = customerModel.validate(req.body, { abortEarly: false })
    if (error) {
        const erros = error.details.map(detail => detail.message)
        return res.status(400).send(erros);//422 Unprocessable Entity
    }
    next();
}