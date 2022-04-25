// require('dotenv').config()
// import { env } from "process"
import bcrypt = require("bcrypt")
import { PQV } from "../settings/generics"
import { SYSTEM_MESSAGE } from "../settings/messages"
// import jwt = require('jsonwebtoken');
import { onAccessToken, onRefreshToken } from "../settings/tokens"

type TInput = {
    login: string
    pass: string
}
type TOutput = {
    message: string
    access_token: string
}
type auth_db = PQV<TOutput, TInput>
export const auth: auth_db = async ({ prisma }, args) => {
    const resp = {
        message: "",
        access_token: ""
    }

    const hash = await prisma.user.findUnique({
        where: {
            email: String(args.login)
        },
        select: {
            pass: {
                select: {
                    password: true,
                }
            },
            id: true,
            role: true
        }
    })

    if (hash?.pass?.password) {
        const checkPass = bcrypt.compareSync(args.pass, hash.pass.password)
        if (checkPass) {
            const access_token = onAccessToken(hash.role, hash.id)
            const refresh_token = onRefreshToken(hash.role, hash.id).refresh_token
            await prisma.user.update({
                where: {
                    id: hash.id
                },
                data: {
                    refresh: refresh_token
                }
            })
            return { ...resp, access_token }
        }
        return { ...resp, message: SYSTEM_MESSAGE.incorrect_password }
    } else {
        return { ...resp, message: SYSTEM_MESSAGE.email_does_not_exist }
    }

}