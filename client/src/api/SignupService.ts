import axios, {AxiosResponse} from "axios";
import {IItem} from "../models/IItem";

export default class SignupService {
    public static readonly mainURL = 'http://172.16.201.169:3001'
    
    static async addUser(username: string, password: string, email: string): Promise<AxiosResponse> {
        return axios.post(`${SignupService.mainURL}/signup`, 
        {User_Name: username,
        User_Password: password,
        User_Email:email
        })
    }

}