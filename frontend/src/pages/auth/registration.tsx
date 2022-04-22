import { FC, useCallback, useEffect, useState } from "react"
import { useHTTP } from "../../app/http.hook"
import { Input } from "../../components/input"
export type TData = {

    message: string

}
export const Registration: FC<{}> = () => {
    const [form, setForm] = useState({ login: '', pass: '', name: '' })

    const [data, setData] = useState<TData | null>(null)
    const { request, loading } = useHTTP();

    const load = useCallback(async () => {
        try {
            const response = await request('/auth/registration', 'GET')
            setData({ ...response })
        } catch (error) {
            console.log(error)
        }
    }, [request])

    useEffect(() => {
        load()
    }, [load])

    const onSubmit = async () => {
        try {
            console.log("form: ", form);
            const res = await request('/auth/registration', 'POST', {
                ...form,
            })
            if (res.message) alert(res.message)
        } catch (error) {
            console.log(error)
        }
    }
    // if (data) {
    //     setData(data)

    // }
    console.log("data response: ", data?.message)
    const onChangeInput = (event: { target: { value: string; name: string; }; }) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div>
                <div>
                    <h1>

                        {data?.message}
                    </h1>
                </div>
                <label htmlFor="login">login</label>
                <input
                    placeholder="enter your login"
                    type="login"
                    name="login"
                    id="login"
                    onChange={onChangeInput}

                />
            </div>
            <Input
                name={"pass"}
                title={"password"}
                placeholder={"enter your pass"}
                onChangeInput={onChangeInput}
            />
            <Input
                name={"name"}
                title={"name"}
                placeholder={"enter your name"}
                onChangeInput={onChangeInput}
            />
            {/* <Input name={"nickname"} title={"nickname"} placeholder={"enter your nickname"} onChangeInput={onChangeInput} /> */}
            <div>
                <button onClick={onSubmit} disabled={loading} >send</button>
            </div>
        </div>
    )
}