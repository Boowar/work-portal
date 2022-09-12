import ItemService from "../../../api/ItemService";
import { IItem } from "../../../models/IItem";
import { IItemDB } from "../../../models/IItemDB";
import {AppDispatch} from "../../index";
import {ItemActionEnum, SetErrorAction, SetItemAction, SortByIncCountItemAction, SortByDecCountItemAction} from './types'

export const ItemActionCreators = {
setItem: (payload: Array<IItem>): SetItemAction => ({type: ItemActionEnum.SET_ITEM, payload}),
addItem: (payload: string) => async(dispatch: AppDispatch) => {
    console.log("addItem1", payload)
    if(!payload || payload === "null" ){
        payload="Не забывай называть!"
    }
    try{      
        await ItemService.addItem(payload)
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
        const currentItem = await ItemService.getItem(payload.id)
        console.log('currentItem', currentItem)
        const currentCount = currentItem.data.item[currentItem.data.item.length - 1].Item_Count
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
            const response = await ItemService.getItems()
            const items:Array<IItem> = []
            response.data.items.map((item:IItemDB) => {
                const temp:IItem = {id:0,name:'',count:0}
                temp.id = item.Item_ID
                temp.name = item.Item_Name
                temp.count = item.Item_Count
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