import Regionals from "../models/RegionalModel.js";

export const IndexRegional = async(req, res) => {
    try {
        const regionals = await Regionals.findAll({
            where: {
                flag: 1
            }
        })

        res.formatter.ok({ data: regionals })
    } catch (error) {
        console.error(error)
    }
}