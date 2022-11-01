import { FC } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setOpen, setSort } from '../store/slice/itemSlice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import Button from './Button'
import { ReactComponent as ReactArrowUp } from '../assets/arrow-up.svg';
import { ReactComponent as ReactArrowDown } from '../assets/arrow-down.svg';
import "./SearchFilter.css"

const SearchFilter: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {isOpen} = useTypedSelector(state => state.item);
    console.log('SearchFilter isOpen', isOpen)
    return (
        <div className={isOpen ? "new-modal active" 
            : "new-modal"}>
                <div className="new-modal__content">
                <p>Сортировка</p>
        <Button icon={<ReactArrowUp />} 
            text="Самые любознательные" 
            onClick={()=> dispatch(setSort('BIG_COUNT'))} 
            className="top-menu_button"/>
        <Button icon={<ReactArrowDown />} 
            text="Самые умные" 
            onClick={()=> dispatch(setSort('SMALL_COUNT'))} 
            className="top-menu_button"/>
        <Button text="Сбросить сортировку" 
            onClick={()=> dispatch(setSort('ALL'))} 
            className="top-menu_button"/>
        <Button text='закрыть окно'
            onClick={() => dispatch(setOpen(false))} 
            className="top-menu_button close"/>
                </div>
        </div>
    )
}

export default SearchFilter