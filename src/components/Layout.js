import {Outlet} from 'react-router-dom';

import React from 'react';
import { requirePropFactory } from '@mui/material';

const Layout = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
}

export default Layout;