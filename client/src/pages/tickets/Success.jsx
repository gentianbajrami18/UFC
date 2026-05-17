import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MdAttachMoney } from "react-icons/md";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import customFetch from '../../utils';
import { useLocation } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('sessionId');



    const getSession = async () => {
        try {
            await customFetch.post('/tickets/success', { sessionId }, { withCredentials: true });
            toast.success('Payment successful, redirecting to orders');
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
        setTimeout(() => {
            return navigate('/my-orders');
        }, 3000)
    }
    useEffect(() => {
        getSession()
    }, [])

    return (
        <Wrapper>
            <div className="success-center">
                <MdAttachMoney />
                <p className="eyebrow">Payment complete</p>
                <h3>Tickets confirmed</h3>
                <p>Your order is being added to your ticket wallet.</p>
                <Link to="/my-orders">View orders</Link>
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
        linear-gradient(135deg, rgba(12, 12, 14, 0.98), rgba(35, 57, 38, 0.9)),
        radial-gradient(circle at top, rgba(34, 197, 94, 0.28), transparent 34%);
    .success-center{
        text-align: center;
        max-width: 500px;
        padding: clamp(2rem, 6vw, 4rem);
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
        svg{
            color: #138a36;
            font-size:3.5rem;
            margin-bottom: 1.5rem;
        }
        .eyebrow {
            margin: 0 0 0.65rem;
            color: #138a36;
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

export default Success
