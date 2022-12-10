import categoryModel from "../models/category.model.js";
export default function categoryValidate(req, res, next) {
    const { error } = categoryModel.validate(req.body, { abortEarly: false })
    if (error) {
        const erros = error.details.map(detail => detail.message)
        return res.status(400).send(erros);//422 Unprocessable Entity
    }
    next();
}