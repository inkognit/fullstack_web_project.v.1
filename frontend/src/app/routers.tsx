import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Registration } from "../pages/auth/registration";
import { Main } from "../pages/mainpage/main";

export const routers = {
    main: "/",
    auth: "/auth",
    registration: "/registration",
    user: "/users/:id",
    users: "users"
}

export const useRouters = () => {
    return (
        <Routes>
            <Route path={routers.main} element={<Main />} />
            <Route path={routers.registration} element={<Registration />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}