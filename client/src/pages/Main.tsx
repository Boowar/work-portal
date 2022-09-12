
import {FC, useEffect} from 'react';
import Item from '../components/Item';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IItem } from '../models/IItem';
import TopMenu from '../components/TopMenu';
import ListItems from '../components/ListItems';

const Main: FC = () => {
    useEffect( () => {
        fetchItems()
      }, [])
    const {items} = useTypedSelector(state => state.item)
    console.log('main items',items)

   /** const SortByName = (items:IItem[]) => {

        const mapped = items.map((item, index) =>
         {return{index, value: item.name.toLowerCase()}})

        mapped.sort((a,b) => {
            if (a.value > b.value)
                return 1
            if (a.value < b.value)
                return -1
            return 0
        })

        const result = mapped.map((element) => 
        {return items[element.index]})
        return result
    }

    const SortByCount = (items:IItem[]) => {

        const mapped = items.map((item, index) =>
         {return{index, value: item.count}})

        mapped.sort((a,b) => {
            if (a.value > b.value)
                return 1
            if (a.value < b.value)
                return -1
            return 0
        })

        const result = mapped.map((element) => 
        {return items[element.index]})
        return result
    } */

    const {fetchItems} = useActions()
    
    return (
        <div className="row">
            <TopMenu />
            <ListItems items={items}/>
        </div>
    );
};

export default Main;