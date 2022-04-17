import express from "express";

export const rout = express()

rout.get('/', (req, res) => {
    res.send({ message: "sdsdfdsfsdf" })
})