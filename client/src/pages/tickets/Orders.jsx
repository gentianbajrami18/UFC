import React from 'react'
import customFetch, { getAssetUrl } from '../../utils'
import styled from 'styled-components'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import StatusState from '../../components/StatusState'

export const loader = (queryClient) => async () => {
    try {
        const { data } = await customFetch('/tickets', { withCredentials: true })
        return data.orders;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect('/')
    }
}
const Orders = () => {
    const orders = useLoaderData();
    const handleDownload = async (ticketId) => {
        try {
            const { data } = await customFetch('/tickets/download/' + ticketId);
            const blob = new Blob([data], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `ticket_${ticketId}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error('Could not download this ticket.');
        }
    };

    if (orders.length === 0) {
        return (
            <StatusState
                eyebrow="Orders"
                title="No tickets yet"
                message="Your purchased tickets will appear here after checkout."
                action={<Link to={'/events'} className='btn-main'>Browse events</Link>}
            />
        )
    }

    return (
        <Wrapper>
            <header className="orders-hero">
                <div>
                    <p className="eyebrow">Ticket wallet</p>
                    <h1>My orders</h1>
                    <p className="hero-copy">Purchased seats, order details, and downloadable ticket files.</p>
                </div>
                <div className="order-count">
                    <span>{orders.length}</span>
                    <p>{orders.length === 1 ? 'Order' : 'Orders'}</p>
                </div>
            </header>
            <div className="orders">
                {
                    orders.map(item => {
                        const orderTotal = item.orderItems.reduce((total, order) => total + Number(order.price || 0), 0);
                        return <article key={item._id} className='order'>
                            <div className="img-container">
                                <img src={getAssetUrl(item.image || '/uploads/fighters/no-profile-image.png')} alt={item.name} className='img' />
                            </div>
                            <div className="order-body">
                                <div className="header-info">
                                    <p>Event</p>
                                    <h2>{item.name}</h2>
                                    <span>{item.seatingLayout.sectionName}</span>
                                </div>
                                <div className="tickets">
                                    {
                                        item.orderItems.map((order) => {
                                            return <div key={order._id} className="ticket">
                                                <span>Row {order.row}</span>
                                                <span>Seat {order.column}</span>
                                                <strong>${order.price}</strong>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="order-footer">
                                    <div>
                                        <p>Total</p>
                                        <strong>${orderTotal}</strong>
                                    </div>
                                    <button className='download-btn'
                                        onClick={() => handleDownload(item._id)}>Download</button>
                                </div>
                            </div>
                        </article>
                    })
                }
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: min(1180px, calc(100% - 2rem));
    margin: 3rem auto 5rem;
    min-height: calc(100vh - 5rem);
    .orders-hero {
        display: grid;
        gap: 2rem;
        align-items: end;
        padding: clamp(2rem, 5vw, 4rem);
        border-radius: 8px;
        background:
            linear-gradient(135deg, rgba(12, 12, 14, 0.98), rgba(46, 10, 15, 0.92)),
            radial-gradient(circle at top right, rgba(210, 10, 10, 0.32), transparent 32%);
        color: var(--white);
    }
    .eyebrow {
        margin: 0 0 0.65rem;
        color: #d20a0a;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h1 {
        margin: 0;
        font-size: clamp(3rem, 9vw, 7rem);
        line-height: 0.88;
        text-transform: uppercase;
    }
    .hero-copy {
        max-width: 540px;
        margin: 1rem 0 0;
        color: rgba(255, 255, 255, 0.7);
    }
    .order-count {
        padding: 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.07);
    }
    .order-count span {
        display: block;
        font-size: 3rem;
        font-weight: 1000;
        line-height: 1;
    }
    .order-count p {
        margin: 0.35rem 0 0;
        color: rgba(255, 255, 255, 0.65);
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .orders{
        margin-top: 1.25rem;
        display: grid;
        gap: 1rem;
    }
    .order{
        display: grid;
        overflow: hidden;
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        background-color: var(--white);
        box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
    }
    .img-container{
        min-height: 210px;
        display: grid;
        place-items: end center;
        background:
            linear-gradient(180deg, rgba(28, 29, 33, 0.98), rgba(10, 10, 12, 1)),
            radial-gradient(circle at center top, rgba(210, 10, 10, 0.3), transparent 45%);
    }
    .img{
        width: min(90%, 260px);
        height: 200px;
        object-fit: contain;
        filter: drop-shadow(0 16px 18px rgba(0, 0, 0, 0.48));
    }
    .order-body {
        display: grid;
        gap: 1rem;
        padding: 1rem;
    }
    .header-info p,
    .order-footer p {
        margin: 0 0 0.35rem;
        color: #d20a0a;
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .header-info h2 {
        margin: 0;
        color: #171719;
        font-size: clamp(1.4rem, 3vw, 2.2rem);
        line-height: 0.98;
        text-transform: uppercase;
    }
    .header-info span {
        display: inline-block;
        margin-top: 0.75rem;
        padding: 0.35rem 0.6rem;
        border-radius: 999px;
        background: var(--grey-100);
        color: var(--grey-600);
        font-size: 0.76rem;
        font-weight: 900;
        text-transform: capitalize;
    }
    .tickets {
        display: grid;
        gap: 0.5rem;
    }
    .ticket {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        gap: 0.75rem;
        align-items: center;
        padding: 0.75rem;
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        color: var(--grey-600);
        font-weight: 800;
    }
    .ticket strong {
        color: #171719;
    }
    .order-footer {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.5rem;
    }
    .order-footer strong {
        color: #171719;
        font-size: 1.6rem;
    }
    .download-btn {
        min-height: 46px;
        padding: 0.75rem 1rem;
        border: 0;
        border-radius: 6px;
        background: #171719;
        color: var(--white);
        font-weight: 900;
        text-transform: uppercase;
        transition: background-color 0.2s ease;
    }
    .download-btn:hover {
        background: #d20a0a;
    }
    @media (min-width: 800px) {
        .orders-hero {
            grid-template-columns: minmax(0, 1fr) 220px;
        }
        .order {
            grid-template-columns: 280px minmax(0, 1fr);
        }
        .img-container {
            min-height: 100%;
        }
    }
    @media (max-width: 560px) {
        width: min(100% - 1rem, 1180px);
        .orders-hero {
            padding: 1.5rem;
        }
        .ticket,
        .order-footer {
            align-items: flex-start;
            grid-template-columns: 1fr;
            flex-direction: column;
        }
    }
`

export default Orders
