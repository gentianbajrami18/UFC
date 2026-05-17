import React from 'react'
import { Link, Form } from 'react-router-dom'
import styled from 'styled-components'
import { getAssetUrl } from '../utils'

const SingleRanking = ({ rank, user }) => {
    const champion = rank.champion;
    const championImage = champion?.image1 || '/uploads/fighters/no-profile-image.png';

    return (
        <Wrapper>
            <div className="weightClass">{rank.weightClass.className}</div>
            <div className="champion">
                <div className="champion-info">
                    <span className="champion-span">Champion</span>
                    {champion ? (
                        <Link to={`/fighter/${champion._id}`}>{champion.fighterName}</Link>
                    ) : (
                        <p>N/A</p>
                    )}
                </div>
                <img
                    src={getAssetUrl(championImage)}
                    alt={champion ? champion.fighterName : 'Champion'}
                />
            </div>
            {/* Loop through all ranks */}
            <div className="rank-list">
                {[...Array(10).keys()].map((i) => (
                    <div className="athleteRows" key={i}>
                        {rank[`rank${i + 1}`] ? (
                            <>
                                <span>{i + 1}</span>
                                <Link to={`/fighter/${rank[`rank${i + 1}`]._id}`}>{rank[`rank${i + 1}`].fighterName}</Link>
                            </>
                        ) : (
                            <>
                                <span>{i + 1}</span>
                                <p>Open contender</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {user && user.role === 'admin' && (
                <div className="actions">
                    <Link to={`/ranked/update/${rank._id}`}>Edit</Link>
                    <Form method='post' action={`/rankings/${rank._id}`}>
                        <button type='submit' className='btn delete-btn'>Delete</button>
                    </Form>
                </div>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.article`
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 0 16px 42px rgba(15, 15, 18, 0.08);
  .weightClass {
    padding: 1rem 1rem 0;
    color: #d20a0a;
    text-transform: uppercase;
    font-size: 0.82rem;
    font-weight: 1000;
  }
  .champion {
    min-height: 190px;
    display: grid;
    grid-template-columns: 1fr 120px;
    gap: 0.75rem;
    align-items: end;
    margin: 1rem 1rem 0;
    padding: 1rem;
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(20, 20, 23, 0.98), rgba(44, 10, 14, 0.94)),
      radial-gradient(circle at top right, rgba(210, 10, 10, 0.28), transparent 38%);
    color: var(--white);
  }
  .champion-info {
    min-width: 0;
  }
  .champion a,
  .champion p {
    display: block;
    margin: 0;
    color: var(--white);
    font-size: clamp(1.35rem, 3vw, 2rem);
    line-height: 0.95;
    font-weight: 1000;
    text-decoration: none;
    text-transform: uppercase;
  }
  .champion-span {
    display: block;
    margin-bottom: 0.45rem;
    color: rgba(255, 255, 255, 0.58);
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  .champion img {
    width: 120px;
    height: 170px;
    object-fit: contain;
    filter: drop-shadow(0 14px 18px rgba(0, 0, 0, 0.48));
  }
  .rank-list {
    padding: 0.75rem 1rem 1rem;
  }
  .athleteRows {
    min-height: 40px;
    display: grid;
    grid-template-columns: 34px 1fr;
    gap: 0.55rem;
    align-items: center;
    border-top: 1px solid var(--grey-100);
  }
  .athleteRows span {
    color: #171719;
    font-weight: 1000;
    font-size: 0.9rem;
  }
  .athleteRows a,
  .athleteRows p {
    margin: 0;
    color: var(--grey-700);
    font-size: 0.88rem;
    line-height: 1.2;
    text-decoration: none;
  }
  .athleteRows p {
    color: var(--grey-400);
  }
  .athleteRows a:hover {
    color: #d20a0a;
  }
  .actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0 1rem 1rem;
  }
  .actions a,
  .actions button {
    border: 0;
    background: none;
    color: var(--grey-600);
    font-size: 0.8rem;
    font-weight: 800;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }
  .actions button {
    color: #d20a0a;
  }
  .actions a:hover,
  .actions button:hover {
    color: #171719;
  }
`

export default SingleRanking
