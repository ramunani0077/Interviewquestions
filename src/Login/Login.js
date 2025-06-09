import React, { useState } from 'react';
  //import './Login.css'; // Assuming you have a separate CSS file for styling

  const Login = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [errors, setErrors] = useState({ username: '', password: '' });

      const handleSubmit = (event) => {
          event.preventDefault();
          let valid = true;
          const newErrors = { username: '', password: '' };

          if (username.trim() === '') {
              newErrors.username = 'Username is required.';
              valid = false;
          }

          if (password.trim() === '') {
              newErrors.password = 'Password is required.';
              valid = false;
          }

          setErrors(newErrors);

          if (valid) {
              alert('Form submitted successfully!');
              // Here you can add code to handle the form submission, e.g., send data to the server
          }
      };

      return (
          <div className="login-container">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="username">Username:</label>
                      <input
                          type="text"
                          id="username"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                      />
                      {errors.username && <div className="error">{errors.username}</div>}
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                      {errors.password && <div className="error">{errors.password}</div>}
                  </div>
                  <button type="submit">Login</button>
              </form>
          </div>
      );
  };

  export default Login;