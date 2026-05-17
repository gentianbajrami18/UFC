import React from 'react'
import customFetch, { getAssetUrl } from '../utils'
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import AthleteRecord from '../components/AthleteRecord';
import AthleteInfo from '../components/AthleteInfo';

const getSingleFighter = (id) => {
    return {
        queryKey: ['singleFighter', id],
        queryFn: async () => {
            const { data } = await customFetch(`fighters/${id}`);
            return data;
        }
    }
}
const getAllFightsByFighterId = (id) => {
    return {
        queryKey: ['fights', 'fighter', id],
        queryFn: async () => {
            const response = await customFetch.get('/fights/fighter/' + id);
            return response.data;
        }
    }
}


export const loader = (queryClient) => async ({ params }) => {
    await queryClient.ensureQueryData(getSingleFighter(params.id))
    await queryClient.ensureQueryData(getAllFightsByFighterId(params.id))
    return params.id;
}

const AthleteProfile = () => {
    const id = useLoaderData()
    const { data } = useQuery(getSingleFighter(id));
    const { data: data1 } = useQuery(getAllFightsByFighterId(id));

    const { fighter } = data;
    const { fighterName, fightingStyle, win, draw, lose, status, age, weightClass, country,
        image2, legReach, nickName, reach, homeTown } = fighter;
    const record = `${win} - ${lose} - ${draw}`;

    return (
        <>
            <Wrapper>
                <div className="hero-inner">
                    <div className="info">
                        <div className="badges">
                            <span>{weightClass.className} Division</span>
                            <span>{status}</span>
                        </div>
                        <p className="eyebrow">Athlete profile</p>
                        <h3 className="nickName">{nickName ? `"${nickName}"` : 'UFC fighter'}</h3>
                        <h1 className='name'>{fighterName}</h1>
                        <div className="profile-stats">
                            <div>
                                <strong>{record}</strong>
                                <span>W-L-D</span>
                            </div>
                            <div>
                                <strong>{fightingStyle || 'MMA'}</strong>
                                <span>Style</span>
                            </div>
                            <div>
                                <strong>{country}</strong>
                                <span>Country</span>
                            </div>
                        </div>
                    </div>
                    <div className="img-container">
                        <img src={getAssetUrl(image2 || '/uploads/fighters/no-profile-image.png')} className='img' alt={fighterName} />
                    </div>
                </div>
            </Wrapper>
            <AthleteInfo status={status} homeTown={homeTown} age={age} legReach={legReach} weightClass={weightClass}
                reach={reach} fightingStyle={fightingStyle} country={country} />
            <AthleteRecord fights={data1?.fights || []} />
        </>
    )
}

const Wrapper = styled.section`
    background:
        linear-gradient(135deg, rgba(11, 11, 13, 0.98), rgba(33, 33, 38, 0.94)),
        radial-gradient(circle at 80% 12%, rgba(210, 10, 10, 0.32), transparent 32%);
    color: var(--white);
    overflow: hidden;
    .hero-inner {
        width: min(1180px, calc(100% - 2rem));
        min-height: 620px;
        display: grid;
        gap: 2rem;
        align-items: end;
        margin: 0 auto;
        padding: clamp(3rem, 7vw, 6rem) 0 0;
    }
    .info {
        position: relative;
        z-index: 1;
        padding-bottom: clamp(2rem, 5vw, 4rem);
    }
    .badges {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 2rem;
    }
    .badges span {
        padding: 0.45rem 0.7rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 999px;
        color: rgba(255, 255, 255, 0.86);
        font-size: 0.76rem;
        font-weight: 900;
        text-transform: capitalize;
    }
    .eyebrow {
        margin: 0 0 0.8rem;
        color: #d20a0a;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .nickName {
        max-width: 680px;
        margin: 0 0 0.5rem;
        color: rgba(255, 255, 255, 0.62);
        font-size: clamp(1rem, 2vw, 1.35rem);
        font-weight: 900;
        text-transform: uppercase;
    }
    .name {
        max-width: 760px;
        margin: 0;
        color: var(--white);
        font-size: clamp(3.1rem, 10vw, 8rem);
        line-height: 0.84;
        font-weight: 1000;
        text-transform: uppercase;
    }
    .profile-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.75rem;
        max-width: 680px;
        margin-top: 2rem;
    }
    .profile-stats div {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
    }
    .profile-stats strong {
        display: block;
        color: var(--white);
        font-size: clamp(1rem, 2vw, 1.4rem);
        text-transform: uppercase;
    }
    .profile-stats span {
        color: rgba(255, 255, 255, 0.55);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .img-container {
        display: grid;
        place-items: end center;
    }
    .img {
        width: min(100%, 470px);
        height: 470px;
        object-fit: contain;
        filter: drop-shadow(0 24px 28px rgba(0, 0, 0, 0.58));
    }
    @media (min-width: 900px) {
        .hero-inner {
            grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
        }
        .img {
            width: min(100%, 600px);
            height: 640px;
        }
    }
    @media (max-width: 640px) {
        .hero-inner {
            width: min(100% - 1rem, 1180px);
            min-height: auto;
        }
        .profile-stats {
            grid-template-columns: 1fr;
        }
        .img {
            height: 340px;
        }
    }
`

export default AthleteProfile
