import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRatingByUserAndStore, getRatingsByStoreId, getStores } from '../../utils/dataUtils';

const UserDashboard = () => {
  const [stats, setStats] = useState({
    totalStores: 0,
    ratedStores: 0,
    averageRating: 0
  });
  const [recentRatings, setRecentRatings] = useState([]);
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const stores = getStores();
    const ratings = [];
    let totalRating = 0;
    let ratedCount = 0;
    
    // Get user's ratings for stores
    stores.forEach(store => {
      const rating = getRatingByUserAndStore(currentUser.id, store.id);
      if (rating) {
        totalRating += rating.rating;
        ratedCount++;
        
        // Calculate average rating for the store
        const storeRatings = getRatingsByStoreId(store.id);
        const storeAvgRating = storeRatings.length > 0 
          ? storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length 
          : 0;
        
        ratings.push({
          storeId: store.id,
          storeName: store.name,
          userRating: rating.rating,
          storeAvgRating: storeAvgRating.toFixed(1),
          updatedAt: new Date(rating.updatedAt).toLocaleDateString()
        });
      }
    });
    
    // Sort by most recent first
    ratings.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    setRecentRatings(ratings.slice(0, 5)); // Show only the 5 most recent ratings
    
    setStats({
      totalStores: stores.length,
      ratedStores: ratedCount,
      averageRating: ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : 0
    });
  }, []);
  
  return (
    <div>
      <h2 className="mb-4">User Dashboard</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>
        
        <div className="stat-card">
          <h3>Stores You've Rated</h3>
          <p>{stats.ratedStores}</p>
        </div>
        
        <div className="stat-card">
          <h3>Your Average Rating</h3>
          <p>{stats.averageRating}</p>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Your Recent Ratings</h5>
              <Link to="/stores" className="btn btn-sm btn-primary">View All Stores</Link>
            </div>
            <div className="card-body">
              {recentRatings.length > 0 ? (
                <div className="table-container">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Store Name</th>
                        <th>Your Rating</th>
                        <th>Store Avg. Rating</th>
                        <th>Rated On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRatings.map(rating => (
                        <tr key={rating.storeId}>
                          <td>{rating.storeName}</td>
                          <td>{rating.userRating}</td>
                          <td>{rating.storeAvgRating}</td>
                          <td>{rating.updatedAt}</td>
                          <td>
                            <Link to={`/stores`} className="btn btn-sm btn-primary">Update Rating</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  You haven't rated any stores yet. <Link to="/stores">Browse stores</Link> to submit ratings.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2">
                <Link to="/stores" className="btn btn-primary">Browse Stores</Link>
                <Link to="/change-password" className="btn btn-outline-primary">Change Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 