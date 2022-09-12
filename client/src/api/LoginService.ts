import axios, {AxiosResponse} from "axios";
import {IItem} from "../models/IItem";

export default class LoginService {
    public static readonly mainURL = 'http://172.16.201.169:3001'
    
    static async getItems(): Promise<AxiosResponse> {
       const response = axios.get<IItem[]>(`${LoginService.mainURL}/items`)
       return response
    }

    static async getItem(data: number | string): Promise<AxiosResponse> {
        console.log('getItem')
        const response = axios.get<IItem>(`${LoginService.mainURL}/item/${data}`)
        return response
     }

    static async addItem(data: string): Promise<AxiosResponse> {
        return axios.post(`${LoginService.mainURL}/add_item`, {Item_Name: data})
    }

    static async delItem(data: number | string): Promise<AxiosResponse> {
        console.log("delItem: data", data)
        const url = `${LoginService.mainURL}/del_item/${data}`
        console.log("delItem: url", url)
        return axios.post(url)
    }

    static async updateCountItem(data: number | string, count: number): Promise<AxiosResponse> {
        console.log("updateCountItem: data", data)
        console.log("updateCountItem: count", count)
        const url = `${LoginService.mainURL}/update_item_count/${data}`
        console.log("updateCountItem: url", url)
        return axios.post(url, {Item_Count: count})
    }

    static async updateNameItem(data: number | string, name: string): Promise<AxiosResponse> {
        console.log("updateNameItem: data", data)
        console.log("updateNameItem: count", name)
        const url = `${LoginService.mainURL}/update_item_name/${data}`
        console.log("updateNameItem: url", url)
        return axios.post(url, {Item_Name: name})
    }
}