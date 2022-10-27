import {FC} from 'react';
import { ReactComponent as ReactPlusCircle } from '../assets/bi-plus-circle.svg';
import { ReactComponent as ReactArrowRepeat } from '../assets/bi-arrow-repeat.svg';
import { ReactComponent as ReactArrowUp } from '../assets/arrow-up.svg';
import { ReactComponent as ReactArrowDown } from '../assets/arrow-down.svg';
import Button from '../components/Button'
import {useTypedSelector} from "../hooks/useTypedSelector";
import { fetchItems, addItem, setSort } from '../store/slice/itemSlice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

const TopMenu: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    const {isAuth, user} = useTypedSelector(state => state.auth);
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
            <Button icon={<ReactArrowUp />} 
                text="Самые любознательные" 
                onClick={()=> dispatch(setSort('BIG_COUNT'))} 
                className="top-menu_button"/>
            <Button icon={<ReactArrowDown />} 
                text="Самые умные" 
                onClick={()=> dispatch(setSort('SMALL_COUNT'))} 
                className="top-menu_button"/>
            <Button
                text="Все" 
                onClick={()=> dispatch(setSort('ALL'))} 
                className="top-menu_button"/>
            </div>
    );
};

export default TopMenu;