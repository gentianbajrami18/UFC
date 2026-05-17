import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/AppContext'
import { getAssetUrl } from '../utils'

const FighterPanel = ({ fighter, winnerID }) => {
    const isWinner = winnerID?._id === fighter?._id;
    const fighterName = fighter?.fighterName || 'TBD';
    return (
        <div className={`fighter-panel ${isWinner ? 'winner' : ''}`}>
            <img src={getAssetUrl(fighter?.image1)} className='img'
                alt={fighterName} />
            <div className="fighter-copy">
                <p>{fighter?.country || 'TBD'}</p>
                <h3>
                    {fighter?._id ? (
                        <Link to={`/fighter/${fighter._id}`}>{fighterName}</Link>
                    ) : (
                        <span>{fighterName}</span>
                    )}
                </h3>
                <span>{fighter?.win ?? 0}-{fighter?.lose ?? 0}-{fighter?.draw ?? 0}</span>
            </div>
            {isWinner && <strong>Winner</strong>}
        </div>
    )
}

const SingleFight = ({ fighter1ID, fighter2ID, weightClassID, finishID, winnerID, round, minute, seconds, _id, cardIndex }) => {
    const { user } = useAppContext();
    return (
        <Wrapper>
            <div className="fight-number">#{cardIndex || '01'}</div>
            <FighterPanel fighter={fighter1ID} winnerID={winnerID} />
            <div className="center-panel">
                <p className="weight">{weightClassID?.className} Bout</p>
                <div className="vs">vs</div>
                {winnerID &&
                    <div className="winnerInfo">
                        <p>Round <span>{round}</span></p>
                        <p>Time <span>{minute}:{seconds}</span></p>
                        <p>Method <span>{finishID?.finishType}</span></p>
                    </div>
                }
            </div>
            <FighterPanel fighter={fighter2ID} winnerID={winnerID} />
            {user && user.role === 'admin' && <div className='actions'>
                <Link to={`/fights/update/${_id}`}><MdEdit /></Link>
                <Form method='post' action={`/fights/delete/${_id}`}>
                    <button type='submit'><MdDelete /></button>
                </Form>
            </div>}
        </Wrapper>
    )
}

const Wrapper = styled.article`
    background-color: white;
    width: 100%;
    margin: 0 auto;
    display: grid;
    align-items: center;
    gap: 1rem;
    border-radius: var(--borderRadius);
    position: relative;
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-1);
    padding: 1rem;
    overflow: hidden;
    transition: var(--transition);
    &:hover{
        box-shadow: var(--shadow-3);
        transform: translateY(-2px);
    }
    .fight-number{
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        color: var(--grey-400);
        font-size: 0.8rem;
        font-weight: 900;
        letter-spacing: 1px;
        z-index: 2;
    }
    .fighter-panel{
        min-height: 260px;
        display: grid;
        place-items: center;
        align-content: end;
        position: relative;
        background: #111217;
        color: var(--white);
        padding: 1.25rem;
        overflow: hidden;
    }
    .fighter-panel::before{
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255,0,0,0.12), rgba(0,0,0,0));
    }
    .fighter-panel.winner{
        outline: 3px solid var(--primary-500);
    }
    .fighter-panel .img{
        position: relative;
        z-index: 1;
        height: 190px;
        width: 100%;
        object-fit: contain;
        object-position: bottom center;
        filter: drop-shadow(0 16px 18px rgba(0,0,0,0.45));
    }
    .fighter-copy{
        position: relative;
        z-index: 1;
        width: 100%;
        display: grid;
        gap: 0.2rem;
        text-align: center;
    }
    .fighter-copy p{
        color: var(--grey-300);
        font-size: 0.76rem;
        font-weight: 900;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    .fighter-copy h3{
        font-size: clamp(1.25rem, 3vw, 2rem);
        font-weight: 950;
        letter-spacing: 0;
        text-transform: uppercase;
    }
    .fighter-copy a{
        color: var(--white);
        text-decoration: none;
    }
    .fighter-copy a:hover{
        color: var(--primary-500);
    }
    .fighter-copy span{
        color: var(--grey-300);
        font-weight: 900;
    }
    .fighter-panel strong{
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 2;
        background: var(--primary-500);
        color: var(--white);
        padding: 0.35rem 0.55rem;
        font-size: 0.72rem;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    .center-panel{
        display: grid;
        place-items: center;
        gap: 0.85rem;
        text-align: center;
        padding: 0.5rem;
    }
    .weight{
        font-size: 0.86rem;
        font-weight:900;
        text-transform:uppercase;
        color: var(--grey-500);
        letter-spacing: 1px;
    }
    .vs{
        width: 3.5rem;
        height: 3.5rem;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: var(--black);
        color: var(--white);
        font-weight: 950;
        text-transform: uppercase;
    }
    .winnerInfo{
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        justify-content: center;
        align-items: center;
        text-transform:uppercase;
        color: var(--grey-500);
        gap: 0.5rem;
        font-size:0.72rem;
        font-weight: 900;
        span{
            display: block;
            color: var(--black);
            font-weight: bold;
        }
    }
    .actions{
        display: flex;
        gap: 0.5rem;
        align-items: center;
        width: 100%;
        justify-content: center;
        grid-column: 1 /-1;
            a,button{
                color: var(--grey-800);
                font-size: 1.5rem;
                background-color: transparent;
                border: transparent;
            }
            a:hover,button:hover{
                color: black
            }
       }

       @media (min-width : 980px){
        grid-template-columns: 1fr 170px 1fr;
        .center-panel{
            grid-column: 2;
            grid-row: 1;
        }
       }

       @media (max-width : 979px){
        .fight-number{
            position: static;
        }
       }
    `
export default SingleFight
