import {SetAuthAction, AuthActionEnum, SetErrorAction, SetUserAction, SetIsLoadingAction} from './types'
import { IUser } from "../../../models/IUser";
import {AppDispatch} from "../../index";
import SignupService from '../../../api/SignupService';
import LoginService from '../../../api/LoginService';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) =>{
        try{
            dispatch(AuthActionCreators.setIsLoading(true))
            dispatch(AuthActionCreators.setUser({username, password}))
            const isAuth = await LoginService.postUser(username, password)
            if (isAuth){
                console.log("true", isAuth)
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
            await SignupService.addUser(username, password, email)
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'))
        }
    }
}