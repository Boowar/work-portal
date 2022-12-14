import { Routes, Route, Navigate} from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../router';

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    
    return(
        isAuth ?
        <Routes>          
            {privateRoutes.map(route =>
                <Route path={route.path}
                       element={<route.component/>} 
                       key={route.path} />
                )}
                <Route path={'*'} element={<Navigate replace to={RouteNames.MAIN} />} />
        </Routes>
        :
        <Routes>          
        {publicRoutes.map(route =>
            <Route path={route.path}
                   element={<route.component/>} 
                   key={route.path} />
            )}
            <Route path={'*'} element={<Navigate replace to={RouteNames.LOGIN} />} />
    </Routes>
    )
}

export default AppRouter;