import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

//untuk refresh token
export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.sendStatus(401)
        }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        })

        if (!user) {
            return res.sendStatus(403)
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403)
            }
            const userId = user.id
            const name = user.name
            const email = user.email

            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: '3d'
            })
            res.formatter.ok({ user: { name, email }, accessToken })
        })
    } catch (error) {
        console.log(error)
    }
}