import { FC } from "react";
import { useActions } from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from 'react-router-dom';
import { RouteNames } from '../router';
import Button from './Button'

const Header: FC = () => {
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useActions()
    const navigate = useNavigate()

    return (
        <div className="header">
            {isAuth 
            ?
            <>
            <div className="header-name">
                Hello, {user.username}!
            </div>
            <Button text="Выйти" 
                onClick={()=> logout()} 
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