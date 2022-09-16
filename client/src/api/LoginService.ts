import axios, {AxiosResponse} from "axios";
import {IItem} from "../models/IItem";

export default class LoginService {
    public static readonly mainURL = 'http://172.16.201.169:3001'
    
    static async postUser(username: string, password: string): Promise<AxiosResponse> {
        return axios.get<any>(`${LoginService.mainURL}/login/username=${username}&password=${password}`)
    }
}