import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStore, addUser, getUserByEmail } from '../../utils/dataUtils';
import { validatePassword, validateStoreForm } from '../../utils/validationUtils';

const AddStore = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: 'Store@123', // Default password
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
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
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateStoreForm(formData);
    
    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      validationErrors.password = passwordError;
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Check if email already exists
    const existingUser = getUserByEmail(formData.email);
    if (existingUser) {
      setSubmitError('Email already registered');
      return;
    }
    
    // Create new store
    const newStore = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
    };
    
    // Add store to localStorage
    addStore(newStore);
    
    // Create store owner user with the same email
    const storeOwner = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      password: formData.password,
      role: 'store'
    };
    
    // Add store owner to localStorage
    addUser(storeOwner);
    
    // Show success message
    setSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      address: '',
      password: 'Store@123'
    });
    
    // Redirect to stores list after 2 seconds
    setTimeout(() => {
      navigate('/stores');
    }, 2000);
  };

  return (
    <div>
      <h2 className="mb-4">Add New Store</h2>
      
      {success && (
        <div className="alert alert-success" role="alert">
          Store created successfully! Redirecting to stores list...
        </div>
      )}
      
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Store Name</label>
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
              <label htmlFor="email" className="form-label">Store Email</label>
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
              <label htmlFor="address" className="form-label">Store Address</label>
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
              <label htmlFor="password" className="form-label">Store Owner Password</label>
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
              <div className="form-text">
                Default password is set. You can change it if needed.
              </div>
            </div>
            
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={success}>Create Store</button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                disabled={success}
                onClick={() => navigate('/stores')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStore; 