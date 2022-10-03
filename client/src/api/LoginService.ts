import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import axios, {AxiosResponse} from "axios";
import {IItem} from "../models/IItem";

export default class LoginService {

    static async registration (email:string, password:string) {
        const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }

    static async login (username:string, password:string) {
        const {data} = await $host.post('api/user/login', {username, password})
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }

    static async check () {
        const {data} = await $authHost.get('api/user/auth' )
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
}