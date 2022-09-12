import { FC } from 'react'
import { useActions } from '../hooks/useActions'
import { ReactComponent as ReactPatchPlus } from '../assets/bi-patch-plus.svg';
import { ReactComponent as ReactPatchMinus } from '../assets/bi-patch-minus.svg';
import { ReactComponent as ReactArrowRepeat } from '../assets/bi-arrow-repeat.svg';
import { ReactComponent as ReactTrash } from '../assets/bi-trash.svg';
import Button from './Button'

interface ItemProps {
  id: number | string
  name: string
  count: number
}

const ItemButtons:FC<ItemProps> = (props) => {
  const {incCountItem, decCountItem, delItem, nameItem} = useActions()

  return (
    <div className="item-field_buttons">
      <Button icon={<ReactPatchPlus />} text="Очко Гриффиндору" onClick={()=> incCountItem(props)} className="item-field_button_plus"/>
      <Button icon={<ReactPatchMinus />} text="Ну ок, простим очко" onClick={()=> decCountItem(props)} className="item-field_button_minus"/>
      <Button icon={<ReactArrowRepeat/>} text="Изменить имя" onClick={()=> nameItem(props, String(prompt()))} className="item-field_button_change-name"/>
      <Button icon={<ReactTrash/>} text="Удалить" onClick={()=> delItem(props)} className="item-field_button_delete"/>
    </div>
  )
}

export default ItemButtons