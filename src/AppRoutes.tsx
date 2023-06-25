import React from 'react';
import {Route, Routes } from 'react-router-dom';
import {Main} from "./components/Main/Main";
import {Chat} from "./components/Chat/Chat";
import {ThemeType} from "./App";

export const AppRoutes = (props:{theme: ThemeType}) => {
    return (
        <Routes>
            <Route path={'/'} element={<Main theme={props.theme} />}/>
            <Route path={'/chat'} element={<Chat theme={props.theme} />}/>
        </Routes>
    );
};

