import Menus from "../models/MenuModel.js";

export const IndexMenu = async(req, res) => {
    try {
        const menus = await Menus.findAll({
            where: {
                flag: 1
            }
        })

        res.formatter.ok({ data: menus })
    } catch (error) {
        console.error(error)
    }
}