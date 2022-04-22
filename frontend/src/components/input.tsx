import { FC } from "react";

export const Input: FC<{
    name: string,
    title: string,
    onChangeInput: (event: { target: { value: string; name: string; }; }) => void,
    placeholder: string
}> = ({ name, title, onChangeInput, placeholder }) => {

    return (
        <div>
            <label htmlFor={name}>{title}</label>
            <input
                placeholder={placeholder}
                type={name}
                name={name}
                id={name}
                onChange={onChangeInput}
            />
        </div>
    )
}