
import React, { useEffect } from 'react'
import { getUniqueValues } from '../utils'
import { useAthleteContext } from '../context/AthletesContext';
import styled from 'styled-components';

const Filters = ({ athletes, setCurrentPage }) => {
    const { filters: {
        status,
        text,
        country,
        gender,
        fightingStyle
    }, clearFilters, updateFilters } = useAthleteContext();

    const statuses = getUniqueValues(athletes, 'status');
    const fightingStyles = getUniqueValues(athletes, 'fightingStyle');
    const countries = getUniqueValues(athletes, 'country');
    const genders = getUniqueValues(athletes, 'gender');
    const formatOption = value => value.replace(/-/g, ' ');

    useEffect(() => {
        setCurrentPage(0)
    }, [text, gender, fightingStyle, status, country])

    return (
        <Wrapper>
            <div className="filter-head">
                <p>Roster controls</p>
                <h3>Filters</h3>
            </div>
            <div className='content'>
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* search input */}
                    <div className='filter-control'>
                        <label htmlFor="fighter-search">Search</label>
                        <input
                            id="fighter-search"
                            type='text'
                            name='text'
                            value={text}
                            placeholder='Fighter name'
                            onChange={updateFilters}
                            className='search-input'
                        />
                    </div>
                    {/* end of search input */}

                    {/* status */}
                    <div className='filter-control'>
                        <label>Status</label>
                        <div className='statuses'>
                            {statuses.map((c, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={updateFilters}
                                        type='button'
                                        name='status'
                                        className={`${status === c.toLowerCase() ? 'active' : null
                                            }`}
                                    >
                                        {formatOption(c)}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    {/* end of status */}
                    {/* country */}
                    <div className='filter-control'>
                        <label htmlFor="fightingStyle">Fighting style</label>
                        <select
                            id="fightingStyle"
                            name='fightingStyle'
                            value={fightingStyle}
                            onChange={updateFilters}
                            className='fightingStyle'
                        >
                            {fightingStyles.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {formatOption(item)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {/* end of country */}

                    <div className='filter-control'>
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name='gender'
                            value={gender}
                            onChange={updateFilters}
                            className='gender'
                        >
                            {genders.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {formatOption(item)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {/* end of status */}
                    {/* country */}
                    <div className='filter-control'>
                        <label htmlFor="country">Country</label>
                        <select
                            id="country"
                            name='country'
                            value={country}
                            onChange={updateFilters}
                            className='country'
                        >
                            {countries.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {formatOption(item)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {/* end of country */}

                </form>
                <button type='button' className='clear-btn' onClick={clearFilters}>
                    clear filters
                </button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 1rem;
    background: #171719;
    border-radius: 8px;
    color: var(--white);
    .filter-head {
        margin-bottom: 1rem;
    }
    .filter-head p {
        margin: 0 0 0.25rem;
        color: #d20a0a;
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h3 {
        margin: 0;
        font-size: 1.5rem;
        text-transform: uppercase;
    }
    .filter-control {
        margin-bottom: 1.25rem;
     }
    label {
        display: block;
        margin-bottom: 0.45rem;
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .search-input,
    .fightingStyle,
    .country,
    .gender {
        width: 100%;
        min-height: 44px;
        padding: 0.7rem 0.75rem;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        color: var(--white);
        outline: none;
        text-transform: capitalize;
    }
    .search-input:focus,
    select:focus {
        border-color: rgba(210, 10, 10, 0.8);
        box-shadow: 0 0 0 3px rgba(210, 10, 10, 0.16);
    }
    .search-input::placeholder {
        color: rgba(255, 255, 255, 0.45);
    }
    select option {
        color: #171719;
    }
    button {
        cursor: pointer;
        font-weight: 800;
        text-transform: capitalize;
    }
    .statuses {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
    }
    .statuses button {
        min-height: 34px;
        padding: 0.35rem 0.7rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.72);
    }
    .statuses button.active {
        border-color: #d20a0a;
        background: #d20a0a;
        color: var(--white);
    }
    .clear-btn {
        width: 100%;
        min-height: 44px;
        border: 0;
        border-radius: 6px;
        background: var(--white);
        color: #171719;
    }
    @media (min-width: 768px) {
        .content {
            position: sticky;
            top: 1rem;
        }
    }
`

export default Filters
