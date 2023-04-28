import Clusters from "../models/ClusterModel.js";

export const IndexCluster = async(req, res) => {
    try {
        const clusters = await Clusters.findAll({
            where: {
                flag: 1
            },
            include: ['regional']
        })
        res.formatter.ok({ data: clusters })
    } catch (error) {
        console.error(error)
    }
}