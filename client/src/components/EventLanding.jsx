import React from 'react';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroPhoto from '../assets/sport.png';
day.extend(advancedFormat);

const EventLanding = ({
  name = 'UFC 286',
  date = '08/12/2015',
  arenaLocation = 'abu dhabi',
  arenaName = 'T-Mobile',
  fighter1Name = 'Khabib',
  fighter2Name = 'McGregor',
  eventId,
  showActions = false,
  showTicketAction = true,
}) => {
  return (
    <Wrapper>
      <img
        src={heroPhoto}
        alt={`${name} featured fight`}
        className="hero-image"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-kicker">Featured event</p>
        <h1>{name}</h1>
        <div className="matchup">
          <span>{fighter1Name}</span>
          <strong>vs</strong>
          <span>{fighter2Name}</span>
        </div>
        <div className="event-meta">
          <p>{day(date).format('MMM D, YYYY h:mm A')}</p>
          <p>
            {arenaName}
            {arenaLocation && `, ${arenaLocation}`}
          </p>
        </div>
        {showActions && eventId && (
          <div className="hero-actions">
            <Link to={`/events/${eventId}`}>
              View Fight Card
            </Link>
            {showTicketAction && (
              <Link
                to={`/events/tickets/${eventId}`}
                className="secondary"
              >
                Get Tickets
              </Link>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: calc(100svh - 8rem);
  position: relative;
  isolation: isolate;
  display: grid;
  align-items: end;
  overflow: hidden;
  background: #0b0b0d;

  .hero-image {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: saturate(1.08) contrast(1.08);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.92) 0%,
        rgba(0, 0, 0, 0.72) 42%,
        rgba(0, 0, 0, 0.28) 100%
      ),
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.08) 0%,
        rgba(0, 0, 0, 0.72) 100%
      );
  }

  .hero-content {
    width: min(1120px, 92vw);
    margin: 0 auto;
    padding: 5rem 0 4rem;
    color: var(--white);
    display: grid;
    gap: 1.25rem;
  }

  .hero-kicker {
    width: fit-content;
    padding: 0.45rem 0.75rem;
    background: var(--primary-500);
    color: var(--white);
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h1 {
    max-width: 780px;
    font-size: clamp(3rem, 9vw, 7.5rem);
    font-weight: 950;
    text-transform: uppercase;
    letter-spacing: 0;
    line-height: 0.88;
  }

  .matchup {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem 1rem;
    font-size: clamp(1.35rem, 4vw, 3.35rem);
    font-weight: 900;
    text-transform: uppercase;
  }

  .matchup strong {
    color: var(--primary-500);
    font-size: 0.78em;
  }

  .event-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
    color: var(--grey-200);
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 0.5rem;
  }

  .hero-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.85rem 1.25rem;
    color: var(--white);
    background: var(--primary-500);
    border: 2px solid var(--primary-500);
    font-weight: 900;
    text-decoration: none;
    text-transform: uppercase;
    transition: var(--transition);
  }

  .hero-actions a:hover {
    background: #b80000;
    border-color: #b80000;
  }

  .hero-actions .secondary {
    background: transparent;
    border-color: var(--white);
  }

  .hero-actions .secondary:hover {
    color: var(--black);
    background: var(--white);
    border-color: var(--white);
  }

  @media (max-width: 620px) {
    min-height: calc(100svh - 7rem);

    .hero-content {
      padding: 4rem 0 3rem;
    }

    .hero-actions a {
      width: 100%;
    }
  }
`;

export default EventLanding;
