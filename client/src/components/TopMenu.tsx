import {FC} from 'react';
import { ReactComponent as ReactPlusCircle } from '../assets/bi-plus-circle.svg';
import { ReactComponent as ReactArrowRepeat } from '../assets/bi-arrow-repeat.svg';

import Button from '../components/Button'
import {useTypedSelector} from "../hooks/useTypedSelector";
import { fetchItems, addItem,setOpen } from '../store/slice/itemSlice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import SearchFilter from './SearchFiler';
import './TopMenu.css'

const TopMenu: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {isOpen} = useTypedSelector(state => state.item);
    console.log('user',user)
    console.log('isAuth',isAuth)

    return (
            <div className='top-menu'>
            {isAuth 
            ?
            <Button icon={<ReactPlusCircle />} 
                text="Добавить" 
                onClick={()=> {
                    const name = String(prompt());
                    const newItem = {
                        name,
                        id: user.id
                    }
                    dispatch(addItem(newItem)).then(()=>dispatch(fetchItems()))}} 
                className="top-menu_button"/>
            :<></>}        
            <Button icon={<ReactArrowRepeat />} 
                text="Получить список" 
                onClick={()=> dispatch(fetchItems())} 
                className="top-menu_button"/>
            {isOpen===false ?
            <Button text="Сортировать"
            onClick={() => dispatch(setOpen(true))}
            className="top-menu_button"/>
            : <SearchFilter />}
            
            </div>
    );
};

export default TopMenu;