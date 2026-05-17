import React from 'react'
import styled from 'styled-components'

const AthleteInfo = ({ homeTown, status, country, age, fightingStyle, legReach, reach, weightClass }) => {
    const stats = [
        ['Status', status],
        ['Born in', [homeTown, country].filter(Boolean).join(', ')],
        ['Age', age],
        ['Weight', weightClass?.pound ? `${weightClass.pound} lb` : weightClass?.className],
        ['Reach', reach],
        ['Leg reach', legReach],
        ['Style', fightingStyle],
    ];

    return (
        <Wrapper>
            <div className="inner">
                <div className="section-head">
                    <p>Vitals</p>
                    <h2>Fighter snapshot</h2>
                </div>
                <div className="info-grid">
                    {stats.map(([label, value]) => (
                        <div className="info-card" key={label}>
                            <p>{label}</p>
                            <span>{value || 'N/A'}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    background-color: #111113;
    color: var(--white);
    .inner {
        width: min(1180px, calc(100% - 2rem));
        margin: 0 auto;
        padding: clamp(2rem, 5vw, 4rem) 0;
    }
    .section-head {
        margin-bottom: 1.25rem;
    }
    .section-head p {
        margin: 0 0 0.45rem;
        color: #d20a0a;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h2 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 0.95;
        text-transform: uppercase;
    }
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        gap: 0.75rem;
    }
    .info-card {
        min-height: 118px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
    }
    .info-card p {
        margin: 0;
        color: rgba(255, 255, 255, 0.58);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .info-card span {
        color: var(--white);
        font-size: clamp(1.15rem, 2vw, 1.8rem);
        font-weight: 900;
        line-height: 1.05;
        text-transform: capitalize;
    }
`

export default AthleteInfo
