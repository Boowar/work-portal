import {SetAuthAction, AuthActionEnum, SetErrorAction, SetUserAction, SetIsLoadingAction} from './types'
import { IUser } from "../../../models/IUser";
import {AppDispatch} from "../../index";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) =>{
        try{
            dispatch(AuthActionCreators.setIsLoading(true))
            dispatch(AuthActionCreators.setUser({username, password}))
            dispatch(AuthActionCreators.setIsAuth(true))
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
            
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'))
        }
    }
}