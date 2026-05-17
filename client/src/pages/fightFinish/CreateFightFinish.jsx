import React from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import customFetch from '../../utils';
import { toast } from 'react-toastify';
import AdminPageShell from '../../components/AdminPageShell';

export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                await customFetch.post('/fightFinish', data, { withCredentials: true });
                queryClient.invalidateQueries({ queryKey: ['fightFinishs'] });
                toast.success('Fight finish added successfully');
                return redirect('/fightFinish');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const CreateFightFinish = () => {
    return (
        <AdminPageShell
            eyebrow="Admin"
            title="Create finish"
            description="Add a result method that can be assigned to completed fights."
            action={<Link to="/fightFinish" className="admin-create">Back to finishes</Link>}
        >
            <Form method="post" className="form">
                <div className="form-head">
                    <p className="eyebrow">Result method</p>
                    <h2>Create fight finish</h2>
                </div>
                <div className="form-row">
                    <label htmlFor="finishType" className="form-label">Finish type</label>
                    <input type="text" className="form-input" name="finishType" id="finishType" required />
                </div>
                <div className="form-row">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-input" name="description" id="description" required />
                </div>
                <button type="submit" className="btn-css btn-block">Create finish</button>
            </Form>
        </AdminPageShell>
    )
}

export default CreateFightFinish;
