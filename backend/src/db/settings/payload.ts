export enum EUserRole {
    admin = "admin",
    author = "author",
    editor = "editor",
    user = "user",
}

export type TUsers_init = {
    id: string
    name: string
    created_at: number
}

export type TUser_init = {
    id: string
    name: string
    created_at: number
    email: string
}