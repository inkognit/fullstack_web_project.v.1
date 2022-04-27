require('dotenv').config()
import { env } from "process"
import jwt = require('jsonwebtoken');
import { onTokenCheck } from "../db/settings/tokens";

export const cookie_middleware = async (req: any, res: any, next: () => void) => {
    if (env.NODE_ENV === "develop") {
        const { access_token } = req.body

        if (access_token) {
            const payload = jwt.decode(access_token)

            if (payload !== null && (typeof payload == "object")) {
                const user_id = payload?.user_id
                console.log("payload: ", payload)
                try {
                    jwt.verify(access_token, env.ACCESS_TOKEN_SECRET as jwt.Secret)
                } catch (error) {
                    const is_tokenChech = await onTokenCheck(user_id)
                    if (is_tokenChech) {
                        console.log("is_token: ", is_tokenChech)

                        return res.status(200).json({ access_token: is_tokenChech })

                    } else {

                        return res.status(404).json({ access_token: is_tokenChech })
                    }
                }
            } else {
                console.log("kyky")
                return res.status(404).json({ access_token: undefined })

            }
        }
        next()
    }
}