import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const adminItems = [
    ['Admin Dashboard', '/admin'],
    ['Users', '/users'],
    ['Events', '/events'],
    ['Fights', '/fights'],
    ['Fighters', '/fighters'],
    ['Rankings', '/rankings'],
    ['Arenas', '/arena'],
    ['Seating Layout', '/seating-layout'],
    ['Weight Classes', '/weightClasses'],
    ['Fight Finish', '/fightFinish'],
    ['Referees', '/refers'],
    ['Quotes', '/quotes'],
];

const MenuDropDown = ({ toggleSidebar, user }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="" style={{ textTransform: 'uppercase' }} id="admin-dropdown">
                {user?.role === 'admin' ? 'Admin' : 'Menu'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/profile">Profile</Dropdown.Item>
                {user?.role === 'admin' &&
                    <>
                        {adminItems.map(([label, to]) => (
                            <Dropdown.Item key={to} as={NavLink} onClick={toggleSidebar} to={to}>{label}</Dropdown.Item>
                        ))}
                    </>
                }
            </Dropdown.Menu>
        </Dropdown >
    )
}

export default MenuDropDown
