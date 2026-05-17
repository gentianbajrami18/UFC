import React from 'react'
import { useQuery } from '@tanstack/react-query'
import customFetch from '../../utils'
import styled from 'styled-components';
import UpdateUserForm from '../../components/UpdateUserForm';
import UpdateUserPasswordForm from '../../components/UpdateUserPasswordForm';
import StatusState, { LoadingState } from '../../components/StatusState';

const getUser = () => {
    return {
        queryKey: ['user'],
        queryFn: async () => {
            const response = await customFetch('/users/showMe', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getUser());
    return ''
}

const Profile = () => {

    const { data, isLoading, isError } = useQuery(getUser())
    const user = data?.user;

    if (isLoading) {
        return (
            <LoadingState
                title="Loading profile"
                message="Preparing your account settings."
            />
        )
    }

    if (isError) {
        return (
            <StatusState
                eyebrow="Profile"
                title="Could not load profile"
                message="Please log in again or try refreshing the page."
            />
        )
    }

    return (
        <Wrapper>
            <header className="profile-hero">
                <div>
                    <p className="eyebrow">Account</p>
                    <h1>Profile settings</h1>
                    <p className="hero-copy">Manage personal details and keep the account secure.</p>
                </div>
                <div className="identity">
                    <span>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</span>
                    <p>Signed in as</p>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <strong>{user.role}</strong>
                </div>
            </header>
            <div className="profile-grid">
                <section className="text-info">
                    <p className="eyebrow">Personal information</p>
                    <h3>Update account details</h3>
                    <p>Change profile information used across authenticated pages.</p>
                </section>
                <div className="update-user-form">
                    <UpdateUserForm {...user} />
                </div>
                <section className="text-info">
                    <p className="eyebrow">Security</p>
                    <h3>Change password</h3>
                    <p>Update the password associated with this account.</p>
                </section>
                <div className="update-user-password-form">
                    <UpdateUserPasswordForm />
                </div>
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.section`
    width: min(1180px, calc(100% - 2rem));
    margin: 3rem auto 5rem;
    .profile-hero {
        display: grid;
        gap: 2rem;
        align-items: end;
        padding: clamp(2rem, 5vw, 4rem);
        border-radius: 8px;
        background:
            linear-gradient(135deg, rgba(10, 10, 12, 0.98), rgba(48, 11, 16, 0.92)),
            radial-gradient(circle at top right, rgba(210, 10, 10, 0.32), transparent 32%);
        color: var(--white);
    }
    .eyebrow{
        margin: 0 0 0.65rem;
        color: #d20a0a;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h1{
        margin: 0;
        font-size: clamp(3rem, 9vw, 7rem);
        line-height: 0.88;
        text-transform: uppercase;
    }
    .hero-copy{
        margin: 1rem 0 0;
        color: rgba(255,255,255,0.72);
    }
    .identity{
        padding: 1.25rem;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 8px;
        background: rgba(255,255,255,0.07);
    }
    .identity > span{
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        margin-bottom: 1rem;
        border-radius: 999px;
        background: #d20a0a;
        color: var(--white);
        font-weight: 1000;
        text-transform: uppercase;
    }
    .identity p,
    .identity strong{
        margin: 0;
        color: rgba(255,255,255,0.62);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .identity h2{
        margin: 0.35rem 0 0.75rem;
        color: var(--white);
        font-size: 1.35rem;
        line-height: 1;
        text-transform: uppercase;
    }
    .profile-grid{
        display: grid;
        gap: 1.25rem;
        margin-top: 1.25rem;
    }
    .text-info{
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        background: var(--white);
        padding: 1.25rem;
        box-shadow: 0 16px 40px rgba(15,15,18,0.08);
    }
    .text-info h3{
        color: #171719;
        font-size: clamp(1.5rem, 4vw, 3rem);
        line-height: 0.95;
        font-weight: 900;
        text-transform: uppercase;
    }
    .text-info p{
        color: var(--grey-500);
        line-height: 1.5;
    }
    .form{
        margin: 0;
        max-width: none;
    }
    @media (min-width: 850px){
        .profile-hero{
            grid-template-columns: minmax(0, 1fr) 280px;
        }
        .profile-grid{
            grid-template-columns: 330px minmax(0, 1fr);
            align-items: start;
        }
    }
    @media (max-width: 640px){
        width: min(100% - 1rem, 1180px);
        .profile-hero{
            padding: 1.5rem;
        }
    }
`
export default Profile
