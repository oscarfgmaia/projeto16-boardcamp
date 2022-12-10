import joi from "joi";

const categoryModel = joi.object({
    name:joi.string().required().min(3).max(20)
})

export default categoryModel;