import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type TRegistration = {
    email: string
    password: string
    name: string

}

export const registration = async (args: TRegistration) => {
    if (args.email.match(/^[^\s@]+@[^\s@]+$/)) {

    }
    const checkEmail = await prisma.user.findUnique({
        where: {
            email: args.email
        }
    })
    if (checkEmail) {
        // const onRegistr = await prisma.user.create({
        //     data: {
        //         name: args.name,
        //         email: args.email,
        //         pass: {
        //             create: {
        //                 password: args.password
        //             }
        //         }
        //     },

        // })
    }

}