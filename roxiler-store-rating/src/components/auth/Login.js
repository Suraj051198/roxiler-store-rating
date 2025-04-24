import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../../utils/dataUtils';
import { validateLoginForm } from '../../utils/validationUtils';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear general login error when user types
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Find user by email
    const user = getUserByEmail(formData.email);
    
    // Check if user exists and password matches
    if (!user || user.password !== formData.password) {
      setLoginError('Invalid email or password');
      return;
    }
    
    // Set login state
    setIsLoggedIn(true);
    setCurrentUser(user);
    
    // Save user to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <h2 className="text-center mb-4">Login</h2>
      
      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      
      <div className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default Login; 