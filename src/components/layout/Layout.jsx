import React from 'react';

import './layout.css'

import Sidebar from '../sidebar/Sidebar.jsx'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route } from 'react-router-dom';
/* Se crea una función expresada */
const Layout = () => {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div className='layout'>
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}
export default Layout