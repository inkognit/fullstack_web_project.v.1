import { SYSTEM_MESSAGE } from '../settings/messages'
import bcrypt = require("bcrypt")
import { PQV } from '../settings/generics'

type TRegistration = {
    login: string
    pass: string
    name: string

}
type TREg = PQV<{ message: string, id: string }, TRegistration>
export const registration: TREg = async ({ prisma }, args) => {
    const resp = { id: '', message: '' }

    if (!args.login.match(/^[^\s@]+@[^\s@]+$/)) {
        const message = SYSTEM_MESSAGE.incorrect_email
        return { ...resp, message }
    }
    if (!args.pass.match(/^[a-zA-Z0-9]{5,15}$/)) {
        const message = SYSTEM_MESSAGE.incorrect_form_password
        return { ...resp, message }
    }
    if (!args.name.match(/^[a-zA-Z'-]{2,15}|[а-яА-ЯёЁ'-]{2,15}$/)) {
        const message = SYSTEM_MESSAGE.incorrect_name
        return { ...resp, message }
    }

    console.log("args: ", args)

    const checkEmail = await prisma.user.findUnique({
        where: {
            email: String(args.login)
        },
        select: {
            id: true
        }
    })
    if (!checkEmail) {
        const solt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(args.pass, solt)

        const user = await prisma.user.create({
            data: {
                name: args.name,
                email: args.login,
                pass: {
                    create: {
                        password
                    }
                }
            },
            select: { id: true }

        })
        return { ...resp, id: user.id }
    } else {
        const message = SYSTEM_MESSAGE.email_already_exist
        return { ...resp, message }
    }

}