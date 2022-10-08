import axios, {AxiosResponse} from "axios";
import {IItem} from "../models/IItem";
import {$authHost, $host} from "./index";

export default class ItemService {
    public static readonly mainURL = 'http://172.16.201.169:3001/api'
    
    static async getItems(){
       // return axios.get<IItem[]>('./items.json')
          const response = axios.get<IItem[]>(`${ItemService.mainURL}/counttransaction/`)
          console.log("getItems: ", response)
       return response.then((data)=> data)
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
       console.log('ItemService addItem item.data.id:',item.data.id)
       const id = item.data.id
       console.log('ItemService addItem item.data.count:',item.data.count)
       const count = item.data.count
       const newItemA = {
        id: id,
        userId: 2,
        count: count
       }
       //const newItem = await $host.post('api/counttransaction/create', {id, userId:1, count})
       //console.log('ItemService addItem newItem:', newItem)
       return item
    }

    static async delItem(data: number | string): Promise<AxiosResponse> {
        console.log("delItem: data", data)
        const url = `${ItemService.mainURL}/del_item/${data}`
        console.log("delItem: url", url)
        return axios.post(url)
    }

    /*static async updateCountItem(data: number | string, count: number): Promise<AxiosResponse> {
        console.log("updateCountItem: data", data)
        console.log("updateCountItem: count", count)
        const url = `${ItemService.mainURL}/update_item_count/${data}`
        console.log("updateCountItem: url", url)
        return axios.post(url, {Item_Count: count})
    }*/

    static async updateCountItem(data: number | string, count: number): Promise<AxiosResponse> {
        console.log("updateCountItem: data", data)
        console.log("updateCountItem: count", count)
        const item = await $host.post('api/counttransaction/create', {data, count})
        console.log("updateCountItem: item", item)
        return item
    }

    static async updateNameItem(data: number | string, name: string): Promise<AxiosResponse> {
        console.log("updateNameItem: data", data)
        console.log("updateNameItem: count", name)
        const url = `${ItemService.mainURL}/update_item_name/${data}`
        console.log("updateNameItem: url", url)
        return axios.post(url, {Item_Name: name})
    }
}