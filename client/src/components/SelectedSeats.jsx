import React from 'react'
import styled from 'styled-components';

const SelectedSeats = ({ selectedSeats }) => {
    const total = selectedSeats.reduce((sum, seat) => sum + Number(seat.price || 0), 0);

    if (selectedSeats.length === 0) {
        return <Wrapper>
            <div className="summary-head">
                <p>Selected seats</p>
                <span>0</span>
            </div>
            <div className="empty">No seats selected</div>
        </Wrapper>
    }
    return (
        <Wrapper>
            <div className="summary-head">
                <p>Selected seats</p>
                <span>{selectedSeats.length}</span>
            </div>
            <ul>
                {selectedSeats.map((item) => {
                    const { rowId, columnId, price } = item;
                    return <li key={`${rowId}-${columnId}`}>
                        <span>Row {rowId}, Seat {columnId}</span>
                        <strong>${price}</strong>
                    </li>
                })}
            </ul>
            <div className="total">
                <span>Total</span>
                <strong>${total}</strong>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    padding: 1rem;
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    .summary-head,
    .total,
    li {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
    }
    .summary-head p {
        margin: 0;
        color: var(--grey-500);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .summary-head span {
        display: inline-grid;
        place-items: center;
        min-width: 30px;
        height: 30px;
        border-radius: 999px;
        background: #171719;
        color: var(--white);
        font-weight: 900;
    }
    .empty {
        margin-top: 0.8rem;
        padding: 1rem;
        border-radius: 6px;
        background: var(--grey-100);
        color: var(--grey-500);
        font-weight: 800;
        text-align: center;
    }
    ul {
        display: grid;
        gap: 0.55rem;
        margin: 1rem 0;
        padding-left: 0;
        list-style: none;
    }
    li {
        padding: 0.65rem 0;
        border-bottom: 1px solid var(--grey-100);
        color: var(--grey-700);
        font-size: 0.9rem;
    }
    li strong,
    .total strong {
        color: #171719;
    }
    .total {
        padding-top: 0.8rem;
        color: var(--grey-500);
        font-size: 0.9rem;
        font-weight: 900;
        text-transform: uppercase;
    }
`

export default SelectedSeats
