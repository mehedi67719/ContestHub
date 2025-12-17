import React from 'react';;
import { FaUser, FaAward, FaListAlt } from 'react-icons/fa';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { TbGitPullRequestClosed } from 'react-icons/tb';
import { RiUserSettingsLine, RiAdminLine } from 'react-icons/ri';
import { MdOutlineSecurity } from 'react-icons/md';
import { Link } from 'react-router';
import Useauth from '../../Component/Useauth';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';





const userNavItems = [
    { to: '/dashboard', icon: FaUser, label: 'My Profile' },
    { to: '/dashboard/participated-contests', icon: FaListAlt, label: 'My Participated' },
    { to: '/dashboard/winning-contests', icon: FaAward, label: 'My Winnings' },
    { to: '/dashboard/normaluserrequest', icon: VscGitPullRequestGoToChanges, label: "Request Contest Creator " }
];

const creatorNavItems = [
    { to: '/dashboard', icon: FaUser, label: 'My Profile' },
    { to: '/dashboard/add-contest', icon: MdOutlineCreateNewFolder, label: 'Add Contest' },
    { to: '/dashboard/my-contests', icon: FaListAlt, label: 'My Created Contests' },
    { to: '/dashboard/submitted-tasks', icon: TbGitPullRequestClosed, label: 'Submissions' },
];

const adminNavItems = [
    { to: '/dashboard/admin-home', icon: RiAdminLine, label: 'Admin Home' },
    { to: '/dashboard/manage-users', icon: RiUserSettingsLine, label: 'Manage Users' },
    { to: '/dashboard/manage-contests', icon: MdOutlineSecurity, label: 'Manage Contests' },
    { to: '/dashboard', icon: FaUser, label: 'My Profile' },
];


const SidebarItem = ({ to, icon: Icon, label }) => {
    return (
        <Link
            to={to}
            className="flex items-center p-3 my-2 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 group relative"
        >
            <Icon className="w-6 h-6 z-10" />

            <span
                className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none z-20"
            >
                {label}
            </span>
        </Link>
    );
};





const Dashboard = () => {


    const { User } = Useauth()
    const role = User?.role || "normal";


    let navItems = [];

    if (role === 'admin') {
        navItems = adminNavItems;
    } else if (role === 'creator') {
        navItems = creatorNavItems;
    } else {
        navItems = userNavItems;
    }

    return (
        <div className='w-16 md:w-20 lg:w-20 min-h-screen bg-gray-900 shadow-2xl p-2'>
            <nav className='flex flex-col items-center pt-8'>
                {navItems.map((item) => (
                    <SidebarItem
                        key={item.label}
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </nav>
        </div>
    );
};

export default Dashboard;