import { IItem } from "../../../models/IItem";
import { ItemAction, ItemActionEnum, ItemState } from "./types";

const initialState: ItemState = {
    items:[{id: '', name: '', count: 0}]
}

export default function itemReducer(state = initialState, action: ItemAction): ItemState {
    switch (action.type){
        case ItemActionEnum.ADD_ITEM:
            const newItem = {id: 989898, name: action.payload, count:0}
            console.log('state!@',state)
            return {...state,  items: [...state.items, newItem]}
        case ItemActionEnum.DEL_ITEM:
            return {...state,  items: state.items.filter(item => item.id !== action.payload.id)}
        case ItemActionEnum.SET_ITEM:
            return {...state,  items: action.payload}
        case ItemActionEnum.UPDATE_ITEM:
            return {...state, items: state.items.map((item) => item.id === action.payload.id ? 
            action.payload : item)}
        case ItemActionEnum.SORT_BY_INC_COUNT_ITEM:
            return {...state,  items: state.items.sort((a, b) => b.count - a.count)}
        case ItemActionEnum.SORT_BY_DEC_COUNT_ITEM:
            return {...state,  items: state.items.sort((a, b) => a.count - b.count)}

        default:
            return state;
    }
}