import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/not-found.svg';

const Error = () => {
  const error = useRouteError();
  const status = error?.status || error?.response?.status;
  const serverMessage = error?.response?.data?.msg || error?.data?.msg;
  const isAuthError = status === 401 || status === 403;
  const isServerError = !status || status >= 500;

  const getErrorCopy = () => {
    if (isAuthError) {
      return {
        eyebrow: 'Session',
        title: 'Admin access needed',
        message:
          serverMessage ||
          'Your demo session may have expired. Open the admin workspace again to continue exploring the dashboard.',
      };
    }

    if (isServerError) {
      return {
        eyebrow: 'Backend waking up',
        title: 'Give it a moment',
        message:
          'This demo uses a free backend host, so the first request can be slow if the server was sleeping. Try again in a few seconds.',
      };
    }

    return {
      eyebrow: 'Error',
      title: 'Something went wrong',
      message: serverMessage || 'Please try again in a few seconds.',
    };
  };

  if (status === 404) {
    return (
      <Wrapper>
        <div className="error-card">
          <img src={img} alt="not found" />
          <p className="eyebrow">404</p>
          <h3>Page not found</h3>
          <p>We cannot find the page you are looking for.</p>
          <Link to="/">Back home</Link>
        </div>
      </Wrapper>
    );
  }

  const copy = getErrorCopy();

  return (
    <Wrapper>
      <div className="error-card">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h3>{copy.title}</h3>
        <p>{copy.message}</p>
        <div className="actions">
          <button type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
          {isAuthError && <Link to="/login">Open admin demo</Link>}
          <Link to="/">Back home</Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background:
    linear-gradient(135deg, rgba(10, 10, 12, 0.98), rgba(48, 11, 16, 0.92)),
    radial-gradient(circle at top right, rgba(210, 10, 10, 0.32), transparent 32%);
  .error-card {
    width: min(720px, 100%);
    text-align: center;
    padding: clamp(2rem, 6vw, 4rem);
    border-radius: 8px;
    background: var(--white);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
  }
  img {
    width: min(90vw, 360px);
    display: block;
    margin: 0 auto 1.5rem;
  }
  .eyebrow {
    margin: 0 0 0.65rem;
    color: #d20a0a;
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  h3 {
    margin: 0;
    color: #171719;
    font-size: clamp(2rem, 6vw, 4rem);
    line-height: 0.95;
    text-transform: uppercase;
  }
  p:not(.eyebrow) {
    line-height: 1.6;
    margin: 1rem auto 1.5rem;
    color: var(--grey-500);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
  a,
  button {
    display: inline-flex;
    min-height: 46px;
    align-items: center;
    justify-content: center;
    border: 0;
    background: #171719;
    padding: 0.75rem 1.2rem;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-weight: 900;
    text-transform: uppercase;
  }
  button {
    background: #d20a0a;
  }
`;

export default Error;
