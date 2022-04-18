import { FC, useCallback, useEffect, useState } from "react"
import { useHTTP } from "../../app/http.hook"
export type TData = {

    message: string

}
export const Registration: FC<{}> = () => {
    const [form, setForm] = useState({ login: '', pass: '' })

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
            await request('/auth/registration', 'POST', {
                ...form,
            })
        } catch (error) {
            console.log(error)
        }
    }
    // if (data) {
    //     setData(data)

    // }
    console.log("data: ", data?.message)
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
            <div>
                <label htmlFor="pass">password</label>
                <input
                    placeholder="enter your pass"
                    type="pass"
                    name="pass"
                    id="pass"
                    onChange={onChangeInput}
                />

            </div>
            <div>
                <button onClick={onSubmit} disabled={loading} >send</button>
            </div>
        </div>
    )
}