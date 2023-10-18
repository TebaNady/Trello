const validation = (schema) => {
    return (req, res, next) => {
        let {error} = schema.validate(req.body)
        if(error) {
            res.status(400).json({message: "validation is error", error});

        }else {
            next()
        }
    }
}
export default validation;