import { FC, useState } from "react"
import { useHTTP } from "../../app/http.hook"

export const Registration: FC<{}> = () => {
    const [form, setForm] = useState({ login: '', pass: '' })
    const { request, loading } = useHTTP();

    const register = async () => {
        try {
            await request('/registration', 'POST', {
                ...form,
            })
        } catch (error) {
            console.log(error)
        }
    }
    const onChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div>

                <label htmlFor="login">login</label>
                <input
                    placeholder="enter your login"
                    type="login"
                    name="login"
                    id="login"
                    onChange={onChange}

                />
            </div>
            <div>
                <label htmlFor="pass">password</label>
                <input
                    placeholder="enter your pass"
                    type="pass"
                    name="pass"
                    id="pass"
                    onChange={onChange}
                />

            </div>
            <div>
                <button onClick={register} disabled={loading} >send</button>
            </div>
        </div>
    )
}