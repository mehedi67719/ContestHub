import React from 'react';
import Dashboard from './dashboard';
import { Outlet } from 'react-router';

const DasboardRoot = () => {
    return (
        <div className='flex gap-2 md:gap-3 lg:gap-5 min-h-screen '>
            <Dashboard />
            <Outlet />
        </div>
    );
};

export default DasboardRoot;