import { useMemo, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { SiCodechef } from 'react-icons/si';
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai';
import DatePicker from '../../widgets/DatePicker';

const menuList = [
    { name: 'Dashboard', path: '/home/dashboard' },
    { name: 'LeaderBoard', path: '/home/leader-board' },
    { name: 'Report', path: '/home/report' },
    { name: 'Orders', path: '/home/orders' },
];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const hasReport = useMemo(() => location?.pathname?.includes('report'), [location]);
    const hasOrders = useMemo(() => location?.pathname?.includes('orders'), [location]);

    return (
        <header
            style={{ backdropFilter: 'saturate(180%) blur(10px)' }}
            className="border fixed w-full z-10 bg-[hsla(0,0%,100%,.8)] shadow-sm shadow-[#eaeaea]"
        >
            <nav className="flex max-w-full lg:mx-10 items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1 cursor-pointer" onClick={() => navigate('/home/dashboard')}>
                    <SiCodechef className="h-10 w-10 mx-3" fontSize={30} />
                    <div className='flex items-center text-2xl font-bold'> Start Bakery </div>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <AiOutlineBars className="h-6 w-6" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-10">
                    {!hasReport && !hasOrders ?
                        <>
                            <DatePicker hasReport={hasReport} />
                            <div className="border h-10"></div>
                        </>
                        : null}

                    {menuList.map((menu, i) => (
                        <NavLink
                            key={i}
                            to={menu.path}
                            className={({ isActive, isPending }) =>
                                `${isPending ? "pending" : isActive ? "text-blue-600" : ""} 
                                text-sm font-semibold leading-6`}>
                            {menu.name}
                        </NavLink>
                    ))}
                </div>
            </nav>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between ">
                        <SiCodechef className="h-10 w-10 mx-3" fontSize={40} />

                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {menuList.map((menu, i) => (
                                    <NavLink
                                        key={i}
                                        to={menu.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive, isPending }) =>
                                            `${isPending ? "pending" : isActive ? "text-blue-600" : ""} 
                                        -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}>
                                        {menu.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default Header; 