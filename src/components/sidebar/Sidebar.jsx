import React from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'

import logo from '../../assets/images/logo.png'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'

import Dropdown from '../dropdown/Dropdown.jsx'

import user_menu from '../../assets/JsonData/user_menus.json'

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}


const renderUserMenu = (item, index) => (
    <Link to='/' key={index}>
        <div className='notification-item'>
            <i className={item.icon}></i>
            <span>{item.content}</span>

        </div>
    </Link>
)

const Sidebar = props => {

    const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)

    if (activeItem === 2){
        <div className='topnav__right-item'>
                    {/* dropdown here */}
                    <Dropdown
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
    }
        
    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={logo} alt="company logo" />
            </div>
            {
                sidebar_items.map((item, index) => (
                <Link to={item.route} key={index}>
                    <SidebarItem
                        title={item.display_name}
                        icon={item.icon}
                        active={index === activeItem}
                    />
                </Link>

               ))
            }       
        </div>
    )
    
}

export default Sidebar
