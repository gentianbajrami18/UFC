import React from 'react';
import styled from 'styled-components';

const YouTubeVideo = ({ videoId, title }) => {
  if (!videoId) {
    return null;
  }
  return (
    <Wrapper>
      <div className="video-copy">
        <p>Watch</p>
        <h2>{title}</h2>
        <span>
          A quick story break that gives the homepage
          motion and context before the quote section.
        </span>
      </div>
      <div className="video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video"
        ></iframe>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: min(1120px, 92vw);
  margin: 0 auto;
  padding: 5rem 0;
  display: grid;
  gap: 2rem;

  .video-copy {
    display: grid;
    gap: 0.65rem;
  }

  .video-copy p {
    color: var(--primary-500);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h2 {
    color: var(--black);
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 950;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .video-copy span {
    max-width: 34rem;
    color: var(--grey-600);
    line-height: 1.6;
  }

  .video-frame {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background: #09090a;
    border: 1px solid var(--grey-200);
    box-shadow: var(--shadow-4);
  }

  .video-frame::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border: 8px solid rgba(255, 255, 255, 0.08);
    z-index: 1;
  }

  .video {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  @media (min-width: 900px) {
    grid-template-columns: 0.68fr 1.32fr;
    align-items: center;
  }
`;

export default YouTubeVideo;
