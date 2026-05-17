
import React from 'react';
import styled from 'styled-components';
import { SiUfc } from "react-icons/si";
import { Link } from 'react-router-dom';

const footerGroups = [
  {
    title: 'Explore',
    links: [
      ['Events', '/events'],
      ['Rankings', '/rankings'],
      ['Athletes', '/athletes'],
      ['About', '/about'],
    ],
  },
  {
    title: 'Manage',
    links: [
      ['Admin login', '/login'],
      ['Admin hub', '/admin'],
      ['Ticket orders', '/my-orders'],
    ],
  },
  {
    title: 'Platform',
    links: [
      ['Event operations', '/admin'],
      ['Ticket checkout', '/events'],
      ['Account settings', '/profile'],
    ],
  },
];

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-inner">
        <div className="brand">
          <Link to="/">
            <SiUfc className="icon-u" />
          </Link>
          <p>A full-stack UFC event, roster, ticketing, and admin platform.</p>
        </div>
        <div className="footer-right">
          {footerGroups.map(group => (
            <div className="footer-column" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  background:
    linear-gradient(135deg, #111113, #212126);
  color: #fff;
  padding: clamp(2rem, 5vw, 4rem);
  .footer-inner {
    width: min(1180px, 100%);
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    align-items: start;
  }
  .brand {
    max-width: 360px;
  }
  .icon-u {
    color: #d20a0a;
    width: 150px;
    height: auto;
  }
  .brand p {
    margin-top: 1rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.5;
  }
  .footer-right {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.25rem;
    align-items: start;
  }
  .footer-column h3 {
    color: var(--white);
    font-size: 0.9rem;
    margin-bottom: 0.85rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .footer-column ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .footer-column ul li {
    margin-bottom: 0.55rem;
    line-height: 1.3;
  }
  .footer-column ul li a {
    color: rgba(255,255,255,0.66);
    text-decoration: none;
    font-size: 0.92rem;
    transition: color 0.2s ease;
  }
  .footer-column ul li a:hover {
    color: var(--white);
  }
  @media (min-width: 820px) {
    .footer-inner {
      grid-template-columns: minmax(260px, 1fr) minmax(420px, 1.5fr);
    }
  }
  @media (max-width: 520px) {
    .footer-right {
      grid-template-columns: 1fr;
    }
  }
`;

export default Footer;
