import { FC } from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from 'react-router-dom';
import { RouteNames } from '../router';
import Button from './Button'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { logout } from "../store/slice/authSlice";

const Header: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const navigate = useNavigate()
    console.log('Header user', user)
    return (
        <div className="header">
            {isAuth 
            ?
            <>
            <div className="header-name">
                Hello, {user.username}!
            </div>
            <Button text="Выйти" 
                onClick={()=> dispatch(logout())} 
                className="header-button"/>
            </>
            :
            <>
            <Button text="Войти" 
                onClick={()=> navigate(RouteNames.LOGIN)} 
                className="header-button"/>
            <Button text="Зарегистрироваться" 
                onClick={()=> navigate(RouteNames.SIGNUP)} 
                className="header-button"/>    
            <Button text="Посмотреть список" 
                onClick={()=> navigate(RouteNames.MAIN)} 
                className="header-button"/>
            </>    
        }
            
        </div>
    )
}

export default Header