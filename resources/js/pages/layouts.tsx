/* eslint-disable import/order */
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
    children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="bg-white">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
