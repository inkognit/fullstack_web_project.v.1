require('dotenv').config()
// import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { env } from "process"
import { rout } from "../routers/main";
import { auth } from "../routers/auth";
import { cookie_middleware } from "./middleware";
import cors from "cors"

const server: Express = express();
const PORT = Number(env.PORT || 3600)
const NODE_DEP = env.NODE_DEP || 'develop'

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