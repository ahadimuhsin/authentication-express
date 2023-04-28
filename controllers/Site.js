import Sites from "../models/SiteModel.js";

export const IndexSite = async(req, res) => {
    try {
        const sites = await Sites.findAll({
            where: {
                flag: 1
            },
            include: ['team']
        })
        res.formatter.ok({ data: sites })
    } catch (error) {
        console.error(error)
    }
}