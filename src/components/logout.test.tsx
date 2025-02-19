import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter,useNavigate } from 'react-router-dom';
import Logout from './Logout';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Logout Component', () => {
  it('should remove token and role from localStorage and navigate to /login on click', () => {
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('role', 'testRole');
    
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    
    const { getByText } = render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );
    
    const button = getByText('Logout');
    fireEvent.click(button);
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(navigate).toHaveBeenCalledWith('/login');
  });
});