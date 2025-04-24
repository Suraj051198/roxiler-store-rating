// Validate name (20-60 characters)
export const validateName = (name) => {
  if (!name || name.trim().length < 20 || name.trim().length > 60) {
    return 'Name must be between 20 and 60 characters';
  }
  return '';
};

// Validate address (max 400 characters)
export const validateAddress = (address) => {
  if (!address) {
    return 'Address is required';
  }
  if (address.trim().length > 400) {
    return 'Address must not exceed 400 characters';
  }
  return '';
};

// Validate password (8-16 characters, at least one uppercase and one special character)
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8 || password.length > 16) {
    return 'Password must be between 8 and 16 characters';
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  
  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character';
  }
  
  return '';
};

// Validate confirm password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return '';
};

// Validate email (standard email format)
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  
  return '';
};

// Validate rating (1-5)
export const validateRating = (rating) => {
  if (!rating || rating < 1 || rating > 5) {
    return 'Rating must be between 1 and 5';
  }
  return '';
};

// Validate form fields for signup/create user
export const validateUserForm = (values) => {
  const errors = {};
  
  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  
  const addressError = validateAddress(values.address);
  if (addressError) errors.address = addressError;
  
  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  
  if (values.confirmPassword !== undefined) {
    const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  }
  
  return errors;
};

// Validate login form
export const validateLoginForm = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

// Validate store form
export const validateStoreForm = (values) => {
  const errors = {};
  
  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  
  const addressError = validateAddress(values.address);
  if (addressError) errors.address = addressError;
  
  return errors;
};

// Validate password change form
export const validatePasswordChangeForm = (values) => {
  const errors = {};
  
  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }
  
  const newPasswordError = validatePassword(values.newPassword);
  if (newPasswordError) errors.newPassword = newPasswordError;
  
  const confirmPasswordError = validateConfirmPassword(values.newPassword, values.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  return errors;
}; 