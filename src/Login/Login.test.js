import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {

      beforeEach(() => {
    window.alert = jest.fn(); // Mock alert for all tests
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock state after each test
  });
  
  test('testFormSubmissionWithValidData', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPass' } });
     fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(window.alert).toHaveBeenCalledWith('Form submitted successfully!');
  });

  test('testInputFieldUpdates', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'newUser' } });
    fireEvent.change(passwordInput, { target: { value: 'newPass' } });
    expect(usernameInput.value).toBe('newUser');
    expect(passwordInput.value).toBe('newPass');
  });

  test('testNoErrorMessagesWithValidData', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPass' } });
     fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  test('testEmptyUsernameError', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPass' } });
     fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  });

  test('testEmptyPasswordError', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
     fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('testFormSubmissionWithEmptyFields', () => {
    render(<Login />);
     fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('testFormDisplay', () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeVisible();
    expect(screen.getByLabelText(/password/i)).toBeVisible();
    expect(screen.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('testAlertOnSuccessfulSubmission', () => {
    window.alert = jest.fn();
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPass' } });
     fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(window.alert).toHaveBeenCalledWith('Form submitted successfully!');
  });
});