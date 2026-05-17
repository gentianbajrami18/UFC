import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { SiUfc } from "react-icons/si";
import { MdClose, MdMenu } from "react-icons/md";
import { useAppContext } from '../context/AppContext';
import sublinks from '../data'
import { Dropdown } from 'react-bootstrap';

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

const Navbar = () => {
    const { isSidebarOpen, toggleSidebar, setPageId, user, logoutUser } = useAppContext();
    return <Wrapper>
        <div className="nav-center">
            <div className="nav-links">
                {
                    sublinks.map(({ page, pageId }) => {
                        return <NavLink key={pageId} to={`/${page}`} onMouseEnter={() => setPageId(pageId)} className='nav-link'>{page}</NavLink>
                    })
                }
            </div>
            <div className="icons" >
                <Link to={'/'}> <SiUfc className='logo' /></Link>
                <button type="button" className='toggle-nav' onClick={toggleSidebar} aria-label="Toggle navigation">
                    {isSidebarOpen ? <MdClose className='arrow' /> : <MdMenu className='arrow' />}
                </button>
            </div>
            <div className="auth-links">
                {user ?
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'start' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="" style={{ marginBottom: '0.5rem', textTransform: 'uppercase' }} id="admin-dropdown">
                                {user.role === 'admin' ? 'Admin' : 'Account'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
                                {user.role === 'admin' &&
                                    <>
                                        {adminItems.map(([label, to]) => (
                                            <Dropdown.Item key={to} as={NavLink} to={to}>{label}</Dropdown.Item>
                                        ))}
                                    </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <NavLink to={'/'} className='auth-link' onClick={logoutUser}>logout</NavLink>
                    </div>
                    :
                    <> <NavLink to={'/login'} className='admin-entry'  >Admin workspace</NavLink>
                        <NavLink to={'/login'} className='auth-link'  >Login</NavLink>
                        <NavLink to={'/register'} className='auth-link' >Register</NavLink></>
                }
            </div>
        </div>
    </Wrapper>
}

const Wrapper = styled.nav`
.dropdown-item.active {
    background-color: transparent !important;
    color: red !important; 
}
    .dropdown-menu {
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        box-shadow: 0 18px 45px rgba(15, 15, 18, 0.12);
        max-height: 70vh;
        overflow-y: auto;
    }
    .dropdown-item {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.82rem;
    }
    background: white;
    color: black;
    position: sticky;
    top: 0;
    z-index: 20;
    box-shadow: var(--shadow-1);
    .nav-center{
        width: 100vw;
        max-width: var(--max-width);
        display: grid;
        align-items: center;
        margin: 0 auto;
        height: 5rem;
        padding: 0 2rem;
   }
   .nav-links,.auth-links{
    display: none;
   }
   .icons{
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    cursor: pointer;
   }
   
   .logo{
    font-size: 3.5rem;
    transition: var(--transition);
    color: black;
   }
   .toggle-nav{
    border: 0;
    background: #171719;
    color: var(--white);
    width: 44px;
    height: 44px;
    border-radius: 999px;
    justify-self: end;
    font-size: 1.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease;
    }
   .toggle-nav:hover{
    background: #d20a0a;
    }
   .arrow{
    font-size: 1.35rem;
   }
   .logo:hover{
    color: red;
    border-bottom: 2px solid red;
}
   @media (min-width: 900px){
    .nav-links,.auth-links{
        display: flex;
        gap: 1rem;
        font-size: 1rem;
        text-transform: uppercase;
    }
    .nav-center{
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
    }
    .toggle-nav{
        display: none;
    }
    .icons{
        grid-template-columns: 1fr auto;
        justify-self: center;
    }
    .auth-links{
        justify-self: end;
    }
    .auth-link{
        text-decoration:none ;
    }
    .admin-entry{
        display: inline-flex;
        align-items: center;
        min-height: 38px;
        padding: 0.55rem 0.85rem;
        border-radius: 6px;
        background: #171719;
        color: var(--white);
        font-size: 0.78rem;
        font-weight: 900;
        text-decoration: none;
        text-transform: uppercase;
        transition: background-color 0.2s ease, color 0.2s ease;
    }
    .admin-entry:hover,
    .admin-entry.active{
        background: #d20a0a;
        color: var(--white);
    }
    .nav-link,.auth-link{
        transition: var(--transition);
        color: var(--grey-700);
        padding-bottom: 0.5rem;
        font-weight: 800;
    }
    .nav-link:hover,.auth-link:hover,
    .nav-link.active,.auth-link.active{
        color: red;
        border-bottom: 2px solid red;
    }
   }
   @media (min-width: 1100px){
    .nav-center{
        width: 90vw;
        border-radius: var(--borderRadius);
    }
   }
`

export default Navbar
