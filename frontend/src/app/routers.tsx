import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";
import { Registration } from "../pages/auth/registration";
import { Main } from "../pages/mainpage/main";

export const routers = {
    main: "/",
    auth: "/auth",
    registration: "/registration",
    user: "/users/:id",
    users: "users"
}

export const useRouters = (is_auth) => {
    return (
        <Routes>
            {!is_auth ? <>
                <Route path={routers.registration} element={<Registration />} />
                <Route path={routers.auth} element={<Auth />} /></>
                :
                <><Route path="*" element={<Navigate to="/" replace />} />
                </>}
            <Route path={routers.main} element={<Main />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}