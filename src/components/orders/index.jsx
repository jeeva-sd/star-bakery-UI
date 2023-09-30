import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import OrderCard from './OrderCard';
import OrderForm from './OrderForm';

const Orders = () => {
    const { list, isRequesting } = useSelector(state => state.order);
    const [show, setShow] = useState(false);

    const orderData = useMemo(() => {
        if (!list || list.length === 0) return [];

        const sortByDateDescending = (a, b) => {
            const dateA = new Date(a.lastUpdateTime);
            const dateB = new Date(b.lastUpdateTime);
            return dateB.valueOf() - dateA.valueOf();
        };

        return [...list].sort(sortByDateDescending);
    }, [list]);


    return (
        <div className='pt-40'>
            <div className='flex w-full flex-wrap gap-5 justify-between px-12 pb-10'>
                <div className='font-bold text-2xl'>Orders</div>
                <div><button className='bg-blue-500 p-2 rounded-md text-white hover:bg-blue-400 flex items-center gap-2' onClick={() => setShow(true)}>
                    <AiOutlinePlus />
                    Create Order</button></div>
            </div>
            {!isRequesting &&
                <div className='flex w-full flex-wrap gap-5 justify-center'>
                    {orderData?.length > 0 ?
                        orderData.map((e, i) => <OrderCard order={e} key={i} />) : null}
                </div>}

            {isRequesting && <div className='flex w-full h-[50vh] items-center justify-center'>Loading</div>}

            <OrderForm isOpen={show} onClose={() => setShow(false)} />
        </div>
    );
};

export default Orders;