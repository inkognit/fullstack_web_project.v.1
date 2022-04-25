require('dotenv').config()
import { env } from "process"
import jwt = require('jsonwebtoken');



export const cookie_middleware = (req: any, _res: any, next: () => void) => {
    if (env.NODE_ENV === "develop") {
        const { access_token } = req.body
        if (access_token) {

            try {
                const is_check = jwt.verify(access_token, env.ACCESS_TOKEN_SECRET as jwt.Secret)
                console.log("is_check: ", is_check)
            } catch (error) {
                console.log("ahtung!!!")
            }
        }

        console.log("middleware!", access_token, "\n", env.ACCESS_TOKEN_SECRET as jwt.Secret)
        // console.log("middleware!", jwt.verify(access_token, env.ACCESS_TOKEN_SECRET as jwt.Secret,(err, verifiedJwt) => {
        // if (err) {
        //     res.send(err.message)
        // } else {
        //     res.send(verifiedJwt)
        // }
        // ))

        // if (req.cookies.auth) {
        ///jwt.verify
        // }
        next()
    }
}