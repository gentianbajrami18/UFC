import React from 'react';
import customFetch, {
  MINI_EVENTS,
} from '../../utils';
import { useQuery } from '@tanstack/react-query';
import {
  Link,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import EventLanding from '../../components/EventLanding';
import SingleFight from '../../components/SingleFight';
import { useAppContext } from '../../context/AppContext';
import StatusState from '../../components/StatusState';

const getSingleEvent = id => {
  return {
    queryKey: ['event', id],
    queryFn: async () => {
      const response = await customFetch(
        '/events/' + id
      );
      return response.data;
    },
  };
};

export const loader =
  queryClient =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(
      getSingleEvent(id)
    );
    return id;
  };

const SingleEventPage = () => {
  const id = useLoaderData();
  const { data } = useQuery(getSingleEvent(id));
  const { user } = useAppContext();

  const {
    image,
    name,
    arena,
    arenaId,
    date,
  } = data.event;
  const eventArena = arena || arenaId;
  const fights = data.fights;
  const isEventUpcoming =
    date && new Date(date).getTime() > Date.now();

  if (fights.length === 0) {
    return (
      <Wrapper>
        <EventLanding
          image={image}
          name={name}
          date={date}
          arenaLocation={eventArena?.location}
          arenaName={eventArena?.name}
          fighter1Name={'TBD'}
          fighter2Name={'TBD'}
          eventId={id}
          showActions
          showTicketAction={isEventUpcoming}
        />
        <StatusState
          eyebrow="Fight card"
          title="No fights announced yet"
          message="The card will appear here once the admin adds fights for this event."
          variant="compact"
        />
      </Wrapper>
    );
  }
  const { fighter1ID, fighter2ID } = fights[0];

  const mainFights = fights.filter(
    item =>
      item.miniEvent === MINI_EVENTS.MAIN_EVENT
  );
  const prelimsfights = fights.filter(
    item => item.miniEvent === MINI_EVENTS.PRELIMS
  );
  const earlyprelimsfights = fights.filter(
    item =>
      item.miniEvent === MINI_EVENTS.EARLY_PRELIMS
  );

  return (
    <Wrapper>
      <EventLanding
        image={image}
        name={name}
        date={date}
        arenaLocation={eventArena?.location}
        arenaName={eventArena?.name}
        fighter1Name={
          fighter1ID?.fighterName.split(' ').at(-1)
        }
        fighter2Name={
          fighter2ID?.fighterName.split(' ').at(-1)
        }
        eventId={id}
        showActions
        showTicketAction={isEventUpcoming}
      />
      {user && user.role === 'admin' && (
        <CreateButton>
          <Link to="/fights/create">
            Add fight
          </Link>
        </CreateButton>
      )}
      {mainFights.length > 0 && (
        <section className="fights">
          <div className="section-heading">
            <p>Featured bouts</p>
            <h2>Main Card</h2>
          </div>
          <div className="fight-list">
            {mainFights.map((item, index) => {
              return (
                <SingleFight
                  key={item._id}
                  cardIndex={index + 1}
                  {...item}
                />
              );
            })}
          </div>
        </section>
      )}

      {prelimsfights.length > 0 && (
        <section className="fights">
          <div className="section-heading">
            <p>Undercard</p>
            <h2>Prelims</h2>
          </div>
          <div className="fight-list">
            {prelimsfights.map((item, index) => {
              return (
                <SingleFight
                  key={item._id}
                  cardIndex={index + 1}
                  {...item}
                />
              );
            })}
          </div>
        </section>
      )}
      {earlyprelimsfights.length > 0 && (
        <section className="fights">
          <div className="section-heading">
            <p>Opening card</p>
            <h2>Early Prelims</h2>
          </div>
          <div className="fight-list">
            {earlyprelimsfights.map((item, index) => {
              return (
                <SingleFight
                  key={item._id}
                  cardIndex={index + 1}
                  {...item}
                />
              );
            })}
          </div>
        </section>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #f4f5f7;
  padding-bottom: 5rem;

  .fights {
    width: min(1120px, 92vw);
    display: grid;
    gap: 1.25rem;
    margin: 4rem auto 0;
  }

  .section-heading {
    display: grid;
    gap: 0.4rem;
  }

  .section-heading p {
    color: var(--primary-500);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .section-heading h2 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 950;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .fight-list {
    display: grid;
    gap: 1rem;
  }
`;

const CreateButton = styled.div`
  width: min(1120px, 92vw);
  margin: 2rem auto 0;
  text-align: right;
  a {
    display: inline-flex;
    color: var(--white);
    background-color: var(--black);
    border: 2px solid var(--black);
    text-transform: uppercase;
    font-weight: 900;
    text-decoration: none;
    padding: 0.75rem 1rem;
    transition: var(--transition);
  }
  a:hover {
    background-color: var(--primary-500);
    border-color: var(--primary-500);
  }
`;
export default SingleEventPage;
