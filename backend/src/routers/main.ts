import express = require("express")


export const rout = express()

rout.get('/', (_req, res) => {
    res.send({ message: "sdsdfdsfsdf" })
})

rout.post('/', (_req, _res) => {

})

rout.get('/users', (_req, res) => {
    return res.send({ message: "sdsdfdsfsdf" })
})