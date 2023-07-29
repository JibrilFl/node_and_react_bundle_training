import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {

    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => {
                return (
                    <Route key={path} path={path} Component={Component} exact /> // Ключ exact - путь должен точно совпадать
                )
            })}
            {publicRoutes.map(({path, Component}) => {
                return (
                    <Route key={path} path={path} Component={Component} exact />
                )
            })}
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    );
};

export default AppRouter;