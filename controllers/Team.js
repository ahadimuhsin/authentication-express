import Teams from "../models/TeamModel.js";

export const IndexTeam = async(req, res) => {
    try {
        const teams = await Teams.findAll({
            where: {
                flag: 1
            },
            include: ['cluster']
        })
        res.formatter.ok({ data: teams })
    } catch (error) {
        console.error(error)
    }
}