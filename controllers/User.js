import Users from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
export const getUsers = async(req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
        let userId;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403)
            }
            userId = decoded.userId

        })
        const user = await Users.findOne({
            attributes: { exclude: ['password', 'refresh_token'] },
            where: {
                id: userId,
                flag: 1
            },
            include: ['team', 'site']
        });
        res.formatter.ok(user);
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(400).json({ msg: "Password salah" })

        const userId = user.id
        const name = user.name
        const email = user.email

        const accessToken = jwt.sign({ userId, name, email },
            process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '3d' })

        const refreshToken = jwt.sign({ userId, name, email },
            process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '3d' })
        console.log(refreshToken)
        await Users.update({ refresh_token: refreshToken, last_login_at: new Date() }, {
            where: {
                id: userId
            }
        });
        //mengirim cookie ke client
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

        res.formatter.ok({ user: { name, email }, accessToken })
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.sendStatus(203)
    }
    const user = await Users.findOne({
        where: {
            refresh_token: refreshToken
        }
    })

    if (!user) {
        return res.sendStatus(204)
    }

    const userId = user.id

    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    })

    res.clearCookie('refresh_token');
    return res.formatter.ok({ message: "Logout sukses" })
}