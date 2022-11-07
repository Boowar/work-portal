import { FC } from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import ItemButtons from './ItemButtons';

interface ItemProps {
  id: number
  itemId: number
  name: string
  count: number
}

const Item:FC<ItemProps> = (props) => {
  const {isAuth} = useTypedSelector(state => state.auth);
  const {isLoading} = useTypedSelector(state => state.item)

  return (
    <div className="item-field">
      <div className="item-field_text">
        <div className="item-field_name">{props.name}: </div>
        <div className="item-field_count">
          {isLoading ? "Загрузка..." : props.count}</div>
      </div>        
      {isAuth 
            ?
      <ItemButtons {...props}/>
      :
      <></>}
    </div>
  )
}

export default Item