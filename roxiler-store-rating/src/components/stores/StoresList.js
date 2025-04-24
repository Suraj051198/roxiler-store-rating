import React, { useEffect, useState } from 'react';
import { FaSortDown, FaSortUp, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addOrUpdateRating, getAllStoresWithRatings, getRatingByUserAndStore } from '../../utils/dataUtils';

const StoresList = ({ currentUser }) => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  const [userRatings, setUserRatings] = useState({});
  const [hoveredRatings, setHoveredRatings] = useState({});
  const [ratingSuccess, setRatingSuccess] = useState({});

  useEffect(() => {
    // Get all stores with ratings
    const allStores = getAllStoresWithRatings();
    setStores(allStores);
    setFilteredStores(allStores);
    
    // Get user's ratings for stores
    const ratings = {};
    if (currentUser) {
      allStores.forEach(store => {
        const rating = getRatingByUserAndStore(currentUser.id, store.id);
        if (rating) {
          ratings[store.id] = rating.rating;
        }
      });
      setUserRatings(ratings);
    }
  }, [currentUser]);

  useEffect(() => {
    // Filter stores based on search term
    let result = stores;
    
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(store => 
        store.name.toLowerCase().includes(lowercasedTerm) ||
        store.address.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    // Sort stores
    result = [...result].sort((a, b) => {
      if (sortConfig.key === 'rating') {
        // Parse rating as float for sorting
        const ratingA = parseFloat(a[sortConfig.key]);
        const ratingB = parseFloat(b[sortConfig.key]);
        
        if (ratingA < ratingB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (ratingA > ratingB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
    
    setFilteredStores(result);
  }, [stores, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp className="sort-icon" /> : <FaSortDown className="sort-icon" />;
    }
    return null;
  };

  const handleRatingHover = (storeId, rating) => {
    setHoveredRatings({
      ...hoveredRatings,
      [storeId]: rating
    });
  };

  const handleRatingLeave = (storeId) => {
    setHoveredRatings({
      ...hoveredRatings,
      [storeId]: 0
    });
  };

  const handleRatingClick = (storeId, rating) => {
    // Add or update rating
    addOrUpdateRating(currentUser.id, storeId, rating);
    
    // Update user ratings in state
    setUserRatings({
      ...userRatings,
      [storeId]: rating
    });
    
    // Show success indicator
    setRatingSuccess({
      ...ratingSuccess,
      [storeId]: true
    });
    
    // Clear success indicator after 2 seconds
    setTimeout(() => {
      setRatingSuccess({
        ...ratingSuccess,
        [storeId]: false
      });
    }, 2000);
    
    // Update stores list with new rating
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        // Recalculate average rating
        const allStores = getAllStoresWithRatings();
        const updatedStore = allStores.find(s => s.id === storeId);
        return updatedStore || store;
      }
      return store;
    });
    
    setStores(updatedStores);
  };

  const RatingStars = ({ storeId }) => {
    const currentRating = userRatings[storeId] || 0;
    const hoverRating = hoveredRatings[storeId] || 0;
    const hasSuccessIndicator = ratingSuccess[storeId];
    
    return (
      <div>
        <div className="rating-container" style={{ position: 'relative' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <FaStar
              key={star}
              className={`star ${star <= (hoverRating || currentRating) ? 'filled' : 'empty'}`}
              style={{ 
                fontSize: '1.8rem',
                transition: 'all 0.2s ease',
                transform: hoverRating === star ? 'scale(1.2)' : 'scale(1)'
              }}
              onMouseEnter={() => handleRatingHover(storeId, star)}
              onMouseLeave={() => handleRatingLeave(storeId)}
              onClick={() => handleRatingClick(storeId, star)}
            />
          ))}
          
          {hasSuccessIndicator && (
            <div className="text-success mt-1" style={{ fontSize: '0.8rem' }}>
              Rating saved successfully!
            </div>
          )}
        </div>
        {!currentRating && !hoverRating && (
          <div className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>
            Click on stars to rate
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Stores</h2>
        {currentUser?.role === 'admin' && (
          <Link to="/admin/stores/add" className="btn btn-primary">Add New Store</Link>
        )}
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row filter-container">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          {filteredStores.length > 0 ? (
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th 
                      className="clickable"
                      onClick={() => handleSort('name')}
                    >
                      Store Name {getSortIcon('name')}
                    </th>
                    <th 
                      className="clickable"
                      onClick={() => handleSort('address')}
                    >
                      Address {getSortIcon('address')}
                    </th>
                    <th 
                      className="clickable"
                      onClick={() => handleSort('rating')}
                    >
                      Overall Rating {getSortIcon('rating')}
                    </th>
                    {currentUser?.role !== 'store' && (
                      <th>Your Rating</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.map(store => (
                    <tr key={store.id}>
                      <td>{store.name}</td>
                      <td>
                        {store.address.length > 50 
                          ? `${store.address.substring(0, 50)}...` 
                          : store.address
                        }
                      </td>
                      <td>{store.rating}</td>
                      {currentUser?.role !== 'store' && (
                        <td>
                          <RatingStars storeId={store.id} />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">
              No stores found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoresList; 