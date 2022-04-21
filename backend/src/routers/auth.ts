import express = require("express")


export const auth = express()

auth.get('/', (_req, res) => {
    res.send({ message: "asda" })
})

auth.post('/registration', (req, _res) => {
    console.log(req.body)

})
auth.get('/registration', (_req, res) => {
    res.send({ message: "asda" })
})
