import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  MdEvent,
  MdGroups,
  MdSportsMma,
  MdEmojiEvents,
  MdStadium,
  MdAirlineSeatReclineNormal,
  MdFormatQuote,
  MdOutlineSports,
  MdPeople,
  MdOutlineFlag,
} from 'react-icons/md';
import { useAppContext } from '../context/AppContext';
import StatusState, { LoadingState } from '../components/StatusState';

const adminLinks = [
  {
    title: 'Events',
    text: 'Create cards, manage dates, venues, and ticket entry points.',
    to: '/events',
    icon: <MdEvent />,
    cta: 'Manage events',
  },
  {
    title: 'Fights',
    text: 'Build main cards, prelims, results, finishes, and matchups.',
    to: '/fights',
    icon: <MdSportsMma />,
    cta: 'Manage fights',
  },
  {
    title: 'Fighters',
    text: 'Maintain athlete profiles, records, countries, styles, and images.',
    to: '/fighters',
    icon: <MdGroups />,
    cta: 'Manage fighters',
  },
  {
    title: 'Rankings',
    text: 'Set champions and top contenders for every division.',
    to: '/rankings',
    icon: <MdEmojiEvents />,
    cta: 'Manage rankings',
  },
  {
    title: 'Arenas',
    text: 'Control venues and capacities used by event pages.',
    to: '/arena',
    icon: <MdStadium />,
    cta: 'Manage arenas',
  },
  {
    title: 'Seating',
    text: 'Create sections, rows, seats, and prices for checkout.',
    to: '/seating-layout',
    icon: <MdAirlineSeatReclineNormal />,
    cta: 'Manage seating',
  },
  {
    title: 'Quotes',
    text: 'Curate homepage fighter quotes and editorial moments.',
    to: '/quotes',
    icon: <MdFormatQuote />,
    cta: 'Manage quotes',
  },
  {
    title: 'Divisions',
    text: 'Edit weight classes and division metadata.',
    to: '/weightClasses',
    icon: <MdOutlineSports />,
    cta: 'Manage divisions',
  },
  {
    title: 'Referees',
    text: 'Maintain referee records used in fight result data.',
    to: '/refers',
    icon: <MdOutlineFlag />,
    cta: 'Manage refs',
  },
  {
    title: 'Users',
    text: 'Review accounts, roles, and access for platform administration.',
    to: '/users',
    icon: <MdPeople />,
    cta: 'Manage users',
  },
];

const AdminDashboard = () => {
  const { user, isUserLoading } = useAppContext();

  if (isUserLoading) {
    return (
      <LoadingState
        title="Checking admin access"
        message="Preparing the management hub."
      />
    );
  }

  if (!user) {
    return (
      <StatusState
        eyebrow="Admin"
        title="Login required"
        message="Sign in with admin access to open the management panel."
        action={<Link to="/login" className="btn-main">Go to login</Link>}
      />
    );
  }

  if (user.role !== 'admin') {
    return (
      <StatusState
        eyebrow="Admin"
        title="Admin access only"
        message="This account can browse the public app, but the management panel is reserved for admins."
        action={<Link to="/" className="btn-main">Back home</Link>}
      />
    );
  }

  return (
    <Wrapper>
      <header className="admin-hero">
        <div>
          <p className="eyebrow">Admin console</p>
          <h1>Control room</h1>
          <p className="hero-copy">
            A management hub for events, fighters, rankings, seating, tickets,
            and public-facing content.
          </p>
        </div>
        <div className="profile-card">
          <span>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</span>
          <p>Signed in as</p>
          <h2>{user.firstName} {user.lastName}</h2>
          <strong>{user.role}</strong>
        </div>
      </header>

      <section className="quick-start">
        <div>
          <p className="eyebrow">Operations flow</p>
          <h2>Build an event in four steps.</h2>
        </div>
        <ol>
          <li>Create or open an event.</li>
          <li>Add fighters and fights to the card.</li>
          <li>Confirm seating layout and ticket price.</li>
          <li>Open the public event page and checkout flow.</li>
        </ol>
      </section>

      <section className="admin-grid">
        {adminLinks.map(item => (
          <Link className="admin-card" to={item.to} key={item.title}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span>{item.cta}</span>
          </Link>
        ))}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: min(1180px, calc(100% - 2rem));
  margin: 3rem auto 5rem;
  .admin-hero {
    display: grid;
    gap: 2rem;
    align-items: end;
    padding: clamp(2rem, 5vw, 4rem);
    border-radius: 8px;
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
    margin: 0;
    font-size: clamp(3rem, 9vw, 7rem);
    line-height: 0.88;
    text-transform: uppercase;
  }
  .hero-copy {
    max-width: 620px;
    margin: 1rem 0 0;
    color: rgba(255, 255, 255, 0.72);
  }
  .profile-card {
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.07);
  }
  .profile-card > span {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 999px;
    background: #d20a0a;
    color: var(--white);
    font-size: 1.1rem;
    font-weight: 1000;
    text-transform: uppercase;
  }
  .profile-card p,
  .profile-card strong {
    margin: 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .profile-card h2 {
    margin: 0.35rem 0 0.75rem;
    color: var(--white);
    font-size: 1.35rem;
    line-height: 1;
    text-transform: uppercase;
  }
  .quick-start {
    display: grid;
    gap: 1rem;
    align-items: center;
    margin: 1.25rem 0;
    padding: 1.25rem;
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    background: var(--white);
  }
  .quick-start h2 {
    margin: 0;
    font-size: clamp(1.6rem, 4vw, 3rem);
    line-height: 0.95;
    text-transform: uppercase;
  }
  .quick-start ol {
    display: grid;
    gap: 0.5rem;
    margin: 0;
    padding-left: 1.25rem;
    color: var(--grey-600);
    font-weight: 800;
  }
  .admin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  .admin-card {
    min-height: 250px;
    display: grid;
    align-content: start;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    background: var(--white);
    color: inherit;
    text-decoration: none;
    box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .admin-card:hover {
    transform: translateY(-4px);
    border-color: rgba(210, 10, 10, 0.32);
    box-shadow: 0 22px 54px rgba(15, 15, 18, 0.13);
  }
  .icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background: #171719;
    color: var(--white);
    font-size: 1.45rem;
  }
  .admin-card h3 {
    margin: 0;
    color: #171719;
    font-size: 1.35rem;
    text-transform: uppercase;
  }
  .admin-card p {
    margin: 0;
    color: var(--grey-500);
  }
  .admin-card span {
    align-self: end;
    color: #d20a0a;
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  @media (min-width: 900px) {
    .admin-hero {
      grid-template-columns: minmax(0, 1fr) 280px;
    }
    .quick-start {
      grid-template-columns: minmax(0, 0.8fr) minmax(320px, 1fr);
    }
  }
  @media (max-width: 640px) {
    width: min(100% - 1rem, 1180px);
    .admin-hero {
      padding: 1.5rem;
    }
  }
`;

export default AdminDashboard;
