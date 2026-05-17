import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAthleteContext } from '../context/AthletesContext'
import Athlete from '../components/Athlete'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'
import StatusState, { LoadingState } from '../components/StatusState'



const Athletes = () => {
    // const { data, isLoading, isError, error } = useQuery(getAllFighters());
    const { fetchAthletes, filteredAthletes, isLoading, isError, allAthletes } = useAthleteContext();


    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    useEffect(() => {
        fetchAthletes()
    }, [])

    if (isLoading) {
        return (
            <LoadingState
                title="Loading athletes"
                message="Building the roster and fighter filters."
            />
        )
    }
    if (isError) {
        return (
            <StatusState
                eyebrow="Athletes"
                title="Could not load the roster"
                message="The fighter list is temporarily unavailable. Refresh the page or try again after the API wakes up."
            />
        )
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getPaginatedAthletes = () => {
        const offset = currentPage * itemsPerPage;
        return filteredAthletes.slice(offset, offset + itemsPerPage);
    };
    const pageCount = Math.ceil(filteredAthletes?.length / itemsPerPage);
    const activeFighters = allAthletes.filter(athlete => athlete.status?.toLowerCase() === 'active').length;
    const divisions = new Set(allAthletes.map(athlete => athlete.weightClass?.className).filter(Boolean)).size;

    return (
        <Wrapper>
            <header className="roster-hero">
                <div>
                    <p className="eyebrow">Fighter database</p>
                    <h1>Athletes built for browsing, scouting, and quick comparison.</h1>
                </div>
                <div className="hero-stats">
                    <div>
                        <span>{allAthletes.length}</span>
                        <p>Total fighters</p>
                    </div>
                    <div>
                        <span>{activeFighters}</span>
                        <p>Active</p>
                    </div>
                    <div>
                        <span>{divisions}</span>
                        <p>Divisions</p>
                    </div>
                </div>
            </header>
            <div className="content-grid">
                <aside className="filters">
                    <Filters athletes={allAthletes} setCurrentPage={setCurrentPage} />
                </aside>
                <main className="fighters-panel">
                    <div className="toolbar">
                        <div>
                            <p className="eyebrow">Showing</p>
                            <h2>{filteredAthletes.length} fighters</h2>
                        </div>
                        <p className="toolbar-note">Search by name, then narrow by status, style, gender, or country.</p>
                    </div>
                    <div className="fighters">
                        {getPaginatedAthletes().length === 0 ? (
                            <StatusState
                                eyebrow="No match"
                                title="No fighters found"
                                message="Try clearing filters or choosing a wider weight, country, style, or status."
                                variant="compact"
                            />
                        ) : (
                            getPaginatedAthletes().map((item) => {
                                return <Athlete key={item._id} {...item} />
                            })
                        )}
                    </div>
                    {pageCount > 1 && (
                        <div className="pagination">
                            <Pagination
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                currentPage={currentPage}
                            />
                        </div>
                    )}
                </main>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: min(1180px, calc(100% - 2rem));
    margin: 3rem auto 5rem;
    .roster-hero {
        display: grid;
        gap: 2rem;
        align-items: end;
        padding: clamp(2rem, 5vw, 4rem);
        background:
            linear-gradient(135deg, rgba(10, 10, 12, 0.96), rgba(47, 13, 17, 0.9)),
            radial-gradient(circle at top right, rgba(210, 10, 10, 0.28), transparent 34%);
        color: var(--white);
        border-radius: 8px;
        overflow: hidden;
    }
    .eyebrow {
        margin: 0 0 0.65rem;
        color: #d20a0a;
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.08rem;
        text-transform: uppercase;
    }
    h1 {
        max-width: 760px;
        margin: 0;
        font-size: clamp(2.4rem, 7vw, 5.6rem);
        line-height: 0.92;
        text-transform: uppercase;
    }
    .hero-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.75rem;
    }
    .hero-stats div {
        padding: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.06);
        border-radius: 8px;
    }
    .hero-stats span {
        display: block;
        font-size: clamp(1.5rem, 4vw, 2.4rem);
        font-weight: 900;
    }
    .hero-stats p {
        margin: 0.2rem 0 0;
        color: rgba(255, 255, 255, 0.68);
        font-size: 0.78rem;
        text-transform: uppercase;
    }
    .content-grid {
        display: grid;
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    .fighters-panel {
        min-width: 0;
    }
    .toolbar {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: end;
        margin-bottom: 1rem;
    }
    .toolbar h2 {
        margin: 0;
        font-size: clamp(1.5rem, 3vw, 2.3rem);
        text-transform: uppercase;
    }
    .toolbar-note {
        max-width: 360px;
        margin: 0;
        color: var(--grey-500);
        font-size: 0.9rem;
    }
    .fighters {
        display: grid;
        gap: 1rem;
    }
    .fighters > div:has(.status-state) {
        grid-column: 1 / -1;
    }
    .pagination {
        margin-top: 1.25rem;
    }
    @media (min-width: 720px) {
        .fighters {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    @media (min-width: 992px) {
        .roster-hero {
            grid-template-columns: 1fr 380px;
        }
        .content-grid {
            grid-template-columns: 280px minmax(0, 1fr);
            align-items: start;
        }
        .fighters {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
    @media (max-width: 640px) {
        width: min(100% - 1rem, 1180px);
        .roster-hero {
            padding: 1.5rem;
        }
        .hero-stats {
            grid-template-columns: 1fr;
        }
        .toolbar {
            align-items: start;
            flex-direction: column;
        }
    }
`
export default Athletes
