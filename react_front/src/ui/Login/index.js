import React from 'react';
import useLoginViewModel from '../../viewModel/useLoginViewModel'
import LoginPage from './LoginPage';

const LoginContainer = () => {
    const viewModel = useLoginViewModel();

    return <LoginPage {...viewModel} />;
};

export default LoginContainer;