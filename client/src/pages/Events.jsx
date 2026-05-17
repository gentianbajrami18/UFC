import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils';
import EventLanding from '../components/EventLanding';
import SingleEvent from '../components/SingleEvent';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import StatusState, {
  LoadingState,
} from '../components/StatusState';

const getAllEvents = () => {
  return {
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await customFetch.get(
        '/events'
      );
      return data.events;
    },
  };
};

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(
    getAllEvents()
  );
  return '';
};

const Events = () => {
  const { data, isLoading, isError } =
    useQuery(getAllEvents());
  const [events, setEvents] = useState(data);
  const [isPastEvents, setIsPastEvents] =
    useState(false);
  const { user } = useAppContext();

  useEffect(() => {
    if (!data) return;
    const now = new Date().getTime();
    setEvents(
      data.filter(event => {
        const eventTime = new Date(
          event.date
        ).getTime();
        return eventTime > now;
      })
    );
  }, [data]);

  if (isLoading) {
    return (
      <LoadingState
        title="Loading events"
        message="Pulling together the schedule, venues, and fight cards."
      />
    );
  }

  if (isError) {
    return (
      <StatusState
        eyebrow="Events"
        title="Could not load events"
        message="The event schedule is temporarily unavailable. Refresh the page or try again once the API is online."
      />
    );
  }

  if (data?.length === 0) {
    return (
      <StatusState
        eyebrow="Events"
        title="No events scheduled"
        message="Create the first event from the admin panel to start filling the public schedule."
        action={
          user?.role === 'admin' && (
            <Link to="/events/create">
              Create new event
            </Link>
          )
        }
      />
    );
  }

  const pastEvents = () => {
    const now = new Date().getTime();
    setEvents(
      data.filter(event => {
        const eventTime = new Date(
          event.date
        ).getTime();
        return eventTime < now;
      })
    );
    setIsPastEvents(true);
  };

  const upcomingEvents = () => {
    const now = new Date().getTime();
    setEvents(
      data.filter(event => {
        const eventTime = new Date(
          event.date
        ).getTime();
        return eventTime > now;
      })
    );
    setIsPastEvents(false);
  };
  const featuredEvent = events?.[events.length - 1];
  const { image, name, arena, arenaId, date } =
    featuredEvent || {};
  const featuredArena = arena || arenaId;
  const { fighter1ID = '', fighter2ID = '' } =
    featuredEvent?.fights?.[0] || {};

  return (
    <Wrapper>
      {featuredEvent && (
        <EventLanding
          image={image}
          name={name}
          date={date}
          arenaLocation={featuredArena?.location}
          arenaName={featuredArena?.name}
          eventId={featuredEvent?._id}
          showActions
          showTicketAction={!isPastEvents}
          fighter1Name={
            fighter1ID?.fighterName?.split(' ')[1]
          }
          fighter2Name={
            fighter2ID?.fighterName?.split(' ')[1]
          }
        />
      )}

      <section className="event-browser">
        <div className="browser-copy">
          <p>Schedule</p>
          <h2>Fight nights</h2>
          <span>
            Browse upcoming cards or revisit past
            events, then jump into tickets or the full
            fight card.
          </span>
        </div>
        <div className="buttons" aria-label="Event filter">
          <button
            onClick={upcomingEvents}
            className={!isPastEvents ? 'active' : ''}
          >
            Upcoming
          </button>
          <button
            onClick={pastEvents}
            className={isPastEvents ? 'active' : ''}
          >
            Past
          </button>
        </div>
        <p className="event-count">
          {events?.length || 0}{' '}
          {events?.length === 1 ? 'event' : 'events'}
        </p>
        {user && user.role === 'admin' && (
          <div className="createBtn">
            {' '}
            <Link to="/events/create">
              Create new event
            </Link>
          </div>
        )}
      </section>
      <div className="events">
        {events?.length ? (
          events.map(event => {
            return (
              <SingleEvent
                key={event._id}
                {...event}
              />
            );
          })
        ) : (
          <StatusState
            eyebrow={
              isPastEvents ? 'Past events' : 'Upcoming'
            }
            title={
              isPastEvents
                ? 'No past events yet'
                : 'No upcoming events'
            }
            message={
              isPastEvents
                ? 'Completed events will appear here after their date passes.'
                : 'Switch to past events or create a new event from the admin panel.'
            }
            variant="compact"
          />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #f4f5f7;

  .events {
    width: min(1120px, 92vw);
    margin: 0 auto;
    padding: 0 0 5rem;
    display: grid;
    gap: 1rem;
  }

  .event-browser {
    width: min(1120px, 92vw);
    margin: 0 auto;
    padding: 4rem 0 2rem;
    display: grid;
    gap: 1.25rem;
  }

  .browser-copy {
    display: grid;
    gap: 0.45rem;
  }

  .browser-copy p {
    color: var(--primary-500);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .browser-copy h2 {
    font-size: clamp(2.3rem, 6vw, 4.75rem);
    font-weight: 950;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .browser-copy span {
    max-width: 36rem;
    color: var(--grey-600);
    line-height: 1.6;
  }

  .buttons {
    display: inline-flex;
    width: fit-content;
    padding: 0.35rem;
    background: var(--white);
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-1);
  }

  .buttons button {
    border: transparent;
    background: transparent;
    color: var(--grey-500);
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 900;
    transition: var(--transition);
  }

  .buttons button.active {
    background: var(--black);
    color: var(--white);
  }

  .event-count {
    color: var(--grey-600);
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .createBtn {
    margin: 0;
    text-align: left;
  }

  @media (min-width: 860px) {
    .event-browser {
      grid-template-columns: 1fr auto;
      align-items: end;
    }

    .event-count,
    .createBtn {
      grid-column: 2;
      justify-self: end;
    }
  }
`;

export default Events;
