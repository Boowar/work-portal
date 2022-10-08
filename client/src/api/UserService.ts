import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import axios, {AxiosResponse} from "axios";
import { IUser } from "../models/IUser";

export default class UserService {

    static async registration (username:string, password:string, email:string) {
        const {data} = await $host.post('api/user/registration', {username, password, email, role: 'user'})
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }

    static async login (username:string, password:string): Promise<IUser> {
        const {data} = await $host.post('api/user/login', {username, password})
        console.log('UserService login data:', data)
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }

    static async check () {
        const {data} = await $authHost.get('api/user/auth' )
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
}