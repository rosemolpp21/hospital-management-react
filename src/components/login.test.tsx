import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import Login from '../components/Login';

const mockAxios = new AxiosMockAdapter(axios);

describe('Login Component', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    test('renders login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByText(/Login to your account/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create an account/i })).toBeInTheDocument();
    });

    test('displays success message on successful login', async () => {
        mockAxios.onPost('http://localhost:8080/login/user').reply(200);

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() =>
            expect(screen.getByText(/you are logined successfully/i)).toBeInTheDocument()
        );
    });

    test('displays error message on invalid credentials', async () => {
        mockAxios.onPost('http://localhost:8080/login/user').reply(401, {
            message: 'Invalid credentials',
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'wrongpassword' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() =>
            expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
        );
    });

    test('displays generic error message on server error', async () => {
        mockAxios.onPost('http://localhost:8080/login/user').reply(500);

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() =>
            expect(
                screen.getByText(/An error occurred. Please try again./i)
            ).toBeInTheDocument()
        );
    });
});
