import express from "express";

export const auth = express()

auth.get('/', (req, res) => {
    res.send({ message: "asda" })
})

auth.post('/registration', (req, res) => {
    console.log(req.body)

})
auth.get('/registration', (req, res) => {
    res.send({ message: "asda" })
})
