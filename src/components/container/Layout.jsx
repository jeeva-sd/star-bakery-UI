
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import { fetchOrders } from '../../services';
import { useDispatch } from 'react-redux';

const Layout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Layout;