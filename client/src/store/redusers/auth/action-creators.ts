import {SetAuthAction, AuthActionEnum, SetErrorAction, SetUserAction, SetIsLoadingAction} from './types'
import { IUser } from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) =>{
        try{
            dispatch(AuthActionCreators.setIsLoading(true))
            const isAuth = await UserService.login(username, password)
            console.log('login isAuth:', isAuth)
            console.log('login isAuth.id:', isAuth.id)
            const id = isAuth.id
            dispatch(AuthActionCreators.setUser({id, username, password}))
            if (isAuth){
                console.log("isAuth:", isAuth)
                dispatch(AuthActionCreators.setIsAuth(true))
            } else {
                console.log("false")
                dispatch(AuthActionCreators.setIsAuth(false))
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при авторизации'))
        }
    },
    logout: () => async (dispatch: AppDispatch) =>{
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    },
    signin: (username: string, password: string, email: string) => async (dispatch: AppDispatch) => {
        try{
            dispatch(AuthActionCreators.setIsLoading(true))
            console.log("signin")
            await UserService.registration(username, password, email)
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'))
        }
    }
}