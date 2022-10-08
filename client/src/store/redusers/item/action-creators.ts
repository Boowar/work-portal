import ItemService from "../../../api/ItemService";
import { IItem } from "../../../models/IItem";
import { IItemDB } from "../../../models/IItemDB";
import {AppDispatch} from "../../index";
import {ItemActionEnum, SetErrorAction, SetItemAction, SortByIncCountItemAction, SortByDecCountItemAction} from './types'

export const ItemActionCreators = {
setItem: (payload: Array<IItem>): SetItemAction => ({type: ItemActionEnum.SET_ITEM, payload}),
addItem: (payload: string, userId:number) => async(dispatch: AppDispatch) => {
    console.log("addItem1", payload)
    if(!payload || payload === "null" ){
        payload="Не забывай называть!"
    }
    try{      
       const newItem = await ItemService.addItem(payload, userId)
       console.log('newItem', newItem)

        dispatch({type: ItemActionEnum.ADD_ITEM, payload})
    } catch (e) {
        console.log('Ошибка', e)
        dispatch(ItemActionCreators.setError("Произошла ошибка при добавлении элемента"))
}},
delItem: (payload: any) =>  async(dispatch: AppDispatch) => {
    try{      
        await ItemService.delItem(payload.id)
        dispatch({type: ItemActionEnum.DEL_ITEM, payload})
    } catch (e) {
        console.log('Ошибка', e)
        dispatch(ItemActionCreators.setError("Произошла ошибка при удалении"))
}},
setError: (payload: string): SetErrorAction => ({type: ItemActionEnum.SET_ERROR, payload}),
incCountItem: (payload: any) =>  async(dispatch: AppDispatch) => {
    try{
        console.log('incCountItem payload',payload)
        const currentItem = await ItemService.getItem(payload.id)
        console.log('currentItem', currentItem)
        const currentCount = currentItem.data.count
        console.log('currentCount', currentCount)
        const newpayload = currentCount + 1
        payload = {...payload, count: newpayload }
        await ItemService.updateCountItem(payload.id, newpayload)
        dispatch({type: ItemActionEnum.UPDATE_ITEM, payload})
    } catch (e) {
        console.log('Ошибка', e)
        dispatch(ItemActionCreators.setError("Произошла ошибка при добавлении очков"))
}},
decCountItem: (payload: any) =>  async(dispatch: AppDispatch) => {
    try{
        const currentItem = await ItemService.getItem(payload.id)
        console.log('currentItem', currentItem)
        const currentCount = currentItem.data.item[currentItem.data.item.length - 1].Item_Count
        console.log('currentCount', currentCount)
        const newpayload = currentCount - 1
        payload = {...payload, count: newpayload }
        await ItemService.updateCountItem(payload.id, newpayload)
        dispatch({type: ItemActionEnum.UPDATE_ITEM, payload})
    } catch (e) {
        console.log('Ошибка', e)
        dispatch(ItemActionCreators.setError("Произошла ошибка при удалении очков"))
}},
nameItem: (payload: any, name: string) =>  async(dispatch: AppDispatch) => {
    try{
        const currentItem = await ItemService.getItem(payload.id)
        const currentCount = currentItem.data.item[0].Item_Name
        console.log('currentCount', currentCount)
        const newpayload = name
        payload = {...payload, name: newpayload }
        await ItemService.updateNameItem(payload.id, newpayload)
        dispatch({type: ItemActionEnum.UPDATE_ITEM, payload})
    } catch (e) {
        console.log('Ошибка', e)
        dispatch(ItemActionCreators.setError("Произошла ошибка при переименовании элемента"))
}},  
fetchItems: () => async(dispatch: AppDispatch) => {
    try {
        setTimeout(async () => {
            const {data} = await ItemService.getItems()
            console.log("response", data)
            const items:Array<IItem> = []
           data.map((item:any) => {
                const temp:IItem = {id:0,name:'',count:0}
                console.log('fetchItems data.map item:', item)
                temp.id = item.item.id
                temp.name = item.item.name
                temp.count = item.count
                items.push(temp)
            })
            dispatch(ItemActionCreators.setItem(items))
        }, 1000)
    } catch (e) {
        console.log('Ошибка', e)
        dispatch(ItemActionCreators.setError("Произошла ошибка при загрузке элементов"))
    }
},
sortByIncCountItem: (): SortByIncCountItemAction => ({type: ItemActionEnum.SORT_BY_INC_COUNT_ITEM}),
sortByDecCountItem: (): SortByDecCountItemAction => ({type: ItemActionEnum.SORT_BY_DEC_COUNT_ITEM}),
}