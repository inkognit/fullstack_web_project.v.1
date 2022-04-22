import { PrismaClient } from "@prisma/client"
import express = require("express")
import { registration } from "../db/auth/registration"
const prisma = new PrismaClient()

export const auth = express()

auth.get('/', (_req, res) => {
    res.send({ message: "asda" })
})

auth.post('/registration', async (req, res) => {
    console.log("body: ", req.body)
    const data = await registration({ prisma }, req.body)
    if (data.message) {
        console.log("message: ", data.message, '\n data: ', data)
        res.send({ status: "OK", message: data.message })
    } else {
        res.send({ status: "OK" })
    }
})


auth.get('/registration', (_req, res) => {
    res.send({ message: "hi all" })
})
