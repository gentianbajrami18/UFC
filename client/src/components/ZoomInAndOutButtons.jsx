import React from 'react'
import styled from 'styled-components'
import { MdAdd, MdRemove } from 'react-icons/md'

const ZoomInAndOutButtons = ({ handleZoomOut, handleZoomIn }) => {
    return (
        <Wrapper>
            <button type='button' onClick={handleZoomOut} aria-label="Zoom out" title="Zoom out"><MdRemove /></button>
            <button type='button' onClick={handleZoomIn} aria-label="Zoom in" title="Zoom in"><MdAdd /></button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 0.25rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    button {
        width: 42px;
        height: 42px;
        display: inline-grid;
        place-items: center;
        border: 1px solid var(--grey-200);
        border-radius: 999px;
        background-color: var(--white);
        color: #171719;
        transition: background-color 0.2s ease, color 0.2s ease;
    }
    button:hover {
        color: var(--white);
        background-color: #171719;
    }
    svg {
        font-size: 1.2rem;
    }
`

export default ZoomInAndOutButtons
