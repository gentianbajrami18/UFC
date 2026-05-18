import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';

const AdminPageShell = ({ eyebrow, title, description, action, stats = [], children }) => {
  const { user } = useAppContext();

  return (
    <Wrapper>
      <header className="admin-page-hero">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {description && <p className="hero-copy">{description}</p>}
        </div>
        {stats.length > 0 && (
          <div className="admin-stats">
            {stats.map(stat => (
              <div key={stat.label}>
                <span>{stat.value}</span>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </header>
      {user?.isDemoAdmin && (
        <div className="demo-delete-note">
          Demo admin can create and edit records. Delete actions are blocked to protect the live demo data.
        </div>
      )}
      {(action) && <div className="admin-toolbar">{action}</div>}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: min(1180px, calc(100% - 2rem));
  margin: 3rem auto 5rem;
  .admin-page-hero {
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
    font-size: clamp(2.7rem, 8vw, 6rem);
    line-height: 0.88;
    text-transform: uppercase;
  }
  .hero-copy {
    max-width: 620px;
    margin: 1rem 0 0;
    color: rgba(255, 255, 255, 0.72);
  }
  .admin-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.75rem;
  }
  .admin-stats div {
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.07);
  }
  .admin-stats span {
    display: block;
    color: var(--white);
    font-size: 2rem;
    font-weight: 1000;
    line-height: 1;
  }
  .admin-stats p {
    margin: 0.35rem 0 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .admin-toolbar {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin: 1.25rem 0;
    padding: 1rem;
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    background: var(--white);
    box-shadow: 0 12px 30px rgba(15, 15, 18, 0.06);
  }
  .demo-delete-note {
    margin: 1.25rem 0 0;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(210, 10, 10, 0.24);
    border-radius: 8px;
    background: rgba(210, 10, 10, 0.08);
    color: #7a0808;
    font-size: 0.9rem;
    font-weight: 800;
  }
  .admin-create,
  .admin-action {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 42px;
    border: 0;
    border-radius: 6px;
    padding: 0.65rem 0.9rem;
    font-size: 0.76rem;
    font-weight: 900;
    text-decoration: none;
    text-transform: uppercase;
  }
  .admin-create,
  .admin-action.primary {
    background: #171719;
    color: var(--white);
  }
  .admin-action.danger {
    background: rgba(210, 10, 10, 0.1);
    color: #d20a0a;
  }
  .admin-search {
    width: min(100%, 340px);
    min-height: 44px;
    padding: 0.7rem 0.75rem;
    border: 1px solid var(--grey-200);
    border-radius: 6px;
    background: var(--grey-50);
  }
  .table-shell {
    overflow-x: auto;
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    background: var(--white);
    box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
  }
  .admin-table {
    width: 100%;
    min-width: 780px;
    border-collapse: collapse;
  }
  .admin-table th,
  .admin-table td {
    padding: 1rem;
    border-bottom: 1px solid var(--grey-100);
    text-align: left;
    vertical-align: middle;
  }
  .admin-table th {
    color: var(--grey-500);
    background: var(--grey-50);
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .admin-table td {
    color: var(--grey-700);
    font-weight: 700;
  }
  .admin-table tr:last-child td {
    border-bottom: 0;
  }
  .table-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  @media (min-width: 900px) {
    .admin-page-hero {
      grid-template-columns: minmax(0, 1fr) minmax(220px, 360px);
    }
  }
  @media (max-width: 640px) {
    width: min(100% - 1rem, 1180px);
    .admin-page-hero {
      padding: 1.5rem;
    }
    .admin-toolbar {
      align-items: stretch;
      flex-direction: column;
    }
    .admin-search {
      width: 100%;
    }
  }
`;

export default AdminPageShell;
