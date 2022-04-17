import express from "express";

export const auth = express()

auth.get('/', (req, res) => {
    res.send({ message: "asda" })
})

