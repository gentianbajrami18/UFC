import React, { useEffect, useState } from 'react'
import customFetch, { getAssetUrl } from '../utils'
import { Link, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Seats from '../components/Seats';
import SelectedSeats from '../components/SelectedSeats';
import StatusState from '../components/StatusState';

export const loader = (queryClient) => async ({ params }) => {
    try {
        const { data } = await customFetch(`/events/${params.eventId}`);
        const { event } = data;
        const arenaId = event?.arenaId?._id || event?.arena?._id;

        const response = await customFetch('/seatingLayout/arena/' + arenaId)
        const seatingLayouts = response?.data?.seatingLayouts;
        return {
            seatingLayouts,
            eventId: params.eventId,
            image: event?.image,
            name: event.name,
            arenaName: event?.arenaId?.name || event?.arena?.name,
        }
    } catch (error) {
        toast.error('Could not load tickets. Please try again later.')
        return redirect('/events')
    }
}

const OctagonTickets = () => {
    const { seatingLayouts = [], eventId, image, name, arenaName } = useLoaderData()
    const navigate = useNavigate();
    const [seatingLayout, setSeatingLayout] = useState(seatingLayouts[0])
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const ticketTotal = selectedSeats.reduce((total, seat) => total + Number(seat.price || 0), 0);

    const handleOnChangeSelect = (value) => {
        setSeatingLayout(seatingLayouts.find((item) => item.sectionName.toLowerCase() === value.toLowerCase()))
        setSelectedSeats([])
    }

    const handleBuyButton = async () => {
        if (!selectedSeats.length) {
            toast.error('Select at least one seat first.');
            return;
        }
        const body = { tickets: selectedSeats, eventId, seatingLayoutId: seatingLayout._id, image, name };
        try {
            setIsCheckingOut(true);
            const { data } = await customFetch.post('/tickets', body, { withCredentials: true });
            if (!data?.url) {
                throw new Error('Missing checkout URL');
            }
            window.location.assign(data.url);
        } catch (error) {
            if (error?.response?.status === 401) {
                toast.error('Please sign in before checkout.');
                navigate('/login');
                return;
            }
            toast.error(error?.response?.data?.msg || 'Could not open checkout. Please try again.');
            setIsCheckingOut(false);
        }
    }

    useEffect(() => {
        const getOccupiedSeats = async () => {
            if (!seatingLayout?._id) return;
            try {
                const { data } = await customFetch(`/tickets/${eventId}/seatingLayout/${seatingLayout._id}`)
                setOccupiedSeats(data?.occupiedSeats || [])
            } catch (error) {
                setOccupiedSeats([])
                toast.error('Could not load unavailable seats.')
            }
        }
        getOccupiedSeats()
    }, [seatingLayout, eventId])

    if (!seatingLayouts.length || !seatingLayout) {
        return (
            <StatusState
                eyebrow="Tickets"
                title="No seating layout yet"
                message="This event does not have ticket sections configured. Create seating layouts in the admin panel first."
                action={<Link to="/events" className="btn-main">Back to events</Link>}
            />
        )
    }

    return (
        <Wrapper>
            <header className="ticket-hero">
                <div className="event-copy">
                    <p className="eyebrow">Ticket checkout</p>
                    <h1>{name}</h1>
                    <p className="arena">{arenaName || 'UFC arena'} seating map</p>
                </div>
                <div className="event-poster">
                    <img src={getAssetUrl(image || '/uploads/fighters/no-profile-image.png')} alt={name} />
                </div>
            </header>

            <div className="checkout-grid">
                <aside className="checkout-panel">
                    <div className="panel-section">
                        <label htmlFor="section-select">Select section</label>
                        <select
                            id="section-select"
                            value={seatingLayout.sectionName}
                            onChange={(e) => handleOnChangeSelect(e.target.value)}
                        >
                            {seatingLayouts.map(item => {
                                return <option key={item._id} value={item.sectionName}>{item.sectionName}</option>
                            })}
                        </select>
                    </div>
                    <div className="layout-meta">
                        <div>
                            <span>{seatingLayout.row}</span>
                            <p>Rows</p>
                        </div>
                        <div>
                            <span>{seatingLayout.column}</span>
                            <p>Seats per row</p>
                        </div>
                        <div>
                            <span>${seatingLayout.price}</span>
                            <p>Each</p>
                        </div>
                    </div>
                    <div className="legend">
                        <span><i className="available" />Available</span>
                        <span><i className="selected" />Selected</span>
                        <span><i className="taken" />Sold</span>
                    </div>
                    <SelectedSeats selectedSeats={selectedSeats} />
                    <button
                        onClick={handleBuyButton}
                        className="checkout-btn"
                        disabled={!selectedSeats.length || isCheckingOut}
                    >
                        {isCheckingOut ? 'Opening checkout...' : `Checkout ${ticketTotal ? `$${ticketTotal}` : ''}`}
                    </button>
                </aside>

                <main className="seat-panel">
                    <Seats selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}
                        seatingLayout={seatingLayout} occupiedSeats={occupiedSeats} />
                </main>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    width: min(1180px, calc(100% - 2rem));
    margin: 3rem auto 5rem;
    .ticket-hero {
        display: grid;
        gap: 2rem;
        align-items: end;
        padding: clamp(2rem, 5vw, 4rem);
        border-radius: 8px;
        background:
            linear-gradient(135deg, rgba(10, 10, 12, 0.98), rgba(48, 11, 16, 0.92)),
            radial-gradient(circle at top right, rgba(210, 10, 10, 0.34), transparent 32%);
        color: var(--white);
        overflow: hidden;
    }
    .eyebrow {
        margin: 0 0 0.65rem;
        color: #d20a0a;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h1 {
        max-width: 760px;
        margin: 0;
        font-size: clamp(2.6rem, 8vw, 6rem);
        line-height: 0.9;
        text-transform: uppercase;
    }
    .arena {
        margin: 1rem 0 0;
        color: rgba(255, 255, 255, 0.68);
        font-weight: 800;
        text-transform: uppercase;
    }
    .event-poster {
        display: grid;
        place-items: center;
        min-height: 190px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.06);
    }
    .event-poster img {
        width: min(100%, 280px);
        height: 220px;
        object-fit: contain;
        filter: drop-shadow(0 20px 24px rgba(0, 0, 0, 0.5));
    }
    .checkout-grid {
        display: grid;
        gap: 1.25rem;
        margin-top: 1.25rem;
    }
    .checkout-panel,
    .seat-panel {
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        background: var(--white);
        box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
    }
    .checkout-panel {
        display: grid;
        gap: 1rem;
        align-content: start;
        padding: 1rem;
    }
    label {
        display: block;
        margin-bottom: 0.45rem;
        color: var(--grey-500);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    select {
        width: 100%;
        min-height: 46px;
        padding: 0.7rem 0.75rem;
        border: 1px solid var(--grey-200);
        border-radius: 6px;
        background: var(--grey-50);
        color: #171719;
        font-weight: 800;
        text-transform: capitalize;
    }
    .layout-meta {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.5rem;
    }
    .layout-meta div {
        padding: 0.8rem 0.6rem;
        border-radius: 8px;
        background: var(--grey-100);
        text-align: center;
    }
    .layout-meta span {
        display: block;
        color: #171719;
        font-size: 1.25rem;
        font-weight: 1000;
    }
    .layout-meta p {
        margin: 0.15rem 0 0;
        color: var(--grey-500);
        font-size: 0.68rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        padding: 0.85rem;
        border: 1px solid var(--grey-200);
        border-radius: 8px;
    }
    .legend span {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--grey-600);
        font-size: 0.78rem;
        font-weight: 800;
    }
    .legend i {
        width: 12px;
        height: 12px;
        border-radius: 999px;
        display: inline-block;
    }
    .legend .available {
        background: #d8dde6;
    }
    .legend .selected {
        background: #d20a0a;
    }
    .legend .taken {
        background: #171719;
    }
    .checkout-btn {
        min-height: 50px;
        border: 0;
        border-radius: 6px;
        background: #d20a0a;
        color: var(--white);
        font-weight: 1000;
        text-transform: uppercase;
        transition: background-color 0.2s ease, opacity 0.2s ease;
    }
    .checkout-btn:hover {
        background: #a90707;
    }
    .checkout-btn:disabled {
        cursor: not-allowed;
        opacity: 0.48;
    }
    .seat-panel {
        min-width: 0;
        padding: 1rem;
    }
    @media (min-width: 900px) {
        .ticket-hero {
            grid-template-columns: minmax(0, 1fr) 320px;
        }
        .checkout-grid {
            grid-template-columns: 320px minmax(0, 1fr);
            align-items: start;
        }
        .checkout-panel {
            position: sticky;
            top: 1rem;
        }
    }
    @media (max-width: 640px) {
        width: min(100% - 1rem, 1180px);
        .ticket-hero {
            padding: 1.5rem;
        }
        .layout-meta {
            grid-template-columns: 1fr;
        }
    }
`;

export default OctagonTickets;
