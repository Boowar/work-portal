import axios, {AxiosResponse} from "axios";
import {IItem} from "../models/IItem";
import {$authHost, $host} from "./index";

export default class ItemService {
    //public static readonly mainURL = 'http://172.16.201.169:3001/api'
    
    static async getItems(){
       // return axios.get<IItem[]>('./items.json')
          const response = await $host.get<IItem[]>(`api/counttransaction/`)
          console.log("getItems: ", response)
       return response
    }

    static async getItem(data: number | string): Promise<AxiosResponse> {
        console.log('getItem data:', data)
        const response = await $host.get(`api/counttransaction/${data}`)
        console.log("getItem response: ", response)
       return response
     }

    static async addItem(name: string, userId: number): Promise<AxiosResponse> {
       // return axios.post(`${ItemService.mainURL}/add_item`, {Item_Name: data})
       const item = await $host.post('api/item/create', {name, userId})
       console.log('ItemService addItem item:',item)
       return item
    }

    static async delItem(itemId: number ): Promise<AxiosResponse> {
        console.log("delItem: itemId", itemId)
        const item = await $host.post('api/item/delete', {itemId})
        console.log("delItem: item:", item)
        return item
    }

    static async updateCountItem(itemId: number, userId: number, count: number): Promise<AxiosResponse> {
        console.log("updateCountItem: data", itemId)
        console.log("updateCountItem: data", userId)
        console.log("updateCountItem: count", count)
        const item = await $host.post('api/counttransaction/create', {itemId, userId, count})
        console.log("updateCountItem: item", item)
        return item
    }

    static async updateNameItem(itemId: number, name: string): Promise<AxiosResponse> {
        console.log("updateNameItem: itemId", itemId)
        console.log("updateNameItem: name", name)
        const item = await $host.post('api/item/rename', {itemId, name})
        console.log("updateNameItem: item", item)
        return item
    }
}