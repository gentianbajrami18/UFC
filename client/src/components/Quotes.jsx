import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { getAssetUrl } from '../utils';
import StatusState from './StatusState';

const Quotes = ({ quotes, isError }) => {
  const [index, setIndex] = useState(0);
  if (isError) {
    return (
      <StatusState
        eyebrow="Quotes"
        title="Could not load fighter quotes"
        message="The rest of the site is still available. Try refreshing if you want to see this section."
        variant="compact"
      />
    );
  }

  if (!quotes?.length) {
    return (
      <StatusState
        eyebrow="Quotes"
        title="No quotes yet"
        message="Once quotes are added from the admin panel, they will rotate here."
        variant="compact"
      />
    );
  }

  const { fighter, quote } = quotes?.[index];
  const { image1, fighterName } = fighter;

  const nextPerson = () => {
    setIndex((index + 1) % quotes.length);
  };
  const prevPerson = () => {
    setIndex(
      (index - 1 + quotes.length) % quotes.length
    );
  };
  const randomPerson = () => {
    setIndex(
      Math.floor(Math.random() * quotes.length)
    );
  };
  return (
    <Wrapper>
      <div className="section-heading">
        <p>Fighter voice</p>
        <h2>Words from the cage</h2>
      </div>
      <article className="review">
        <div className="img-container">
          <img
            src={getAssetUrl(image1)}
            alt="name"
            className="person-img"
          />
        </div>
        <div className="quote-content">
          <p className="info">{quote}</p>
          <h4 className="author">{fighterName}</h4>
          <div className="btn-container">
            <button
              className="prev-btn"
              onClick={prevPerson}
              aria-label="Previous quote"
            >
              <FaChevronLeft />
            </button>
            <button
              className="next-btn"
              onClick={nextPerson}
              aria-label="Next quote"
            >
              <FaChevronRight />
            </button>
          </div>
          <button
            className="btn-main"
            onClick={randomPerson}
          >
            Surprise me
          </button>
        </div>
      </article>
    </Wrapper>
  );
};

export default Quotes;

const Wrapper = styled.section`
  min-height: 80vh;
  padding: 5rem 0 6rem;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 2rem;
  background: #111113;
  color: var(--white);

  .section-heading {
    width: min(920px, 92vw);
    display: grid;
    gap: 0.5rem;
    text-align: center;
  }

  .section-heading p {
    color: var(--primary-500);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .section-heading h2 {
    font-size: clamp(2rem, 5vw, 4.5rem);
    font-weight: 950;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .review {
    width: min(920px, 92vw);
    background: #f8fafc;
    color: var(--black);
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
    transition: var(--transition);
    display: grid;
    gap: 1.5rem;
  }

  .img-container {
    position: relative;
    width: 100%;
    min-height: 320px;
    margin: 0 auto;
    overflow: hidden;
    background: #0b0b0d;
  }

  .person-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: bottom center;
    filter: drop-shadow(0 18px 28px rgba(0, 0, 0, 0.42));
  }

  .img-container::before {
    content: '';
    width: 100%;
    height: 100%;
    background:
      linear-gradient(
        180deg,
        rgba(255, 0, 0, 0.18),
        rgba(0, 0, 0, 0)
      ),
      radial-gradient(
        circle at 50% 18%,
        rgba(255, 255, 255, 0.18),
        transparent 36%
      );
    position: absolute;
    inset: 0;
  }

  .quote-content {
    padding: 1rem 0.5rem;
    display: grid;
    align-content: center;
    justify-items: start;
    gap: 1.25rem;
  }

  .author {
    color: var(--primary-500);
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .info {
    max-width: 34rem;
    font-size: clamp(1.35rem, 3vw, 2.15rem);
    font-weight: 800;
    line-height: 1.18;
    color: var(--black);
  }

  .btn-container {
    display: flex;
    gap: 0.5rem;
  }

  .prev-btn,
  .next-btn {
    width: 2.75rem;
    height: 2.75rem;
    display: inline-grid;
    place-items: center;
    color: var(--black);
    font-size: 1.25rem;
    background: transparent;
    border: 2px solid var(--black);
    transition: var(--transition);
    cursor: pointer;
  }

  .prev-btn:hover,
  .next-btn:hover {
    color: var(--white);
    background: var(--primary-500);
    border-color: var(--primary-500);
  }

  @media (min-width: 760px) {
    .review {
      grid-template-columns: 0.72fr 1fr;
      padding: 1.5rem;
    }

    .img-container {
      min-height: 420px;
    }

    .quote-content {
      padding: 2rem;
    }
  }
`;
