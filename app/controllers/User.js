import Users from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'team_id', 'site_id', 'photo_profile', 'last_login_at']
        }, {
            where: {
                flag: 1
            }
        });
        res.formatter.ok(users);
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