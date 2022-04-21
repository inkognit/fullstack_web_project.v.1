import express = require("express")


export const rout = express()

rout.get('/', (_req, res) => {
    res.send({ message: "sdsdfdsfsdf" })
})