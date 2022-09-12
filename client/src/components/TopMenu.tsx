import {FC} from 'react';
import { useActions } from '../hooks/useActions';
import { ReactComponent as ReactPlusCircle } from '../assets/bi-plus-circle.svg';
import { ReactComponent as ReactArrowRepeat } from '../assets/bi-arrow-repeat.svg';
import { ReactComponent as ReactArrowUp } from '../assets/arrow-up.svg';
import { ReactComponent as ReactArrowDown } from '../assets/arrow-down.svg';
import Button from '../components/Button'
import {useTypedSelector} from "../hooks/useTypedSelector";

const TopMenu: FC = () => {

    const {fetchItems, addItem, sortByIncCountItem, sortByDecCountItem} = useActions()
    const {isAuth} = useTypedSelector(state => state.auth);

    return (
            <div className='top-menu'>
            {isAuth 
            ?
            <Button icon={<ReactPlusCircle />} 
                text="Добавить" 
                onClick={()=> {addItem(String(prompt())); fetchItems()}} 
                className="top-menu_button"/>
            :<></>}        
            <Button icon={<ReactArrowRepeat />} 
                text="Получить список" 
                onClick={()=> fetchItems()} 
                className="top-menu_button"/>
            <Button icon={<ReactArrowUp />} 
                text="Самые любознательные" 
                onClick={()=> sortByIncCountItem()} 
                className="top-menu_button"/>
            <Button icon={<ReactArrowDown />} 
                text="Самые умные" 
                onClick={()=> sortByDecCountItem()} 
                className="top-menu_button"/>
            </div>
    );
};

export default TopMenu;