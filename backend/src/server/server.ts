require('dotenv').config()
// import cookieParser from "cookie-parser";
import { Express } from "express";
import { env } from "process"
import { rout } from "../routers/main";
import { auth } from "../routers/auth";
import { cookie_middleware } from "./middleware";
import cors = require("cors");
import express = require("express");


const server: Express = express();
const PORT = Number(env.PORT || 3600)
const NODE_DEP = env.NODE_ENV || 'develop'

server.use(express.json({ limit: "30mb" }));
server.use(express.urlencoded({ limit: "30mb", extended: true }));

// server.use(cookieParser());
server.use(cors())
server.use('*', cookie_middleware)
server.use('/', rout)

server.use('/auth', auth)

server.listen(PORT, () => {
    console.log(`\u3245 we started with http://localhost:${PORT} \n dependency: ${NODE_DEP}`)
})