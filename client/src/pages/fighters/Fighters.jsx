import React, { useEffect, useState } from 'react'
import customFetch from '../../utils'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfirmationModal from '../../components/ConfirmationModal'
import Pagination from '../../components/Pagination'
import AdminPageShell from '../../components/AdminPageShell'

const getAll = () => {
    return {
        queryKey: ['fighters'],
        queryFn: async () => {
            const response = await customFetch.get('/fighters', { withCredentials: true });
            return response.data.fighters;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return '';
};

const Fighters = () => {
    const { data } = useQuery(getAll());

    const [fighters, setFighters] = useState(data || [])
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`/fighters/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['fighters']);
            toast.success('Deleted successfully');
            setFighters(fighters.filter(fighter => fighter._id !== deleteItemId))
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg);
        }
    });
    useEffect(() => {
        setFighters(data);
    }, [data]);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue) {
            setFighters(data.filter(fighter =>
                fighter.fighterName.toLowerCase().includes(searchValue)
            ));
        } else {
            setFighters(data);
        }
        setCurrentPage(0);
    };

    const handleDelete = (id) => {
        setDeleteItemId(id)
        mutate(id)
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getPaginatedFighters = () => {
        const offset = currentPage * itemsPerPage;
        return fighters.slice(offset, offset + itemsPerPage);
    };


    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Fighters"
            description="Manage athlete profiles, records, images, styles, and roster status."
            action={
                <>
                    <Link to="/fighters/create" className='admin-create'>Create fighter</Link>
                    <input className="admin-search" type="text" onChange={handleSearch} placeholder='Search fighters' />
                </>
            }
            stats={[
                { label: 'Showing', value: fighters.length },
                { label: 'Total', value: data?.length || 0 },
            ]}
        >
        <Wrapper>
            <div className="fighters">
                {getPaginatedFighters().map((fighter) => {
                    return <article key={fighter._id} className="fighter" >
                        <div className="fighter-head">
                            <p>{fighter.weightClass?.className}</p>
                            <h2>{fighter.fighterName}</h2>
                            <h4>{fighter.nickName || 'UFC athlete'}</h4>
                        </div>
                        <div className="info">
                            <p>Status: <span>{fighter.status}</span></p>
                            <p>Country: <span>{fighter?.country}</span></p>
                            <p>fighting Style: <span>{fighter.fightingStyle}</span></p>
                            <p>gender: <span>{fighter.gender}</span></p>

                        </div>
                        <div className="actions">
                            <Link
                                to={`/fighters/update/${fighter._id}`}
                                className="admin-action primary"
                            >
                                Update
                            </Link>
                            <button
                                className="admin-action danger"
                                onClick={(e) => setDeleteItemId(fighter._id)}
                            >
                                Delete
                            </button>
                            <ConfirmationModal
                                isOpen={deleteItemId === fighter._id}
                                onClose={() => setDeleteItemId(null)}
                                onConfirm={() => handleDelete(fighter._id)}
                            />
                        </div>
                    </article>
                })}
            </div>
            {fighters.length > itemsPerPage && (
                <Pagination
                    pageCount={Math.ceil(fighters.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    currentPage={currentPage}
                />
            )}
        </Wrapper>
        </AdminPageShell>
    );
}

const Wrapper = styled.section`
  .fighters{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .fighter{
      display: grid;
      gap: 1rem;
      align-content: start;
      min-height: 330px;
      border: 1px solid var(--grey-200);
      border-radius: 8px;
      background-color: var(--white);
      box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
      padding: 1rem;
      .fighter-head p{
        margin: 0 0 0.5rem;
        color: #d20a0a;
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
      }
      h2{
        margin: 0;
        color: #171719;
        font-size: 1.45rem;
        line-height: 1;
        text-transform: uppercase;
      }
      h4{
        margin: 0.45rem 0 0;
        color: var(--grey-500);
        font-size: 0.86rem;
        font-weight: 900;
        text-transform: uppercase;
      }
      .info p{
        color:var(--grey-700);
        margin: 0.55rem 0 0;
        text-transform: capitalize;
        font-size: 0.9rem;
        span{
          font-weight: 900;
          color: #171719;
        }
      }
      .actions{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: auto;
        align-items: center;
      }
    }
`
export default Fighters
