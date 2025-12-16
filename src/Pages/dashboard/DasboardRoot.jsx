import React from 'react';
import Dashboard from './dashboard';
import { Outlet } from 'react-router';

const DasboardRoot = () => {
    return (
        <div className='flex gap-5 max-w-[90%] mx-auto my-10 '>
            <Dashboard />
            <Outlet />
        </div>
    );
};

export default DasboardRoot;