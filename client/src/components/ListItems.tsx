
import {FC} from 'react';
import Item from '../components/Item';
import { IItem } from '../models/IItem';

interface ListItemsProps {
    items: IItem[]
  }

const ListItems: FC<ListItemsProps> = ({items}) => {
    return (
        <div className="list-items">
            {items.map( (item: IItem, index: number) =>             
                    <Item id={item.id} 
                    name={item.name} 
                    count={item.count} 
                    key={index + item.name} />
            )}
        </div>
    );
};

export default ListItems;