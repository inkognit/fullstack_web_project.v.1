import { PrismaClient } from "@prisma/client"
import express = require("express")
import { auth } from "../db/auth/auth"
import { registration } from "../db/auth/registration"
const prisma = new PrismaClient()

export const authRout = express()

authRout.get('/', (_req, res) => {
    res.send({ message: "asda" })
})

authRout.post('/', async (req, res) => {
    const data = await auth({ prisma }, req.body)
    res.send({ ...data })
    console.log(data)
    // res.redirect('/')
})

authRout.get('/registration', (_req, res) => {
    res.send({ message: "hi all" })
})
authRout.post('/registration', async (req, res) => {

    const data = await registration({ prisma }, req.body)
    if (data.message) {
        res.send({ status: "OK", message: data.message })
    } else {
        res.send({ status: "OK" })
    }
})


