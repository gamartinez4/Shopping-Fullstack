import React, { useEffect } from 'react';
import './style.css'; // Asegúrate de que la ruta es correcta

const LoginPage = ({ username, password, onUsernameChange, onPasswordChange, onLogin}) => {

    return (
        <div className="loginContainer">
            <form onSubmit={onLogin} className="loginForm">
                <div className="formField">
                    <label className="label">
                        Username:
                        <input type="text" value={username} onChange={onUsernameChange} className="input" />
                    </label>
                </div>
                <div className="formField">
                    <label className="label">
                        Password:
                        <input type="password" value={password} onChange={onPasswordChange} className="input" />
                    </label>
                </div>
                <button type="submit" className="loginButton">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;