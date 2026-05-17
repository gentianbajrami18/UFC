import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import customFetch from '../../utils';
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/AppContext';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: '', password: '' });
    const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);

    const { saveUser, removeUser } = useAppContext()
    const loginUser = async (credentials, redirectTo = '/') => {
        try {
            const response = await customFetch.post('/auth/login', credentials, { withCredentials: true });
            const data = response.data;
            saveUser(data.user)
            toast.success(`Welcome, ${data.user.firstName}.`)
            navigate(redirectTo);
        } catch (error) {
            removeUser();
            setValues({ email: '', password: '' })
            toast.error(error?.response?.data?.msg);
            throw error;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(values);
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const enterDemoAdmin = async () => {
        setIsDemoSubmitting(true);
        try {
            const response = await customFetch.post('/auth/demo-admin', {}, { withCredentials: true });
            const data = response.data;
            saveUser(data.user);
            toast.success(`Welcome, ${data.user.firstName}.`);
            navigate('/admin');
        } catch (error) {
            removeUser();
            toast.error(error?.response?.data?.msg || 'Admin access is not available yet.');
        } finally {
            setIsDemoSubmitting(false);
        }
    };

    return (
        <Wrapper>
            <section className="login-hero">
                <div>
                    <p className="eyebrow">UFC platform access</p>
                    <h1>Enter the platform.</h1>
                    <p className="hero-copy">
                        Sign in to manage event operations, fighter data, seating,
                        rankings, ticketing, and public-facing content.
                    </p>
                </div>
                <div className="demo-card">
                    <span>Admin workspace</span>
                    <p>Open the management console with protected admin access and explore the live operations tools.</p>
                    <button type="button" onClick={enterDemoAdmin} disabled={isDemoSubmitting}>
                        {isDemoSubmitting ? 'Opening admin...' : 'Open admin workspace'}
                    </button>
                </div>
            </section>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="form-head">
                    <p className="eyebrow">Welcome back</p>
                    <h2>Login</h2>
                </div>
                <div className="form-row">
                    <label id='email' htmlFor="email" className='form-label'>Email</label>
                    <input type="email" name='email' className='form-input' onChange={handleChange} value={values.email} required />
                </div>
                <div className="form-row">
                    <label id='password' htmlFor="password" className='form-label'>Password</label>
                    <input type="password" name='password' className='form-input' value={values.password} onChange={handleChange} required />
                </div>

                <button type='submit' className='submit-btn'>Login</button>

                <div className="links">
                    <p>
                        Don't have an account?
                        <Link to='/register'>Register</Link>
                    </p>
                    <p>
                        Forgot your password?
                        <Link to='/forgot-password'>Reset Password</Link>
                    </p>
                </div>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    width: min(1180px, calc(100% - 2rem));
    min-height: calc(100vh - 5rem);
    display: grid;
    gap: 1.25rem;
    align-items: start;
    margin: 3rem auto 5rem;
    .login-hero {
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
    .eyebrow {
        margin: 0 0 0.65rem;
        color: #d20a0a;
        font-size: 0.78rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    h1 {
        max-width: 650px;
        margin: 0;
        font-size: clamp(3rem, 9vw, 7rem);
        line-height: 0.88;
        text-transform: uppercase;
    }
    .hero-copy {
        max-width: 620px;
        margin: 1rem 0 0;
        color: rgba(255, 255, 255, 0.72);
    }
    .demo-card {
        padding: 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.07);
    }
    .demo-card span {
        display: block;
        color: var(--white);
        font-size: 1.2rem;
        font-weight: 1000;
        text-transform: uppercase;
    }
    .demo-card p {
        margin: 0.75rem 0 1rem;
        color: rgba(255, 255, 255, 0.68);
        font-size: 0.9rem;
    }
    .demo-card button,
    .submit-btn {
        width: 100%;
        min-height: 48px;
        border: 0;
        border-radius: 6px;
        background: #d20a0a;
        color: var(--white);
        font-weight: 1000;
        text-transform: uppercase;
    }
    .login-form {
        width: 100%;
        max-width: 520px;
        margin: 0 auto;
        padding: clamp(1.25rem, 4vw, 2rem);
        border: 1px solid var(--grey-200);
        border-radius: 8px;
        background: var(--white);
        box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
    }
    .form-head {
        margin-bottom: 1.25rem;
    }
    .form-head h2 {
        margin: 0;
        color: #171719;
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 0.95;
        text-transform: uppercase;
    }
    .form-row {
        margin-bottom: 1rem;
    }
    .form-label {
        display: block;
        margin-bottom: 0.4rem;
        color: var(--grey-500);
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
    }
    .form-input {
        width: 100%;
        min-height: 48px;
        padding: 0.75rem;
        border: 1px solid var(--grey-200);
        border-radius: 6px;
        background: var(--grey-50);
    }
    .form-input:focus {
        border-color: #d20a0a;
        outline: 3px solid rgba(210, 10, 10, 0.14);
    }
    .links {
        display: grid;
        gap: 0.45rem;
        margin-top: 1rem;
    }
    .links p {
        margin: 0;
        color: var(--grey-500);
    }
    .links a {
        margin-left: 0.4rem;
        color: #d20a0a;
        font-weight: 800;
        text-decoration: none;
    }
    @media (min-width: 900px) {
        grid-template-columns: minmax(0, 1fr) 440px;
        .login-hero {
            min-height: 620px;
            grid-template-rows: 1fr auto;
        }
    }
    @media (max-width: 640px) {
        width: min(100% - 1rem, 1180px);
        .login-hero {
            padding: 1.5rem;
        }
    }
`

export default Login
