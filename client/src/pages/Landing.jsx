import React from 'react';
import styled from 'styled-components';
import YouTubeVideo from '../components/YouTubeVideo';
import Quotes from '../components/Quotes';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils';
import EventLanding from '../components/EventLanding';
import StatusState, {
  LoadingState,
} from '../components/StatusState';

const getAll = () => {
  return {
    queryKey: ['quotes'],
    queryFn: async () => {
      const response = await customFetch.get(
        '/quotes',
        { withCredentials: true }
      );
      return response.data;
    },
  };
};
const getNextEvent = () => {
  return {
    queryKey: ['nextEvent'],
    queryFn: async () => {
      const { data } = await customFetch.get(
        '/events/next-event'
      );
      return {
        event: data?.event,
        fights: data?.fights,
      };
    },
  };
};

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(getAll());
  await queryClient.ensureQueryData(
    getNextEvent()
  );
  return null;
};

const Landing = () => {
  const {
    data,
    isError,
    isLoading: isQuotesLoading,
  } = useQuery(getAll());
  const {
    data: nextEventData,
    isLoading: isEventLoading,
    isError: isEventError,
  } = useQuery(getNextEvent());

  const { quotes = [] } = data || {};
  const { event, fights = [] } = nextEventData || {};

  if (isQuotesLoading || isEventLoading) {
    return (
      <LoadingState
        title="Loading fight night"
        message="Preparing the featured event and fighter quotes."
      />
    );
  }

  const {
    image,
    name,
    date,
    arena,
    arenaId,
  } = event || {};
  const eventArena = arena || arenaId;
  const { fighter1ID, fighter2ID } =
    fights?.[0] || {};
  const isFeaturedUpcoming =
    date && new Date(date).getTime() > Date.now();
  return (
    <Wrapper>
      {event && !isEventError ? (
        <EventLanding
          image={image}
          name={name}
          date={date}
          arenaLocation={eventArena?.location}
          arenaName={eventArena?.name}
          fighter1Name={
            fighter1ID?.fighterName?.split(' ')[1] ||
            'TBD'
          }
          fighter2Name={
            fighter2ID?.fighterName?.split(' ')[1] ||
            'TBD'
          }
          eventId={event?._id}
          showActions
          showTicketAction={isFeaturedUpcoming}
        />
      ) : (
        <StatusState
          eyebrow="Featured event"
          title="No featured event yet"
          message="Once an event is available, it will become the hero moment on this page."
          variant="dark"
        />
      )}
      <YouTubeVideo
        videoId={'0OswAJOEXn8'}
        title={'Inside The Octagon'}
      />
      <Quotes quotes={quotes} isError={isError} />
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Landing;
