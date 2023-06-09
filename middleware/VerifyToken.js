import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        }
        // console.log(decoded)
        req.email = decoded.email;
        req.userId = decoded.userId
        req.name = decoded.name
        next();
    })
}