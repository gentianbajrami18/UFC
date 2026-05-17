import React from 'react';
import { Form, Link, redirect, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../../utils';
import { toast } from 'react-toastify';
import AdminPageShell from '../../components/AdminPageShell';
import StatusState, { LoadingState } from '../../components/StatusState';

const getFightFinish = (id) => {
    return {
        queryKey: ['fightFinishs', id],
        queryFn: async () => {
            const response = await customFetch('/fightFinish/' + id, { withCredentials: true });
            return response.data.fightFinish;
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getFightFinish(id));
    return id;
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch('/fightFinish/' + params.id, data, { withCredentials: true });
        queryClient.invalidateQueries({ queryKey: ['fightFinishs'] });
        toast.success('Fight finish updated successfully');
        return redirect('/fightFinish');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const UpdateFightFinish = () => {
    const id = useLoaderData();
    const { data, isLoading, isError, error } = useQuery(getFightFinish(id));

    if (isLoading) {
        return (
            <LoadingState
                title="Loading finish"
                message="Preparing this result method for editing."
            />
        );
    }

    if (isError) {
        return (
            <StatusState
                eyebrow="Fight finishes"
                title="Could not load finish"
                message={error?.message || 'This finish method is temporarily unavailable.'}
                action={<Link to="/fightFinish" className="btn-main">Back to finishes</Link>}
            />
        );
    }

    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Update finish"
            description="Edit the result method label and description used in fight result data."
            action={<Link to="/fightFinish" className="admin-create">Back to finishes</Link>}
        >
            <Form method="post" className="form">
                <div className="form-head">
                    <p className="eyebrow">Result method</p>
                    <h2>Update fight finish</h2>
                </div>
                <div className="form-row">
                    <label htmlFor="finishType" className="form-label">Finish type</label>
                    <input type="text" className="form-input" defaultValue={data?.finishType} name="finishType" id="finishType" required />
                </div>
                <div className="form-row">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-input" defaultValue={data?.description} name="description" id="description" required />
                </div>
                <button type="submit" className="btn-css btn-block">Save changes</button>
            </Form>
        </AdminPageShell>
    )
}

export default UpdateFightFinish;
