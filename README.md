# Store Rating System

A full-featured web application for managing store ratings with role-based access control. Built with React and using localStorage for data persistence.

## Overview

This application allows users to submit ratings for stores registered on the platform. It features a single login system with different functionalities available based on user roles (Admin, Normal User, Store Owner).

## Default Admin Credentials

- **Email**: admin@example.com
- **Password**: Admin@123


## Features

- **User Authentication**
  - Login/Register system
  - Role-based access control
  - Password validation
  - Session management

- **Role-Based Access**
  - System Administrator
  - Normal User
  - Store Owner

- **Store Rating**
  - Rate stores on a scale of 1-5
  - View and modify submitted ratings
  - Search and filter stores

- **Data Management**
  - User management
  - Store management
  - Data persistence using localStorage

 
## Screenshots

### User Signup
![image](https://github.com/user-attachments/assets/b535b242-fef8-4ffe-a6dc-d66d19e9cda5)

### User Login
![image](https://github.com/user-attachments/assets/73625e82-8cc0-4d9e-8fc4-cd12dedabe95)

### User Dashboard
![image](https://github.com/user-attachments/assets/896f85a5-fec0-42c0-b65c-f90de7b1590e)

### User Stores
![image](https://github.com/user-attachments/assets/85703b0f-87a9-473b-9e9a-93d27b8d2c0b)

### Admin Dashboard
![image](https://github.com/user-attachments/assets/b175d447-afa1-4023-af5d-6594964986b3)

### Admin Users Management
![image](https://github.com/user-attachments/assets/53ba7a28-6945-4cb0-8fb9-7b4a3a7cf935)

### Admin in Add New Store
![image](https://github.com/user-attachments/assets/60fb45b5-1bbe-4a13-bfaa-9884ddf46382)

### About Store Rating System
![image](https://github.com/user-attachments/assets/6eef6cf5-ae10-4942-b504-b42d623e46dd)


## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## User Roles and Functionalities

### System Administrator
- **Dashboard** - View total users, stores, and submitted ratings
- **User Management**
  - Add new users (Normal, Admin, Store Owner)
  - View user details
  - Filter users by name, email, address, and role
- **Store Management**
  - Add new stores
  - View all stores with ratings
- **Account Management**
  - Change password

### Normal User
- **Registration** - Sign up on the platform
- **Store Browsing**
  - View all registered stores
  - Search stores by name and address
  - Sort listings by various fields
- **Rating Management**
  - Submit ratings (1-5) for stores
  - Modify previously submitted ratings
- **Account Management**
  - Change password

### Store Owner
- **Dashboard**
  - View users who have rated their store
  - See the average rating of their store
- **Account Management**
  - Change password

## Form Validations

- **Name**: 20-60 characters required
- **Address**: Maximum 400 characters
- **Password**: 8-16 characters, must include at least one uppercase letter and one special character
- **Email**: Standard email validation

## Technical Details

- **Frontend**: React.js
- **Styling**: Bootstrap
- **State Management**: React Hooks
- **Data Storage**: localStorage
- **Routing**: React Router
- **Icons**: React Icons

## Application Structure

- `/src`
  - `/components`
    - `/admin` - Admin components
    - `/auth` - Authentication components
    - `/dashboards` - Role-specific dashboards
    - `/layout` - Layout components
    - `/profile` - User profile components
    - `/stores` - Store management components
  - `/utils`
    - `dataUtils.js` - Data operations
    - `validationUtils.js` - Form validations

## License

This project is for demonstration purposes.

## Credits

Developed as part of Roxiler Systems Internship Coding Challenge.
