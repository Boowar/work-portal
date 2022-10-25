import { FC } from 'react'
import { ReactComponent as ReactPatchPlus } from '../assets/bi-patch-plus.svg';
import { ReactComponent as ReactPatchMinus } from '../assets/bi-patch-minus.svg';
import { ReactComponent as ReactArrowRepeat } from '../assets/bi-arrow-repeat.svg';
import { ReactComponent as ReactTrash } from '../assets/bi-trash.svg';
import Button from './Button'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

import {fetchItems, incCountItem, decCountItem, renameItem, delItem} from '../store/slice/itemSlice'

interface ItemProps {
  id: number
  itemId: number
  name: string
  count: number
}

const ItemButtons:FC<ItemProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  console.log('ItemButtons props', props)
  return (
    <div className="item-field_buttons">
      <Button icon={<ReactPatchPlus />} text="Очко Гриффиндору" onClick={()=> {
        dispatch(incCountItem(props)).then(()=>dispatch(fetchItems()))
      }}
        className="item-field_button_plus"/>
      <Button icon={<ReactPatchMinus />} text="Ну ок, простим очко" 
      onClick={()=> dispatch(decCountItem(props)).then(()=>dispatch(fetchItems()))} className="item-field_button_minus"/>
      <Button icon={<ReactArrowRepeat/>} text="Изменить имя" 
      onClick={()=>{ 
        const newName = String(prompt());
        const newItem = {
          name: newName,
          id: props.itemId
        }
      dispatch(renameItem(newItem)).then(()=>dispatch(fetchItems()))
      }} className="item-field_button_change-name"/>
      <Button icon={<ReactTrash/>} text="Удалить" onClick={()=> 
        dispatch(delItem(props)).then(()=>dispatch(fetchItems()))} className="item-field_button_delete"/>
    </div>
  )
}

export default ItemButtons