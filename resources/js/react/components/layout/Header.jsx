import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-black bg-opacity-40 p-6 border-b border-gray-700 relative z-10">
            <nav className="container mx-auto flex items-center justify-between max-w-[1280px]">
                <Link to="/">
                    <img src="https://magicport.ai/front/img/logo-light.svg" alt="Logo" className="h-10" />
                </Link>
                <ul className="flex space-x-6">
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-red-500 bg-opacity-10 text-red-500 p-2 rounded-[6px] hover:bg-red-600 hover:bg-opacity-20"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
