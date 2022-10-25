
import {FC} from 'react';
import Item from '../components/Item';
import { IItem } from '../models/IItem';

interface IListItemsProps {
    items: IItem[]
  }

const ListItems: FC<IListItemsProps> = ({items}) => {
    return (
        <div className="list-items">
            {items.map( (item: IItem, index: number) =>             
                    <Item id={item.id}
                    itemId={item.item.id}
                    name={item.item.name} 
                    count={item.count} 
                    key={item.id} />
            )}
        </div>
    );
};

export default ListItems;