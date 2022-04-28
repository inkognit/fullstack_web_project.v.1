import { Button, Grid } from "@material-ui/core";
import { FC, useState } from "react";
import { Input } from "../../components/input";
import { useHTTP } from "../../app/http.hook"

export const Auth: FC = () => {
    const [form, setForm] = useState({})
    const { request } = useHTTP()
    const onChangeInput = (event: { target: { value: string; name: string; }; }) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const onSubmit = async () => {
        const data = await request('/auth/', 'POST', {
            ...form,
        })
        localStorage.setItem("auth_token", data.access_token)
        if (data.message) alert(data.message)

    }
    return (
        <Grid>
            <Grid>
                <Input name="login" title="login: " placeholder="enter your login" onChangeInput={onChangeInput} />
                <Input name="pass" title="pass: " placeholder="enter your pass" onChangeInput={onChangeInput} />
            </Grid>
            <Grid>
                <Button onClick={onSubmit}> login</Button>
            </Grid>
        </Grid>
    )
}