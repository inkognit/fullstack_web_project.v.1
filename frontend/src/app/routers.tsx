import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Registration } from "../pages/auth/registration";
import { Main } from "../pages/mainpage/main";


export const useRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}