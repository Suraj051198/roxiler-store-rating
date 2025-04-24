import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getStoreAverageRating, getUserById } from '../../utils/dataUtils';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [storeRating, setStoreRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user details
    const userData = getUserById(id);
    if (!userData) {
      // User not found, redirect to users list
      navigate('/admin/users');
      return;
    }
    
    setUser(userData);
    
    // If user is a store owner, get store rating
    if (userData.role === 'store') {
      // Find store with same email as user
      const storeId = `store${userData.id.replace('user', '')}`;
      const avgRating = getStoreAverageRating(storeId);
      setStoreRating(avgRating);
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Details</h2>
        <Link to="/admin/users" className="btn btn-primary">Back to Users</Link>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {user.name}
            <span className={`badge ms-2 bg-${user.role === 'admin' ? 'danger' : user.role === 'store' ? 'warning' : 'success'}`}>
              {user.role === 'admin' ? 'Admin' : user.role === 'store' ? 'Store Owner' : 'Normal User'}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role === 'admin' ? 'Admin' : user.role === 'store' ? 'Store Owner' : 'Normal User'}</p>
              
              {user.role === 'store' && storeRating !== null && (
                <p><strong>Store Rating:</strong> {storeRating}</p>
              )}
            </div>
            <div className="col-md-6">
              <p><strong>Address:</strong></p>
              <p className="border rounded p-3">{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 