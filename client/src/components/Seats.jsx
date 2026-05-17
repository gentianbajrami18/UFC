import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import ZoomInAndOutButtons from './ZoomInAndOutButtons';

const Seats = ({ selectedSeats, setSelectedSeats, seatingLayout, occupiedSeats }) => {
    const [dimensions, setDimensions] = useState(20);
    const { row, column, price } = seatingLayout;

    const seatRows = Array.from({ length: row }, (_, index) => index + 1);

    const seatColumns = Array.from({ length: column }, (_, index) => index + 1);

    const handleSeatClick = (rowId, columnId) => {
        if (occupiedSeats.some(seat => seat.row === rowId.toString() && seat.column === columnId.toString())) {
            toast.error(`You can't select this ticket`);
            return;
        }
        setSelectedSeats(prevSelectedSeats => {
            let newSelectedSeats = [...prevSelectedSeats];

            const seatClicked = { rowId, columnId, price };
            const isSeatSelected = newSelectedSeats.find((item) =>
                item.rowId === rowId && item.columnId === columnId)
            if (isSeatSelected) {
                newSelectedSeats = newSelectedSeats.filter(item =>
                    !(item.rowId === rowId && item.columnId === columnId)
                );
            } else {
                if (selectedSeats.length === 5) {
                    toast.error('You cannot select more than 5 tickets')
                    return newSelectedSeats;
                } else
                    newSelectedSeats.push(seatClicked);
            }
            return newSelectedSeats;
        });
    };

    const handleZoomIn = () => {
        if (dimensions !== 50) {
            setDimensions(dimensions + 5);
        };
    }

    const handleZoomOut = () => {
        if (dimensions !== 5) {
            setDimensions(dimensions - 5);
        }
    };


    return (
        <Wrapper column={column} dimensions={dimensions}>
            <div className="seat-head">
                <div>
                    <p>Seat map</p>
                    <h2>{seatingLayout.sectionName}</h2>
                </div>
                <span>${price} per ticket</span>
            </div>
            <div className="stage">Octagon</div>
            <div className="map-scroll">
                <div className="seat-grid">
                    {seatRows.map((rowId) => (
                        <div key={rowId} className="seat-row">
                            <p>Row {rowId}</p>
                            <div className="seats">
                                {seatColumns.map((columnId) => (
                                    <Seat
                                        type="button"
                                        key={columnId}
                                        className={`seat ${selectedSeats.find((item) =>
                                            item.rowId === rowId && item.columnId === columnId) ? 'selected' : ''} 
                                            ${occupiedSeats.find((item) =>
                                                item.row === rowId.toString() && item.column === columnId.toString()) ? 'disabled' : ''} `}
                                        aria-label={`Row ${rowId}, seat ${columnId}`}
                                        title={`Row ${rowId}, seat ${columnId}`}
                                        onClick={() => handleSeatClick(rowId, columnId)}
                                    >
                                        <span>{columnId}</span>
                                    </Seat>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ZoomInAndOutButtons handleZoomOut={handleZoomOut} handleZoomIn={handleZoomIn} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    .seat-head {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: end;
    }
    .seat-head p {
        margin: 0 0 0.35rem;
        color: #d20a0a;
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h2 {
        margin: 0;
        color: #171719;
        font-size: clamp(1.6rem, 4vw, 3rem);
        line-height: 0.95;
        text-transform: uppercase;
    }
    .seat-head span {
        color: var(--grey-500);
        font-size: 0.82rem;
        font-weight: 900;
        text-transform: uppercase;
        white-space: nowrap;
    }
    .stage {
        width: min(420px, 90%);
        margin: 0 auto;
        padding: 0.8rem 1rem;
        border-radius: 0 0 999px 999px;
        background: #171719;
        color: var(--white);
        text-align: center;
        font-weight: 1000;
        text-transform: uppercase;
    }
    .map-scroll {
        min-height: 380px;
        overflow: auto;
        border-radius: 8px;
        background:
            linear-gradient(180deg, rgba(245, 247, 250, 0.98), rgba(232, 235, 240, 0.98));
    }
    .seat-grid {
        display: grid;
        min-width: max-content;
        gap: 0.4rem;
        align-content: center;
        justify-content: start;
        padding: 1.25rem;
    }
    .seat-row {
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .seat-row p {
        width: 58px;
        margin: 0 0.85rem 0 0;
        align-self:center;
        color: var(--grey-500);
        font-size: 0.75rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .seats {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 0.35rem;
    }
    .seat {
        width: ${props => `${props.dimensions}px`};
        height: ${props => `${props.dimensions}px`};
        min-width: ${props => `${props.dimensions}px`};
    }
    @media (max-width: 620px) {
        .seat-head {
            align-items: start;
            flex-direction: column;
        }
        .map-scroll {
            min-height: 320px;
        }
    }
`;

const Seat = styled.button`
    border: 0;
    border-radius: 999px;
    background-color: #d8dde6;
    color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
    span {
        display: none;
    }
    &:hover {
        transform: scale(1.12);
        box-shadow: 0 8px 16px rgba(15, 15, 18, 0.18);
    }

    &.selected {
        background-color: #d20a0a;
    }
    &.disabled {
        background-color: #171719;
        cursor: not-allowed;
        opacity: 0.9;
    }
    &.disabled:hover {
        transform: none;
        box-shadow: none;
    }
`;

export default Seats;
