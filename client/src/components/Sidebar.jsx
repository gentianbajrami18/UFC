import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/AppContext'
import sublinks from '../data'
import MenuDropDown from './MenuDropDown'

const Sidebar = () => {
    const { isSidebarOpen, setPageId, toggleSidebar, user, logoutUser } = useAppContext();

    return <Wrapper className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className="nav-links ">
            <div>
                <MenuDropDown toggleSidebar={toggleSidebar} user={user} />
            </div>
            {
                sublinks.map(({ page, pageId }) => {
                    return <NavLink key={pageId} to={`/${page}`} onClick={toggleSidebar}
                        className='nav-link'>{page}</NavLink>
                })
            }
            <div>
                {user ?
                    <> <NavLink onClick={logoutUser} to={'/'} className='nav-link'  >Logout</NavLink></>
                    :
                    <div className='auth-links'>
                        <NavLink to={'/login'} onClick={toggleSidebar} className='nav-link admin-entry'  >Admin workspace</NavLink>
                        <NavLink to={'/login'} onClick={toggleSidebar} className='nav-link'  >Login</NavLink>
                        <NavLink to={'/register'} className='nav-link' onClick={toggleSidebar} >Register</NavLink></div>
                }
            </div>
        </div >
    </Wrapper >
}
const Wrapper = styled.aside`
    z-index: 15;
    overflow-y: auto;
    .nav-links{
        padding: 3rem 0 7rem;
        display: grid;
        gap: 1.5rem
    }
    .auth-links{
        display: grid;
        gap:2rem
    }
    .nav-link{
        display: block;
        font-size: clamp(1.25rem, 7vw, 2.4rem);
        font-weight: 900;
        text-transform: uppercase;
        color: var(--grey-900);
        padding: 0 2rem;
        transition: var(--transition);
    }
    .nav-link:hover{
        color: red;
    }
    .admin-entry{
        color: #d20a0a;
    }

    .dropdown button{
        font-size: clamp(1.25rem, 7vw, 2.4rem);
        font-weight: 900;
        text-transform: uppercase;
        color: var(--grey-900);
        transition: var(--transition);
        margin-bottom: 0px;
        padding: 0px;

    }
`
export default Sidebar
