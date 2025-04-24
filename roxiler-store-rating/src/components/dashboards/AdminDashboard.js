import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../utils/dataUtils';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
    normalUsers: 0,
    storeOwners: 0,
    adminUsers: 0
  });

  useEffect(() => {
    // Get dashboard statistics
    const dashboardStats = getDashboardStats();
    setStats(dashboardStats);
  }, []);

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>
        
        <div className="stat-card">
          <h3>Normal Users</h3>
          <p>{stats.normalUsers}</p>
        </div>
        
        <div className="stat-card">
          <h3>Store Owners</h3>
          <p>{stats.storeOwners}</p>
        </div>
        
        <div className="stat-card">
          <h3>Admin Users</h3>
          <p>{stats.adminUsers}</p>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Manage Users</h5>
              <Link to="/admin/users" className="btn btn-sm btn-primary">View All</Link>
            </div>
            <div className="card-body">
              <p>You can manage all users from here:</p>
              <ul>
                <li>View all registered users</li>
                <li>Add new users with different roles</li>
                <li>View user details</li>
              </ul>
              <Link to="/admin/users/add" className="btn btn-success">Add New User</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Manage Stores</h5>
              <Link to="/stores" className="btn btn-sm btn-primary">View All</Link>
            </div>
            <div className="card-body">
              <p>You can manage all stores from here:</p>
              <ul>
                <li>View all registered stores</li>
                <li>Add new stores</li>
                <li>View store ratings</li>
              </ul>
              <Link to="/admin/stores/add" className="btn btn-success">Add New Store</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 