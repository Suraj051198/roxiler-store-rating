import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../utils/dataUtils';
import { validatePasswordChangeForm } from '../../utils/validationUtils';

const ChangePassword = ({ currentUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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
    const validationErrors = validatePasswordChangeForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Check if current password is correct
    if (formData.currentPassword !== currentUser.password) {
      setSubmitError('Current password is incorrect');
      return;
    }
    
    // Update password
    const updated = updatePassword(currentUser.id, formData.newPassword);
    
    if (updated) {
      // Update currentUser in localStorage
      const updatedUser = { ...currentUser, password: formData.newPassword };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setSubmitError('Failed to update password');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Change Password</h2>
      
      {success && (
        <div className="alert alert-success" role="alert">
          Password updated successfully! Redirecting to dashboard...
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
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <input
                type="password"
                className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              {errors.currentPassword && (
                <div className="invalid-feedback">{errors.currentPassword}</div>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="8-16 characters, include uppercase & special character"
              />
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
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
            
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={success}>Update Password</button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                disabled={success}
                onClick={() => navigate('/dashboard')}
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

export default ChangePassword; 