require('dotenv').config()

// import express, { Express } from "express";
import { env } from "process"


// const app: Express = express();


export const cookie_middleware = (req: any, res: any, next: () => void) => {
    if (env.NODE_DEP === "develop") {
        console.log("middleware!")
        // if (req.cookies.auth) {

        // }
        next()
    }
}