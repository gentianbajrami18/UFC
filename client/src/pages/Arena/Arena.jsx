import React, { useState } from 'react'
import customFetch from '../../utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import styled from 'styled-components';
import StatusState, { LoadingState } from '../../components/StatusState';
import AdminPageShell from '../../components/AdminPageShell';


const getAllArenas = () => {
    return {
        queryKey: ['arenas'],
        queryFn: async () => {
            const response = await customFetch('/arena', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async (req) => {
    await queryClient.ensureQueryData(getAllArenas())
    return null;
}

const Arena = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [arenaId, setArenaId] = useState(null);
    let { data, isError, isLoading } = useQuery(getAllArenas());

    const queryClient = useQueryClient();

    const { mutate: handleDeleteArena } = useMutation({
        mutationFn: ({ id }) => customFetch.delete('/arena/' + id, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['arenas'] })
            toast.success('Arena deleted')
        },
        onError: (error) => {
            toast.error(error.response.data.msg)
        }
    })

    if (isLoading) {
        return (
            <LoadingState
                title="Loading arenas"
                message="Fetching venue records for the admin table."
            />
        )
    }
    if (isError) {
        return (
            <StatusState
                eyebrow="Arenas"
                title="Could not load arenas"
                message="The arena list is temporarily unavailable."
            />
        )
    }

    const { arenas = [] } = data;

    if (arenas.length === 0) {
        return (
            <StatusState
                eyebrow="Arenas"
                title="No arenas created"
                message="Create a venue before setting up events and seating layouts."
                action={<Link to={'create'} className='btn-css'>Create arena</Link>}
            />
        )
    }

    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Arenas"
            description="Manage venues and capacities used by events and ticket seating."
            action={<Link to={'create'} className='admin-create'>Create arena</Link>}
            stats={[{ label: 'Arenas', value: arenas.length }]}
        >
        <Wrapper>
            <div className="table-shell">
                <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Seat Capacity</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arenas.map((arena) => (
                            <tr key={arena._id}>
                                <td>{arena.name}</td>
                                <td>{arena.location}</td>
                                <td>{arena.seatingCapacity}</td>
                                <td>
                                    <div className="table-actions">
                                    <Link to={`update/${arena._id}`} className='admin-action primary'>Edit</Link>
                                    <button type="button" className='admin-action danger' onClick={() => {
                                        setIsModalOpen(true);
                                        setArenaId(arena._id)
                                    }}>delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => { handleDeleteArena({ id: arenaId }); setIsModalOpen(false) }}
                />

            </div>
        </Wrapper>
        </AdminPageShell>
    )
}
const Wrapper = styled.div`
`;

export default Arena
