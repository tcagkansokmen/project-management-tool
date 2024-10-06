import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const AuthLayout = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                navigate('/');
            }).catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, [navigate]);

    return (
        <div className="auth-layout">
            {children}
            <div aria-hidden="true"
                 className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0">
                <img src="/docs-left.png"
                     className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                     alt="docs left background" data-loaded="true"/>
            </div>
            <div aria-hidden="true"
                 className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
                <img src="/docs-right.png"
                     className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                     alt="docs right background" data-loaded="true"/>
            </div>
        </div>
    );
};

export default AuthLayout;
