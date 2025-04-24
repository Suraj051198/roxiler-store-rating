import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoreAverageRating, getStoreByEmail, getUsersWhoRatedStore } from '../../utils/dataUtils';

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState(null);
  const [stats, setStats] = useState({
    totalRatings: 0,
    averageRating: 0
  });
  const [userRatings, setUserRatings] = useState([]);
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Find store by owner's email
    const storeData = getStoreByEmail(currentUser.email);
    if (storeData) {
      setStore(storeData);
      
      // Get average rating for the store
      const avgRating = getStoreAverageRating(storeData.id);
      
      // Get users who rated the store
      const ratings = getUsersWhoRatedStore(storeData.id);
      setUserRatings(ratings);
      
      setStats({
        totalRatings: ratings.length,
        averageRating: avgRating
      });
    }
  }, []);
  
  if (!store) {
    return (
      <div className="alert alert-warning">
        No store associated with your account. Please contact the administrator.
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Store Owner Dashboard</h2>
      
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Store Information</h5>
        </div>
        <div className="card-body">
          <h4>{store.name}</h4>
          <p><strong>Email:</strong> {store.email}</p>
          <p><strong>Address:</strong> {store.address}</p>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>
        
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p>{stats.averageRating}</p>
        </div>
      </div>
      
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">User Ratings</h5>
        </div>
        <div className="card-body">
          {userRatings.length > 0 ? (
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Rated On</th>
                  </tr>
                </thead>
                <tbody>
                  {userRatings.map((rating, index) => (
                    <tr key={index}>
                      <td>{rating.name}</td>
                      <td>{rating.email}</td>
                      <td>{rating.rating}</td>
                      <td>{new Date(rating.ratedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">
              No ratings received yet.
            </div>
          )}
        </div>
      </div>
      
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Quick Actions</h5>
        </div>
        <div className="card-body">
          <Link to="/change-password" className="btn btn-outline-primary">Change Password</Link>
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard; 