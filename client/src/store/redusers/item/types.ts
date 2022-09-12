import { IItem } from "../../../models/IItem";

export interface ItemState {
    items: IItem[];
}

export enum ItemActionEnum {
    ADD_ITEM = "ADD_ITEM",
    DEL_ITEM = "DEL_ITEM",
    SET_ITEM = "SET_ITEM",
    SET_ERROR = "SET_ERROR",
    UPDATE_ITEM = "UPDATE_ITEM",
    SORT_BY_INC_COUNT_ITEM = "SORT_BY_INC_COUNT_ITEM",
    SORT_BY_DEC_COUNT_ITEM = "SORT_BY_DEC_COUNT_ITEM"
}

export interface SetItemAction {
    type: ItemActionEnum.SET_ITEM;
    payload: Array<IItem> | [] | any;
}

export interface AddItemAction {
    type: ItemActionEnum.ADD_ITEM;
    payload: string;
}

export interface DelItemAction {
    type: ItemActionEnum.DEL_ITEM;
    payload: Array<IItem> | [] | any;
}

export interface SetErrorAction {
    type: ItemActionEnum.SET_ERROR;
    payload: string;
}

export interface UpdateItemAction {
    type: ItemActionEnum.UPDATE_ITEM;
    payload: IItem;
}

export interface SortByIncCountItemAction {
    type: ItemActionEnum.SORT_BY_INC_COUNT_ITEM;
}

export interface SortByDecCountItemAction {
    type: ItemActionEnum.SORT_BY_DEC_COUNT_ITEM;
}

export type ItemAction = 
    SetItemAction  |
    AddItemAction  | 
    DelItemAction  |
    SetErrorAction |
    UpdateItemAction |
    SortByIncCountItemAction |
    SortByDecCountItemAction 