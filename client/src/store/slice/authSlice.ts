import { createSlice, createAsyncThunk, bindActionCreators  } from '@reduxjs/toolkit'
import ItemService from '../../api/ItemService'
import UserService from '../../api/UserService'
import { IUser } from '../../models/IUser'

interface IUser2 {
    username: string;
    password: string;
    email:string;
}

interface IUser3 {
    username: string;
    password: string;
}

export const registration = createAsyncThunk(
    'auth/registaration',
    async (user: IUser2) => {
    console.log('authSlice registration')
    const data = await UserService.registration(user.username, user.password, user.email)
    console.log("authSlice registration data", data)
    console.log("authSlice registration data.items", data)
    return data
})

export const login = createAsyncThunk(
    'auth/login',
    async(user: IUser3) => {
        console.log('authSlice login')
        const isAuth = await UserService.login(user.username, user.password)
        console.log('authSlice login isAuth', isAuth)
        return isAuth
    }
)

const initialState = {
    isAuth: false,
    error: '',
    isLoading: false,
    user: {} as IUser
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = {id:0,username:'', password:''};
            state.isAuth = false;
        }
    },
    extraReducers: {
        [registration.pending.type]: (state) => {
            state.isLoading = true;
          },
        [registration.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [registration.rejected.type]: (state, action) => {
            console.log(action);
            state.isLoading = false;
          },
        [login.pending.type]: (state) => {
            state.isLoading = true;
          },
        [login.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuth = true;
        },
        [login.rejected.type]: (state, action) => {
            console.log(action);
            state.isLoading = false;
          },
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer