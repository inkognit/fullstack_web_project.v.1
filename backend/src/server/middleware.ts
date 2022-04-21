require('dotenv').config()

// import { Express } from "express";
import { env } from "process"


// const app: Express = express();


export const cookie_middleware = (_req: any, _res: any, next: () => void) => {
    if (env.NODE_ENV === "develop") {
        console.log("middleware!")
        // if (req.cookies.auth) {

        // }
        next()
    }
}