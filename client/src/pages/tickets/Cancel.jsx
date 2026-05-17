import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MdCancel } from "react-icons/md";
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import customFetch from '../../utils';

const Cancel = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('sessionId');

    useEffect(() => {
        toast.error('Payment Failed,redirecting to home');
        setTimeout(() => {
            return navigate('/');
        }, 3000)
    }, [])

    const getSession = async () => {
        await customFetch.post('/tickets/failed', { sessionId }, { withCredentials: true });
    }

    useEffect(() => {
        getSession()
    }, [])

    return (
        <Wrapper>
            <div className="cancel-center">
                <MdCancel />
                <p className="eyebrow">Checkout canceled</p>
                <h3>Payment canceled</h3>
                <p>No ticket was charged. You can return to events and try again.</p>
                <Link to="/events">Browse events</Link>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    height: calc(100vh - 5rem);
    display: grid;
    place-items: center;
    padding: 2rem;
    background:
        linear-gradient(135deg, rgba(12, 12, 14, 0.98), rgba(54, 12, 17, 0.92)),
        radial-gradient(circle at top, rgba(210, 10, 10, 0.3), transparent 34%);
    .cancel-center{
        text-align: center;
        max-width: 500px;
        padding: clamp(2rem, 6vw, 4rem);
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
        svg{
            color: #d20a0a;
            font-size:3.5rem;
            margin-bottom: 1.5rem;
        }
        .eyebrow {
            margin: 0 0 0.65rem;
            color: #d20a0a;
            font-size: 0.78rem;
            font-weight: 900;
            text-transform: uppercase;
        }
        h3 {
            margin: 0;
            color: #171719;
            font-size: clamp(2rem, 6vw, 4rem);
            line-height: 0.95;
            text-transform: uppercase;
        }
        p:last-of-type {
            margin: 1rem auto 1.5rem;
            color: var(--grey-500);
        }
        a {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            min-height: 46px;
            padding: 0.75rem 1.2rem;
            border-radius: 6px;
            background: #171719;
            color: var(--white);
            font-weight: 900;
            text-decoration: none;
            text-transform: uppercase;
        }
    }
`

export default Cancel
