require('dotenv').config()
import { env } from "process"
import jwt = require('jsonwebtoken');

export const token: {
    access: {
        type: "access",
        expiresIn: string | number | undefined
    },
    refresh: {
        type: "refresh",
        expiresIn: string | number | undefined
    }
} = {
    access: {
        type: "access",
        expiresIn: "2m"
    },
    refresh: {
        type: "refresh",
        expiresIn: "1d"
    }
}

export const onAccessToken = (role: "ADMIN" | "USER", user_id: string) => {
    const is_admin = role === "ADMIN"
    const payload = { user_id, is_admin, type: token.access.type }
    const secret = env.ACCESS_TOKEN_SECRET as jwt.Secret

    return jwt.sign(payload, secret, { expiresIn: token.access.expiresIn })
}


export const onRefreshToken = (role: "ADMIN" | "USER", user_id: string) => {
    const is_admin = role === "ADMIN"
    const payload = { user_id, is_admin, type: token.refresh.type }
    const secret = env.REFRESH_TOKEN_SECRET as jwt.Secret
    const refresh_token = jwt.sign(payload, secret, { expiresIn: token.refresh.expiresIn })
    return { user_id, refresh_token }
}