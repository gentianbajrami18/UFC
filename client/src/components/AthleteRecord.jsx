import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getAssetUrl } from '../utils'

const AthleteRecord = ({ fights }) => {
    if (fights.length === 0) {
        return null;
    }
    const getLastName = name => name?.split(' ').filter(Boolean).at(-1) || name || 'Fighter';

    return (
        <Wrapper>
            <div className="section-head">
                <p>Fight history</p>
                <h2>Athlete record</h2>
            </div>
            {fights.map(fight => {
                const { fighter1ID, fighter2ID, winnerID, finishID, minute, round, seconds } = fight;
                return <article className='fight' key={fight._id}>
                    <div className="img-container">
                        <div className="fighter1">
                            <img src={getAssetUrl(fighter1ID.image1 || '/uploads/fighters/no-profile-image.png')} className='img' alt={fighter1ID.fighterName} />
                            {winnerID && winnerID._id === fighter1ID._id && <span>won</span>}
                        </div>
                        <div className="fighter1">
                            <img src={getAssetUrl(fighter2ID.image1 || '/uploads/fighters/no-profile-image.png')} className='img' alt={fighter2ID.fighterName} />
                            {winnerID && winnerID._id === fighter2ID._id && <span>won</span>}
                        </div>
                    </div>
                    <div className="data">
                        <div className="names">
                            <h3> <Link to={`/fighter/${fighter1ID._id}`}>{getLastName(fighter1ID.fighterName)}  </Link></h3>
                            <h3>vs</h3>
                            <h3> <Link to={`/fighter/${fighter2ID._id}`}>{getLastName(fighter2ID.fighterName)}  </Link></h3>
                        </div>
                        {winnerID &&
                            <div className="winnerInfo">
                                <p>round : <span>{round}</span></p>
                                <p>time : <span>{minute} : {seconds}</span></p>
                                <p>method : <span>{finishID.finishType}</span></p>
                            </div>
                        }
                    </div>
                </article>
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: min(1180px, calc(100% - 2rem));
    margin: 4rem auto 5rem;
    .section-head {
        margin-bottom: 1.5rem;
    }
    .section-head p {
        margin: 0 0 0.45rem;
        color: #d20a0a;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h2 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 0.95;
        text-transform: uppercase;
    }

    .fight{
        display: grid;
        gap: 1rem;
        margin: 1rem 0;
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        padding: 1rem;
        background: var(--white);
        box-shadow: 0 14px 34px rgba(15, 15, 18, 0.07);
    }
    .img-container{
        display: flex;
        justify-content: center;
        gap: 1rem;
        .fighter1,.fighter2{
            position: relative;
        }
        .img{
            height: 100px;
            object-fit:contain;
            filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
        }
        span{
            background-color: #d20a0a;
            color: white;
            padding: 0.2rem 0.5rem;
            text-transform: uppercase;
            position: absolute;
            bottom: 0;
        }
    }
    .data{
        padding: 1rem;
        text-align:center;
        display: grid;
        place-items: center;
    }
    .names{
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        color:#d20a0a;
        h3{
            margin: 0;
            text-transform: uppercase;
        }
        a{
            color: black;
            text-decoration:none;
        }
        h1:hover{
            text-decoration:underline;
        }
    }
    .winnerInfo{
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1rem;
        p{
            display: flex;
            flex-direction: column;
            text-transform: capitalize;
            color: var(--grey-400);
            span{
                color: black;
                font-weight:bold
            }
        }
    }
    @media (min-width: 600px){
        .fight{
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
        }
        .img-container{
            .img{
                height: 200px;
                width: 140px;
                object-fit: cover;
            }
        }
    }
    @media (min-width: 992px){
        .img-container{
            gap: 1rem;
            .img{
                height: 200px;
                width: 200px;
            }
        }
    }
    @media (max-width: 520px) {
        .winnerInfo {
            grid-template-columns: 1fr;
        }
    }
`

export default AthleteRecord
