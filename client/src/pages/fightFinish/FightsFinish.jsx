import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import customFetch from '../../utils';
import ConfirmationModal from '../../components/ConfirmationModal';
import AdminPageShell from '../../components/AdminPageShell';
import StatusState, { LoadingState } from '../../components/StatusState';

const getAllFightFinishes = () => {
    return {
        queryKey: ['fightFinishs'],
        queryFn: async () => {
            const response = await customFetch.get('/fightFinish', { withCredentials: true });
            return response.data.fightFinishs;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllFightFinishes());
    return '';
}

const FightsFinish = () => {
    const { data, isLoading, isError, error } = useQuery(getAllFightFinishes());
    const fightFinishs = data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fightFinishId, setFightFinishId] = useState(null);
    const queryClient = useQueryClient();

    const { mutate: deleteFightFinish } = useMutation({
        mutationFn: (id) => customFetch.delete(`/fightFinish/${id}`, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fightFinishs'] })
            toast.success('Fight finish deleted')
            setFightFinishId(null)
            setIsModalOpen(false)
        },
        onError: (error) => {
            toast.error(error?.response?.data?.msg || 'Could not delete fight finish')
        }
    })

    const handleDeleteFightFinish = () => {
        deleteFightFinish(fightFinishId);
    };

    if (isLoading) {
        return (
            <LoadingState
                title="Loading fight finishes"
                message="Fetching result methods for the admin table."
            />
        );
    }

    if (isError) {
        return (
            <StatusState
                eyebrow="Fight finishes"
                title="Could not load fight finishes"
                message={error?.message || 'The finish methods table is temporarily unavailable.'}
            />
        );
    }

    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Fight finishes"
            description="Manage result methods such as knockout, submission, decision, and stoppage types."
            action={<Link to="/fightFinish/create" className="admin-create">Create finish</Link>}
            stats={[{ label: 'Finish types', value: fightFinishs.length }]}
        >
            {fightFinishs.length ? (
                <div className="table-shell">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Finish type</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fightFinishs.map((finish) => (
                                <tr key={finish._id}>
                                    <td>{finish.finishType}</td>
                                    <td>{finish.description}</td>
                                    <td>
                                        <div className="table-actions">
                                            <Link to={`/fightFinish/update/${finish._id}`} className="admin-action primary">Edit</Link>
                                            <button
                                                type="button"
                                                className="admin-action danger"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setFightFinishId(finish._id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleDeleteFightFinish}
                    />
                </div>
            ) : (
                <StatusState
                    eyebrow="Fight finishes"
                    title="No finish types created"
                    message="Add result methods before recording completed fights."
                    action={<Link to="/fightFinish/create" className="btn-main">Create finish</Link>}
                    variant="compact"
                />
            )}
        </AdminPageShell>
    )
}

export default FightsFinish;
