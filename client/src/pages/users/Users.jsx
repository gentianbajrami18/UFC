
import { useState } from 'react'
import customFetch from '../../utils'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify'
import ChangeRole from '../../components/ChangeRole';
import AdminPageShell from '../../components/AdminPageShell';

const getAllUsers = () => {
    return {
        queryKey: ['users'],
        queryFn: async () => {
            const response = await customFetch('/users');
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllUsers());
    return "";
}

const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChangeRoleOpen, setIsChangeRoleOpen] = useState(false);
    const { data } = useQuery(getAllUsers());
    const [userId, setUserId] = useState(null);
    const users = data.users;
    const queryClient = useQueryClient();

    const { mutate: deleteUser, isError, error } = useMutation({
        mutationFn: (userId) => customFetch.delete(`users/${userId}`, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('User deleted')
            setUserId(null)
            setIsModalOpen(false)
        },
        onError: (error) => {
            toast.error(error.response.data.msg)
        }
    })

    if (isError) {
        toast.error(error?.response?.data)
        toast.error(error?.response?.data?.msg)
    }

    const handleDeleteUser = () => {
        deleteUser(userId);
    };

    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Users"
            description="Review registered users and adjust admin access for the platform."
            stats={[
                { label: 'Users', value: users.length },
                { label: 'Admins', value: users.filter(item => item.role === 'admin').length },
            ]}
        >
            <div className='table-shell'>
                <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Role</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.country}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className="table-actions">
                                    <button type="button" className='admin-action primary'
                                        onClick={() => {
                                            setIsChangeRoleOpen(true);
                                            setUserId(user._id)
                                        }}>Change Role</button>

                                    <button type="button" className='admin-action danger'
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setUserId(user._id);
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
                    onConfirm={handleDeleteUser}
                />
                {isChangeRoleOpen && <ChangeRole userId={userId}
                    setIsChangeRoleOpen={setIsChangeRoleOpen} setUserId={setUserId} />}
            </div>
        </AdminPageShell>
    )
}

export default Users
