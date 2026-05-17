import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAssetUrl } from '../utils';

const Athlete = (props) => {
    const {
        fighterName,
        _id,
        win,
        lose,
        draw,
        homeTown,
        fightingStyle,
        country,
        nickName,
        image1,
        image2,
        weightClass = {},
    } = props;
    const profileImage = image1 || image2 || '/uploads/fighters/no-profile-image.png';
    const className = weightClass?.className || 'Open weight';
    const hometownText = [homeTown, country].filter(Boolean).join(', ');

    return (
        <Wrapper>
            <article className="fighter-card">
                <Link to={'/fighter/' + _id} className="image-link" aria-label={`${fighterName} profile`}>
                    <div className="fighter-img">
                        <img src={getAssetUrl(profileImage)} alt={fighterName} />
                    </div>
                </Link>
                <div className="fighter-info">
                    <div>
                        <p className="nickName">{nickName ? `"${nickName}"` : 'UFC athlete'}</p>
                        <h3>{fighterName}</h3>
                        <p className="division">{className}</p>
                    </div>
                    <div className="record-row">
                        <div>
                            <span>{win}</span>
                            <p>Win</p>
                        </div>
                        <div>
                            <span>{lose}</span>
                            <p>Loss</p>
                        </div>
                        <div>
                            <span>{draw}</span>
                            <p>Draw</p>
                        </div>
                    </div>
                    <div className="meta">
                        <span>{fightingStyle || 'MMA'}</span>
                        <span>{country || 'Global'}</span>
                    </div>
                    {hometownText && <p className="home">{hometownText}</p>}
                    <Link to={'/fighter/' + _id} className='btn-profile'>View profile</Link>
                </div>
            </article>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    min-width: 0;
    .fighter-card {
        height: 100%;
        min-height: 470px;
        display: grid;
        grid-template-rows: 220px 1fr;
        overflow: hidden;
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        background: var(--white);
        box-shadow: 0 18px 45px rgba(15, 15, 18, 0.08);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .fighter-card:hover {
        transform: translateY(-4px);
        border-color: rgba(210, 10, 10, 0.3);
        box-shadow: 0 24px 60px rgba(15, 15, 18, 0.14);
    }
    .image-link {
        display: block;
        min-width: 0;
        text-decoration: none;
    }
    .fighter-img {
        height: 100%;
        display: grid;
        place-items: end center;
        background:
            linear-gradient(180deg, rgba(30, 31, 36, 0.95), rgba(9, 9, 11, 1)),
            radial-gradient(circle at center top, rgba(210, 10, 10, 0.3), transparent 40%);
    }
    .fighter-img img {
        width: min(88%, 230px);
        height: 210px;
        object-fit: contain;
        filter: drop-shadow(0 14px 18px rgba(0, 0, 0, 0.45));
    }
    .fighter-info {
        display: grid;
        gap: 1rem;
        padding: 1rem;
    }
    .nickName {
        min-height: 1rem;
        margin: 0 0 0.35rem;
        color: var(--grey-500);
        font-size: 0.73rem;
        font-weight: 800;
        text-transform: uppercase;
    }
    h3 {
        margin: 0;
        color: #171719;
        font-size: 1.2rem;
        line-height: 1.05;
        text-transform: uppercase;
    }
    .division {
        margin: 0.35rem 0 0;
        color: #d20a0a;
        font-size: 0.82rem;
        font-weight: 800;
        text-transform: uppercase;
    }
    .record-row {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        overflow: hidden;
    }
    .record-row div {
        padding: 0.65rem 0.5rem;
        text-align: center;
        border-right: 1px solid var(--grey-200);
    }
    .record-row div:last-child {
        border-right: 0;
    }
    .record-row span {
        display: block;
        color: #171719;
        font-size: 1.2rem;
        font-weight: 900;
    }
    .record-row p {
        margin: 0;
        color: var(--grey-500);
        font-size: 0.68rem;
        font-weight: 800;
        text-transform: uppercase;
    }
    .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
    }
    .meta span {
        padding: 0.35rem 0.55rem;
        background: var(--grey-100);
        border-radius: 999px;
        color: var(--grey-700);
        font-size: 0.72rem;
        font-weight: 800;
        text-transform: capitalize;
    }
    .home {
        margin: -0.4rem 0 0;
        color: var(--grey-500);
        font-size: 0.82rem;
    }
    .btn-profile {
        align-self: end;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-height: 44px;
        color: var(--white);
        background-color: #171719;
        border-radius: 6px;
        padding: 0.75rem 1rem;
        cursor: pointer;
        text-decoration: none;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
        transition: background-color 0.2s ease;
    }
    .btn-profile:hover {
        background-color: #d20a0a;
    }
  
`

export default Athlete



