import axios, {AxiosResponse} from "axios";
import {IItem} from "../models/IItem";

export default class ItemService {
    public static readonly mainURL = 'http://172.16.201.169:3001/api'
    
    static async getItems(){
       // return axios.get<IItem[]>('./items.json')
          const response = axios.get<IItem[]>(`${ItemService.mainURL}/counttransaction`)
          console.log("getItems", response)
       return response.then((data)=> data)
    }

    static async getItem(data: number | string): Promise<AxiosResponse> {
        console.log('getItem')
        const response = axios.get<IItem>(`${ItemService.mainURL}/item/${data}`)
        return response
     }

    static async addItem(data: string): Promise<AxiosResponse> {
        return axios.post(`${ItemService.mainURL}/add_item`, {Item_Name: data})
    }

    static async delItem(data: number | string): Promise<AxiosResponse> {
        console.log("delItem: data", data)
        const url = `${ItemService.mainURL}/del_item/${data}`
        console.log("delItem: url", url)
        return axios.post(url)
    }

    static async updateCountItem(data: number | string, count: number): Promise<AxiosResponse> {
        console.log("updateCountItem: data", data)
        console.log("updateCountItem: count", count)
        const url = `${ItemService.mainURL}/update_item_count/${data}`
        console.log("updateCountItem: url", url)
        return axios.post(url, {Item_Count: count})
    }

    static async updateNameItem(data: number | string, name: string): Promise<AxiosResponse> {
        console.log("updateNameItem: data", data)
        console.log("updateNameItem: count", name)
        const url = `${ItemService.mainURL}/update_item_name/${data}`
        console.log("updateNameItem: url", url)
        return axios.post(url, {Item_Name: name})
    }
}