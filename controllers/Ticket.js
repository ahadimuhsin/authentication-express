import Tickets from "../models/TicketModel.js";

export const IndexTicket = async(req, res) => {
    try {
        // console.log(req);
        const tickets = await Tickets.findAll({
            where: {
                category: req.params.id
            },
            include: ['site', 'category_menu']
        })
        res.formatter.ok({ data: tickets })
    } catch (error) {
        console.error(error)
    }
}