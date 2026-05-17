import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import customFetch from '../../utils';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import StatusState, { LoadingState } from '../../components/StatusState';
import AdminPageShell from '../../components/AdminPageShell';

const getAllSeatingLayout = () => {
    return {
        queryKey: ['seating-layout'],
        queryFn: async () => {
            const response = await customFetch('/seatingLayout', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllSeatingLayout());
    return ';'
}

const SeatingLayout = () => {
    const { data, isLoading, isError } = useQuery(getAllSeatingLayout());


    const queryClient = useQueryClient();
    const [deleteItemId, setDeleteItemId] = useState(null);

    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`seatingLayout/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            queryClient.invalidateQueries(['seating-layout']);
            toast.success('Deleted successfully');
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg);
        }
    });
    const handleDeleteSeatingLayout = (id) => {
        setDeleteItemId(id);
        mutate(id);
    };

    if (isLoading) {
        return (
            <LoadingState
                title="Loading seating layouts"
                message="Fetching sections, rows, columns, and linked arenas."
            />
        )
    }

    if (isError) {
        return (
            <StatusState
                eyebrow="Seating"
                title="Could not load seating layouts"
                message="The seating layout table is temporarily unavailable."
            />
        )
    }

    const { seatingLayouts = [] } = data || {}
    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Seating"
            description="Create ticketable sections, rows, columns, and prices for arenas."
            action={<Link to={'/seating-layout/create'} className='admin-create'>Create layout</Link>}
            stats={[
                { label: 'Layouts', value: seatingLayouts.length },
                { label: 'Total seats', value: seatingLayouts.reduce((total, item) => total + Number(item.row || 0) * Number(item.column || 0), 0) },
            ]}
        >
        <Wrapper>
            <div>
                {seatingLayouts.length ? (
                    <div className="table-shell">
                    <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rows</th>
                            <th>Columns</th>
                            <th>Arena</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seatingLayouts.map((item) => (
                            <tr key={item._id}>
                                <td>{item.sectionName}</td>
                                <td>{item.row}</td>
                                <td>{item.column}</td>
                                <td>{item.arena.name}</td>
                                <td>
                                    <div className="table-actions">
                                    <Link to={`/seating-layout/update/${item._id}`} className='admin-action primary'>Edit</Link>
                                    <button type="button" className='admin-action danger' onClick={() => {
                                        setDeleteItemId(item._id);
                                    }}>delete</button>
                                    <ConfirmationModal
                                        isOpen={deleteItemId === item._id}
                                        onClose={() => setDeleteItemId(null)}
                                        onConfirm={() => handleDeleteSeatingLayout(item._id)}
                                    />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    </div>
                ) : (
                    <StatusState
                        eyebrow="Seating"
                        title="No seating layouts created"
                        message="Create a seating section so ticket buyers can select seats."
                        action={<Link to={'/seating-layout/create'} className='btn-main'>Create layout</Link>}
                        variant="compact"
                    />
                )}
            </div>
        </Wrapper>
        </AdminPageShell>
    )
}
const Wrapper = styled.div`
`
export default SeatingLayout
