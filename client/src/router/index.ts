import React from "react";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup"

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    MAIN='/',
    LOGIN='/login',
    SIGNUP='/signup'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login},
    {path: RouteNames.SIGNUP, exact: true, component: Signup},
    {path: RouteNames.MAIN, exact: true, component: Main}
   ]

export const privateRoutes: IRoute[] = [
 {path: RouteNames.MAIN, exact: true, component: Main}
]