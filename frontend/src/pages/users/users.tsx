// import { Container, Grid } from "@material-ui/core";
import { FC, useCallback, useEffect, useState } from "react";
import { useHTTP } from "../../app/http.hook";

export const Users: FC<{}> = () => {
    const [data, setData] = useState<{ message: string } | null>(null)
    const { request } = useHTTP()
    const load = useCallback(async () => {
        try {
            const response = await request('/users', 'GET')

            setData({ ...response })
        } catch (error) {
            console.log(error)
        }
    }, [request])

    useEffect(() => {
        load()
    }, [load])
    return (
        <div>
            <h1>
                Users : {data?.message}
            </h1>

        </div>
    )
}