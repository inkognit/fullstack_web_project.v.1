require('dotenv').config()
import { env } from "process"
import jwt = require('jsonwebtoken');
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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

export const onTokenCheck = async (user_id: string) => {

    let res = ''
    console.log("user_id: ", user_id)
    const user = await prisma.user.findUnique({
        where: {
            id: user_id
        },
        select: {
            refresh: true,
            role: true
        }
    })
    const refresh_secret = env.REFRESH_TOKEN_SECRET as jwt.Secret
    const role = user?.role
    const refresh = user?.refresh

    if (refresh) {
        const refresh_payload = jwt.decode(refresh)
        if (typeof refresh_payload == "object") {
            if (refresh_payload?.user_id !== user_id) {
                return;
            }
        }
        try {
            if (role && jwt.verify(refresh, refresh_secret)) {

                res = onAccessToken(role, user_id)
                return res
            }
        } catch (error) {
            if (role) {

                await prisma.user.update({
                    where: {
                        id: user_id
                    },
                    data: {
                        refresh: null
                    }
                })
                return res
            }
        }

    }
    return

}