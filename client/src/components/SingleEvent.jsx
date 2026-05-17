import React from 'react'
import styled from 'styled-components'
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Form, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
day.extend(advancedFormat);
import { MdEdit, MdDelete } from 'react-icons/md'
import { getAssetUrl } from '../utils';

const SingleEvent = ({ fights, arenaId, name, date, _id }) => {
    const { user } = useAppContext()
    let fighter1ID;
    let fighter2ID;

    if (fights[0]) {
        fighter1ID = fights[0].fighter1ID;
        fighter2ID = fights[0].fighter2ID;
    } else {
        fighter1ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
        fighter2ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
    }

    const isUpcoming = new Date(date).getTime() > Date.now();
    const fighter1LastName = fighter1ID.fighterName.split(' ').at(-1);
    const fighter2LastName = fighter2ID.fighterName.split(' ').at(-1);

    return (
        <Wrapper>
            <div className="img-container">
                <img src={getAssetUrl(fighter1ID?.image1)} className='img' alt={fighter1ID?.fighterName} />
                <span>vs</span>
                <img src={getAssetUrl(fighter2ID?.image1)} className='img' alt={fighter2ID?.fighterName} />
            </div>
            <div className="info">
                <div className="event-status">
                    <span>{isUpcoming ? 'Upcoming' : 'Completed'}</span>
                    <p>{day(date).format('MMM D, YYYY h:mm A')}</p>
                </div>
                <h3>{name}</h3>
                <Link to={`/events/${_id}`}>{fighter1LastName} vs {fighter2LastName}</Link>
                <p className='arena'>{arenaId?.name}</p>
                <p className='location'>{arenaId?.location}</p>
            </div>
            <div className="btns">
                <Link to={`/events/${_id}`} className='btn secondary'>Fight Card</Link>
                {isUpcoming && <Link to={`/events/tickets/${_id}`} className='btn'>Tickets</Link>}
            </div>
            {user && user.role === 'admin' && <div className='actions'>
                <Link to={`/events/update/${_id}`}><MdEdit /></Link>
                <Form method='post' action={`/events/delete/${_id}`}>
                    <button type='submit'><MdDelete /></button>
                </Form>
            </div>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-1);
    width: 100%;
    margin: 0 auto;
    display: grid;
    gap: 1.25rem;
    border-radius: var(--borderRadius);
    padding: 1rem;
    transition: var(--transition);
    &:hover{
        box-shadow: var(--shadow-3);
        transform: translateY(-2px);
    }
    .img-container{
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 0.75rem;
        place-items: center;
        background: #0f1013;
        overflow: hidden;
        min-height: 180px;
        .img{
            height: 170px;
            object-fit: contain;
            filter: drop-shadow(0px 16px 20px rgba(0,0,0,0.45));
        }
        span{
            color: var(--primary-500);
            font-weight: 950;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    }
    .info{
        display: grid;
        align-content: center;
        gap: 0.35rem;
        min-width: 0;
        h3{
            font-size: clamp(1.35rem, 4vw, 2.35rem);
            font-weight: 950;
            letter-spacing: 0;
            text-transform: uppercase;
        }
        a{
            text-transform:uppercase;
            font-weight:900;
            letter-spacing: normal;
            font-size: 1rem;
            color: black;
            text-decoration:none;
        }
        a:hover{
            color: red;
        }
        .arena,.location{
            text-transform: capitalize;
            font-size:1rem;
            color: var(--grey-600);
        }
    }
    .event-status{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.25rem;
        span{
            background: var(--primary-500);
            color: var(--white);
            padding: 0.25rem 0.45rem;
            font-size: 0.72rem;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        p{
            color: var(--grey-500);
            font-size: 0.82rem;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    }
    .btns{
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        align-content: center;
        .btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 2px solid black;
            border-radius: 0;
            color: black;
            min-height: 2.8rem;
            padding: 0.7rem 1rem;
            overflow: hidden;
            transition: 0.5s all ease-in;
            text-transform:uppercase;
            font-weight:bold;
            text-decoration: none;
        }
        .btn.secondary{
            background: black;
            color: white;
        }
        .btn::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: red;
            transition: 0.5s all ease-in;
        }

        .btn:hover {
            background-color: var(--grey-200);
        }

        .btn:hover::before {
            width: 100%;
        }
    }

    @media (min-width : 992px){
        grid-template-columns: 320px 1fr auto auto;
        gap: 1.5rem;
        padding: 1.25rem;
        align-items: center;
        .btns{
            justify-content: end;
        }
        .img-container{
            min-height: 160px;
            .img{
                height: 150px;
            }
        }
     
    }
    .actions{
        display: flex;
        gap: 0.5rem;
        align-items: center;
        
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
       @media (max-width : 992px){
        .actions{
            margin-bottom: 2rem;
        }
       }
`
export default SingleEvent
