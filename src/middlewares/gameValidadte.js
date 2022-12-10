import gameModel from "../models/game.model.js";
export default function gameValidate(req, res, next) {
    const { error } = gameModel.validate(req.body, { abortEarly: false })
    if (error) {
        const erros = error.details.map(detail => detail.message)
        return res.status(400).send(erros);//422 Unprocessable Entity
    }
    next();
}