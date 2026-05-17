import React from 'react';
import styled from 'styled-components';
import aboutImg from '../assets/theguy.png';
import ringImg from '../assets/ring.jpg';

const About = () => {
  return (
    <Wrapper>
      <section className="about-hero">
        <div className="copy">
          <p className="eyebrow">Project overview</p>
          <h1>UFC event platform.</h1>
          <p>
            A full-stack sports product for browsing events, exploring fighters,
            buying tickets, and managing content from an admin panel.
          </p>
        </div>
        <div className="fighter-art">
          <img src={aboutImg} alt="UFC fighter render" />
        </div>
      </section>

      <section className="about-grid">
        <article>
          <p className="eyebrow">Public app</p>
          <h2>Fans can discover events and fighters.</h2>
          <p>
            The public side focuses on schedules, fight cards, rankings, athlete
            profiles, and a ticket checkout path for event discovery and purchase.
          </p>
        </article>
        <article>
          <p className="eyebrow">Admin app</p>
          <h2>Teams can manage real event operations.</h2>
          <p>
            The admin side includes CRUD screens for events, fighters, fights,
            divisions, arenas, seating layouts, quotes, rankings, and users.
          </p>
        </article>
      </section>

      <section className="media-band">
        <div className="video">
          <iframe
            title="UFC overview video"
            src="https://www.youtube.com/embed/-81YoMl9BlM"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="history">
          <img src={ringImg} alt="Octagon ring" />
          <div>
            <p className="eyebrow">Why it presents well</p>
            <h2>It connects public browsing with operations.</h2>
            <p>
              The project has public browsing, authenticated user flows, Stripe
              checkout integration, and an admin dashboard for managing live content.
            </p>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: min(1180px, calc(100% - 2rem));
  margin: 3rem auto 5rem;
  .about-hero {
    display: grid;
    gap: 2rem;
    align-items: end;
    padding: clamp(2rem, 5vw, 4rem);
    border-radius: 8px;
    overflow: hidden;
    background:
      linear-gradient(135deg, rgba(10, 10, 12, 0.98), rgba(48, 11, 16, 0.92)),
      radial-gradient(circle at top right, rgba(210, 10, 10, 0.32), transparent 32%);
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
    max-width: 720px;
    margin: 0;
    font-size: clamp(3rem, 9vw, 7rem);
    line-height: 0.88;
    text-transform: uppercase;
  }
  .copy > p:last-child,
  article > p:last-child,
  .history p:last-child {
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.55;
  }
  .fighter-art {
    display: grid;
    place-items: end center;
  }
  .fighter-art img {
    width: min(100%, 360px);
    height: 420px;
    object-fit: contain;
    filter: drop-shadow(0 24px 28px rgba(0, 0, 0, 0.55));
  }
  .about-grid {
    display: grid;
    gap: 1rem;
    margin: 1.25rem 0;
  }
  article,
  .history {
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    background: var(--white);
    padding: 1.25rem;
    box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
  }
  article h2,
  .history h2 {
    margin: 0;
    color: #171719;
    font-size: clamp(1.8rem, 4vw, 3.4rem);
    line-height: 0.95;
    text-transform: uppercase;
  }
  article > p:last-child,
  .history p:last-child {
    color: var(--grey-500);
  }
  .media-band {
    display: grid;
    gap: 1rem;
  }
  .video {
    min-height: 320px;
    overflow: hidden;
    border-radius: 8px;
    background: #171719;
  }
  iframe {
    width: 100%;
    height: 100%;
    min-height: 320px;
    border: 0;
  }
  .history {
    display: grid;
    gap: 1rem;
  }
  .history img {
    width: 100%;
    min-height: 220px;
    border-radius: 6px;
    object-fit: cover;
  }
  @media (min-width: 850px) {
    .about-hero,
    .media-band {
      grid-template-columns: minmax(0, 1fr) 380px;
    }
    .about-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    width: min(100% - 1rem, 1180px);
    .about-hero {
      padding: 1.5rem;
    }
    .fighter-art img {
      height: 300px;
    }
  }
`;

export default About;
