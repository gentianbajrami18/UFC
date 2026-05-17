import React from "react";
import styled from "styled-components";
import customFetch from "../utils";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SingleRanking from "../components/SingleRanking";
import StatusState, { LoadingState } from "../components/StatusState";

const getAllRankings = () => {
  return {
    queryKey: ['ranked'],
    queryFn: async () => {
      const { data } = await customFetch.get('/ranked');
      return data;
    }
  };
};
const getCurrentUser = () => {
  return {
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data } = await customFetch.get('/users/showMe');
      return data?.user;
    }
  };
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(getAllRankings(), getCurrentUser());
  return ''
}


const Rankings = () => {
  const { data, isLoading, isError } = useQuery(getAllRankings())
  const user = useQuery({
    ...getCurrentUser(),
    retry: false,
  }).data;
  const rankings = data?.ranked || [];

  if (isLoading) {
    return (
      <LoadingState
        title="Loading rankings"
        message="Preparing the champions and division leaderboards."
      />
    );
  }

  if (isError) {
    return (
      <StatusState
        eyebrow="Rankings"
        title="Could not load rankings"
        message="The ranking board is temporarily unavailable. Refresh the page or try again after the API is online."
      />
    );
  }


  return (
    <Wrapper>
      <header className="rankings-hero">
        <div>
          <p className="eyebrow">UFC leaderboard</p>
          <h1>Athlete rankings</h1>
          <p className="hero-copy">
            Champions, contenders, and division ladders in one clean board.
          </p>
        </div>
        <div className="rankings-summary">
          <span>{rankings.length}</span>
          <p>Published divisions</p>
          {user && user.role === 'admin' && (
            <Link to="/ranked/create">Create ranking</Link>
          )}
        </div>
      </header>
      <section className="ranking-strip">
        <div>
          <p>Official-style board</p>
          <h2>Champions first, contenders below.</h2>
        </div>
        <span>Updated from admin data</span>
      </section>
        {rankings.length ? (
          <div className="rankings">
            {rankings.map((rank) => (
              <div key={rank._id}>
                <SingleRanking rank={rank} user={user} />
              </div>
            ))}
          </div>
        ) : (
          <StatusState
            eyebrow="Rankings"
            title="No rankings published"
            message="Create a ranking set from the admin panel to show champions and contenders here."
            variant="compact"
          />
        )}
    </Wrapper>
  );
};

export default Rankings;

const Wrapper = styled.div`
  width: min(1180px, calc(100% - 2rem));
  margin: 3rem auto 5rem;
  .rankings-hero {
    display: grid;
    gap: 2rem;
    align-items: end;
    padding: clamp(2rem, 5vw, 4rem);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(14, 14, 16, 0.98), rgba(42, 10, 14, 0.92)),
      radial-gradient(circle at 88% 12%, rgba(210, 10, 10, 0.32), transparent 30%);
    color: var(--white);
  }
  .eyebrow {
    margin: 0 0 0.65rem;
    color: #d20a0a;
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  h1 {
    margin: 0;
    font-size: clamp(3rem, 9vw, 7rem);
    line-height: 0.88;
    text-transform: uppercase;
  }
  .hero-copy {
    max-width: 560px;
    margin: 1rem 0 0;
    color: rgba(255, 255, 255, 0.72);
    font-size: 1rem;
  }
  .rankings-summary {
    display: grid;
    gap: 0.35rem;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.07);
  }
  .rankings-summary span {
    font-size: 3rem;
    font-weight: 1000;
    line-height: 1;
  }
  .rankings-summary p {
    margin: 0 0 1rem;
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .rankings-summary a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0.7rem 1rem;
    border-radius: 6px;
    background: #d20a0a;
    color: var(--white);
    font-size: 0.78rem;
    font-weight: 900;
    text-decoration: none;
    text-transform: uppercase;
  }
  .ranking-strip {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin: 1.25rem 0;
    padding: 1.25rem;
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    background: var(--white);
  }
  .ranking-strip p {
    margin: 0 0 0.35rem;
    color: #d20a0a;
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .ranking-strip h2 {
    margin: 0;
    font-size: clamp(1.5rem, 3vw, 2.4rem);
    text-transform: uppercase;
  }
  .ranking-strip > span {
    color: var(--grey-500);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .rankings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }
  @media (min-width: 900px) {
    .rankings-hero {
      grid-template-columns: minmax(0, 1fr) 260px;
    }
  }
  @media (max-width: 640px) {
    width: min(100% - 1rem, 1180px);
    .rankings-hero {
      padding: 1.5rem;
    }
    .ranking-strip {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;
