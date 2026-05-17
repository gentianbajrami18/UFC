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
        queryKey: ['quotes'],
        queryFn: async () => {
            const response = await customFetch.get('/quotes', { withCredentials: true });
            return response.data;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return '';
};

const Quotes = () => {
    const { data, error, isLoading, isError } = useQuery(getAll());
    const { quotes = [] } = data || {};
    const queryClient = useQueryClient();
    const [deleteItemId, setDeleteItemId] = useState(null);

    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`quotes/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            queryClient.invalidateQueries(['quotes']);
            toast.success('Quote successfully');
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg);
        }
    });

    const handleDeleteQuote = (id) => {
        setDeleteItemId(id);
        mutate(id);
    };

    if (isLoading) {
        return (
            <LoadingState
                title="Loading quotes"
                message="Fetching quote records for the admin table."
            />
        );
    }

    if (isError) {
        return (
            <StatusState
                eyebrow="Quotes"
                title="Could not load quotes"
                message={error?.message || 'The quotes table is temporarily unavailable.'}
            />
        );
    }

    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Quotes"
            description="Curate homepage fighter quotes and editorial moments."
            action={<Link to={'/quotes/create'} className='admin-create'>Create quote</Link>}
            stats={[{ label: 'Quotes', value: quotes.length }]}
        >
            {quotes.length ? (
                <Wrapper>
                    <div className="table-shell">
                        <table className='admin-table'>
                            <thead>
                                <tr>

                                    <th>Quote</th>
                                    <th>Fighter</th>
                                    <th>Created At</th>
                                    <th>Customize</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotes.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.quote}</td>
                                        <td>{item?.fighter?.fighterName}</td>
                                        <td>{item.createdAt || 'no'}</td>
                                        <td>
                                            <div className="table-actions">
                                            <Link to={`/quotes/update/${item._id}`} className='admin-action primary'>Edit</Link>
                                            <button type="button" className='admin-action danger' onClick={() => {
                                                setDeleteItemId(item._id);
                                            }}>delete</button>
                                            <ConfirmationModal
                                                isOpen={deleteItemId === item._id}
                                                onClose={() => setDeleteItemId(null)}
                                                onConfirm={() => handleDeleteQuote(item._id)}
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
                    eyebrow="Quotes"
                    title="No quotes created"
                    message="Add your first quote to make the landing page feel more alive."
                    action={<Link to={'/quotes/create'} className='btn-main'>Create quote</Link>}
                    variant="compact"
                />
            )}
        </AdminPageShell>
    );
};

const Wrapper = styled.div``;

export default Quotes;
