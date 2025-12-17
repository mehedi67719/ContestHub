import React from 'react';
import Dashboard from './dashboard';
import { Outlet } from 'react-router';

const DasboardRoot = () => {
    return (
        <div className='flex gap-1 lg:gap-5 md:gap-3 max-w-[100%] mr-4 my-10 '>
            <Dashboard />
            <Outlet />
        </div>
    );
};

export default DasboardRoot;