import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import ItemService from '../../api/ItemService'
import Item from '../../components/Item'
import { IItem } from '../../models/IItem'

export const fetchItems = createAsyncThunk(
    'item/fetchItems',
    async (_, thunkAPI) => {
    console.log('PersonActionCreators fetchPersons')
    const data = await ItemService.getItems()
    console.log("fetchPersons data", data)
    console.log("fetchPersons data.items", data.data)
    //thunkAPI.dispatch(setItems(data.data)) 
    return data.data
})

interface INewUser {
    id: number;
    name: string;
}

interface INewCount {
    id: number;
    count: number;
    name: string;
    itemId: number;
}

interface INewItem {
    id: number;
    name: string;
}

interface IDeletedItem {
    itemId: number;
}

export const addItem = createAsyncThunk(
    'item/addItem',
    async (data: INewUser ) => {
        const newItem = await ItemService.addItem(data.name, data.id)
        return newItem
    }
)

export const incCountItem = createAsyncThunk(
    'item/incCountItem',
    async (data: INewCount ) => {
        console.log('incCountItem data 1',data)
        const currentItem = await ItemService.getItem(data.id)
        console.log('currentItem', currentItem)
        const currentCount = currentItem.data.count
        console.log('currentCount', currentCount)
        const newCount = currentCount + 1
        data = {
            ...data,
            count: newCount
        }
        console.log('incCountItem data 2', data)
        const newCountItem = await ItemService.updateCountItem(currentItem.data.item.id, data.id, data.count)
        console.log('incCountItem item/incCountItem newCountItem:', newCountItem)
        return newCountItem
    }
)

export const decCountItem = createAsyncThunk(
    'item/decCountItem',
    async (data: INewCount ) => {
        console.log('incCountItem data 1',data)
        const currentItem = await ItemService.getItem(data.id)
        console.log('currentItem', currentItem)
        const currentCount = currentItem.data.count
        console.log('currentCount', currentCount)
        const newCount = currentCount - 1
        data = {
            ...data,
            count: newCount
        }
        console.log('incCountItem data 2', data)
        const newCountItem = await ItemService.updateCountItem(currentItem.data.item.id, data.id, data.count)
        console.log('incCountItem item/incCountItem newCountItem:', newCountItem)
        return newCountItem
    }
)

export const renameItem = createAsyncThunk(
    'item/renameItem',
    async (data: INewItem ) => {
        console.log('renameItem data 1',data)
        const updatedItem = await ItemService.updateNameItem(data.id, data.name)
        console.log('renameItem item/renameItem newCountItem:', updatedItem)
        return updatedItem
    }
)

export const delItem = createAsyncThunk(
    'item/delItem',
    async (data: IDeletedItem) => {
        console.log('delItem', data)
        const deletedItem = await ItemService.delItem(data.itemId)
        console.log('delItem deletedItem', deletedItem)
        return deletedItem
    }
)

const initialState = {
    error: '',
    isLoading: false,
    items: [] as IItem[],
    sortedItems: [] as IItem[],
    sorting: 'ALL'
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload
        },
        setError(state, action){
            state.error = action.payload
        },
        setSort(state, action){
            state.sorting = action.payload
        }
    },
    extraReducers: {
        [fetchItems.pending.type]: (state) => {
            state.isLoading = true;
            state.error = ''
          },
        [fetchItems.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.items = action.payload
            state.sortedItems = state.items
        },
        [fetchItems.rejected.type]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.error = "Ошибка при получении данных"
          },
        [addItem.pending.type]: (state) => {
            state.isLoading = true;
          },
        [addItem.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.items.concat(action.payload)
        },
        [addItem.rejected.type]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.error = "Ошибка при добавлении элемента"
          },
        [incCountItem.pending.type]: (state) => {
            state.isLoading = true;
          },
        [incCountItem.fulfilled.type]: (state) => {
            state.isLoading = false;
            //console.log('incCountItem.fulfilled.type:', action)
        },
        [incCountItem.rejected.type]: (state, action) => {
            console.log('incCountItem.rejected.type:', action);
            state.isLoading = false;
            state.error = "Ошибка при изменении данных"
          },
        [renameItem.pending.type]: (state) => {
            state.isLoading = true;
          },
        [renameItem.fulfilled.type]: (state) => {
            state.isLoading = false;
            //console.log('incCountItem.fulfilled.type:', action)
        },
        [renameItem.rejected.type]: (state, action) => {
            console.log('renameItem.rejected.type:', action);
            state.isLoading = false;
            state.error = "Ошибка при изменении данных"
          },
        [delItem.pending.type]: (state) => {
            state.isLoading = true;
          },
        [delItem.fulfilled.type]: (state) => {
            state.isLoading = false;
            //console.log('incCountItem.fulfilled.type:', action)
        },
        [delItem.rejected.type]: (state, action) => {
            console.log('renameItem.rejected.type:', action);
            state.isLoading = false;
            state.error = "Ошибка при удалении данных"
          }, 
    }
})

console.log('itemSlice:', itemSlice)

export const {setItems, setError, setSort} = itemSlice.actions
export default itemSlice.reducer