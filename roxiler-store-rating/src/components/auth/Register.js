import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser, getUserByEmail } from '../../utils/dataUtils';
import { validateUserForm } from '../../utils/validationUtils';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear general error when user types
    if (registerError) {
      setRegisterError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Check if email already exists
    const existingUser = getUserByEmail(formData.email);
    if (existingUser) {
      setRegisterError('Email already registered');
      return;
    }
    
    // Create new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      password: formData.password,
      role: 'user' // Default role is 'user'
    };
    
    // Add user to localStorage
    addUser(newUser);
    
    // Show success message
    setSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: ''
    });
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <h2 className="text-center mb-4">Register</h2>
      
      {success && (
        <div className="alert alert-success" role="alert">
          Registration successful! Redirecting to login...
        </div>
      )}
      
      {registerError && (
        <div className="alert alert-danger" role="alert">
          {registerError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Min 20 characters, Max 60 characters"
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>
        
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
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Max 400 characters"
          ></textarea>
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
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
            placeholder="8-16 characters, include uppercase & special character"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary w-100" disabled={success}>Register</button>
      </form>
      
      <div className="mt-3 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register; 