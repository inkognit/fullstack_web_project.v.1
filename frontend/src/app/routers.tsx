import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";
import { Registration } from "../pages/auth/registration";
import { Main } from "../pages/mainpage/main";
import { User } from "../pages/users/user";
import { Users } from "../pages/users/users";

export const routers = {
    main: "/",
    auth: "/auth",
    registration: "/registration",
    user: "/users/:id",
    users: "/users"
}

export const useRouters = (is_auth) => {
    return (
        <Routes>
            {is_auth ? <>
                <Route path={routers.user} element={<User />} />
                <Route path={routers.users} element={<Users />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </> : <>
                <Route path={routers.registration} element={<Registration />} />
                <Route path={routers.auth} element={<Auth />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </>}
            <Route path={routers.main} element={<Main />} />
            <Route path={routers.users} element={<Users />} />
        </Routes>
    )
}