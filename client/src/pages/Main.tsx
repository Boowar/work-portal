
import {FC, useEffect} from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IItem } from '../models/IItem';
import TopMenu from '../components/TopMenu';
import ListItems from '../components/ListItems';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchItems } from '../store/slice/itemSlice';

const Main: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect( () => {
       const fetched = fetchItems()
       dispatch(fetchItems())
       console.log('fetching', fetched)
      }, [])
    const {items, sorting, error} = useTypedSelector(state => state.item)
    console.log('main items',items)

    let sortedItems: any = []
    const SortedItems = (items: IItem [], sorting: string) => {
        switch (sorting){
            case 'BIG_COUNT':
                sortedItems = items.filter(item => item).sort(
                    (a,b) => a.count < b.count ? 1 : -1)
                break
            case 'SMALL_COUNT':
                sortedItems = items.filter(item => item).sort(
                    (a,b) => a.count > b.count ? 1 : -1)
                break
            default:
            sortedItems = items
        }
    }
    SortedItems(items, sorting)
   /*const SortedItems = (items:IItem[]) => {

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
    }**/

    
    return (
        <div className="row">
            <TopMenu />
            {error}
            <ListItems items={sortedItems}/>
        </div>
    );
};

export default Main;