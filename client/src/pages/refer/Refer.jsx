import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import customFetch from '../../utils';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import StatusState, { LoadingState } from '../../components/StatusState';
import AdminPageShell from '../../components/AdminPageShell';

const getAll = () => {
    return {
        queryKey: ['refers'],
        queryFn: async () => {
            const response = await customFetch.get('/refers', { withCredentials: true });
            return response.data;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return '';
};

const Refer = () => {
    const { data, error, isLoading, isError } = useQuery(getAll());
    const { refers = [] } = data || {};

    const queryClient = useQueryClient();
    const [deleteItemId, setDeleteItemId] = useState(null);

    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`refers/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            queryClient.invalidateQueries(['refers']);
            toast.success('Deleted successfully');
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg);
        }
    });

    const handleDeleteRefer = (id) => {
        setDeleteItemId(id);
        mutate(id);
    };

    if (isLoading) {
        return (
            <LoadingState
                title="Loading referees"
                message="Fetching referee records for the admin table."
            />
        );
    }

    if (isError) {
        return (
            <StatusState
                eyebrow="Referees"
                title="Could not load referees"
                message={error?.message || 'The referee table is temporarily unavailable.'}
            />
        );
    }

    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Referees"
            description="Manage referee profiles used in fight and result data."
            action={<Link to={'/refers/create'} className='admin-create'>Create referee</Link>}
            stats={[{ label: 'Referees', value: refers.length }]}
        >
            {refers.length ? (
                <Wrapper>
                    <div className="table-shell">
                    <table className='admin-table'>
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>Age</th>
                            <th>Refered Events</th>
                            <th>Home Town</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {refers.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.referedEvents}</td>
                                <td>{item.homeTown}</td>
                                <td>
                                    <div className="table-actions">
                                    <Link to={`/refers/update/${item._id}`} className='admin-action primary'>Edit</Link>
                                    <button type="button" className='admin-action danger' onClick={() => {
                                        setDeleteItemId(item._id);
                                    }}>delete</button>
                                    <ConfirmationModal
                                        isOpen={deleteItemId === item._id}
                                        onClose={() => setDeleteItemId(null)}
                                        onConfirm={() => handleDeleteRefer(item._id)}
                                    />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    </div>
                </Wrapper>
            ) : (
                <StatusState
                    eyebrow="Referees"
                    title="No referees created"
                    message="Add referee records before assigning officials to fights."
                    action={<Link to={'/refers/create'} className='btn-main'>Create referee</Link>}
                    variant="compact"
                />
            )}
        </AdminPageShell>
    );
};

const Wrapper = styled.div`
`;

export default Refer;
