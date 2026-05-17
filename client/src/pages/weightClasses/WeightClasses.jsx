import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify'
import styled from 'styled-components';
import customFetch from '../../utils';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import StatusState, { LoadingState } from '../../components/StatusState';
import AdminPageShell from '../../components/AdminPageShell';

const getAll = () => {
    return {
        queryKey: ['weightClasses'],
        queryFn: async () => {
            const response = await customFetch.get('/weightClasses', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return "";
}


const WeightClasses = () => {
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { data, error, isLoading, isError } = useQuery(getAll());
    const { weightClasses = [] } = data || {};

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`weightClasses/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            queryClient.invalidateQueries(['weightClasses'])
            toast.success('Deleted successfully')
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg)
        }
    })
    const handleDeleteWeightClass = (id) => {
        setDeleteItemId(id)
        mutate(id)
    };


    if (isLoading) {
        return (
            <LoadingState
                title="Loading weight classes"
                message="Fetching divisions for the admin table."
            />
        )
    }

    if (isError) {
        return (
            <StatusState
                eyebrow="Weight classes"
                title="Could not load divisions"
                message={error?.message || 'The weight class table is temporarily unavailable.'}
            />
        )
    }


    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Divisions"
            description="Manage weight classes used by fighters, fights, and rankings."
            action={<Link to={'/weightClasses/create'} className='admin-create'>Create division</Link>}
            stats={[{ label: 'Divisions', value: weightClasses.length }]}
        >
            {weightClasses.length ? (
                <Wrapper>
                    <div className="table-shell">
                    <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Pound</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weightClasses.map((item) => (
                            <tr key={item._id}>
                                <td>{item.className}</td>
                                <td>{item.pound}</td>
                                <td>
                                    <div className="table-actions">
                                    <Link to={`/weightClasses/update/${item._id}`} className='admin-action primary'>Edit</Link>
                                    <button type="button" className='admin-action danger' onClick={() => {
                                        setDeleteItemId(item._id);
                                    }}>delete</button>
                                    <ConfirmationModal
                                        isOpen={deleteItemId === item._id}
                                        onClose={() => setDeleteItemId(null)}
                                        onConfirm={() => handleDeleteWeightClass(item._id)}
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
                    eyebrow="Weight classes"
                    title="No divisions created"
                    message="Add the first weight class so fighters and rankings can be organized."
                    action={<Link to={'/weightClasses/create'} className='btn-main'>Create division</Link>}
                    variant="compact"
                />
            )}
        </AdminPageShell>
    )
}

const Wrapper = styled.div`
`;
export default WeightClasses
