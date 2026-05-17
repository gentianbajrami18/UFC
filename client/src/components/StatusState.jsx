import React from 'react';
import styled from 'styled-components';

const StatusState = ({
  eyebrow,
  title,
  message,
  action,
  variant = 'default',
}) => {
  return (
    <Wrapper className={variant}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {message && <p className="message">{message}</p>}
      {action && <div className="action">{action}</div>}
    </Wrapper>
  );
};

export const LoadingState = ({
  title = 'Loading',
  message = 'Getting everything ready.',
}) => {
  return (
    <Wrapper className="loading-state">
      <div className="loader-ring" />
      <h2>{title}</h2>
      {message && <p className="message">{message}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: min(92vw, 760px);
  min-height: 42vh;
  margin: 4rem auto;
  padding: 3rem 2rem;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1rem;
  text-align: center;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);

  &.compact {
    min-height: auto;
    margin: 2rem auto;
  }

  &.dark {
    background: #151515;
    color: var(--white);
    border-color: #2a2a2a;
  }

  .eyebrow {
    color: var(--primary-500);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h2 {
    max-width: 680px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .message {
    max-width: 34rem;
    color: var(--grey-500);
    line-height: 1.6;
  }

  &.dark .message {
    color: var(--grey-300);
  }

  .action {
    margin-top: 0.5rem;
  }

  .action a,
  .action button {
    text-decoration: none;
  }

  .action a:not(.btn-main):not(.btn-css),
  .action button:not(.btn-main):not(.btn-css) {
    display: inline-block;
    padding: 0.75rem 1.25rem;
    color: var(--black);
    background: transparent;
    border: 2px solid var(--black);
    font-weight: 800;
    text-transform: uppercase;
    transition: var(--transition);
  }

  .action a:not(.btn-main):not(.btn-css):hover,
  .action button:not(.btn-main):not(.btn-css):hover {
    color: var(--white);
    background: var(--primary-500);
    border-color: var(--primary-500);
  }

  .loader-ring {
    width: 3.5rem;
    height: 3.5rem;
    border: 4px solid var(--grey-200);
    border-top-color: var(--primary-500);
    border-radius: 999px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default StatusState;
