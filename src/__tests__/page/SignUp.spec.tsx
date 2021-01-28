import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdaptar from 'axios-mock-adapter';
import api from '../../services/api';

import SignUp from '../../page/SignUp';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

const apiMock = new MockAdaptar(api);

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/Toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to register', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nomeField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    const nome = fireEvent.change(nomeField, { target: { value: 'johndoe' } });
    const email = fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    const senha = fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    const dados = { nome, email, senha };

    fireEvent.click(buttonElement);

    apiMock.onPost('users').reply(200, dados);

    await waitFor(() => expect(mockedHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('should display an error if register invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nomeField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nomeField, { target: { value: 'johndoe' } });
    fireEvent.change(emailField, {
      target: { value: 'not-valid-email' },
    });
    fireEvent.change(passwordField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  });
});
