// Initialize the localStorage with some sample data if not exists
export const initializeData = () => {
  // Check if data already exists
  if (!localStorage.getItem('users')) {
    const adminUser = {
      id: 'admin1',
      name: 'System Administrator',
      email: 'admin@example.com',
      password: 'Admin@123',
      address: '123 Admin Street, Admin City',
      role: 'admin',
    };

    const users = [adminUser];
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('stores', JSON.stringify([]));
    localStorage.setItem('ratings', JSON.stringify([]));
    localStorage.setItem('nextUserId', '2');
    localStorage.setItem('nextStoreId', '1');
  }
};

// User related functions
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const getUserById = (id) => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const addUser = (user) => {
  const users = getUsers();
  const nextId = localStorage.getItem('nextUserId') || '1';
  
  const newUser = {
    ...user,
    id: `user${nextId}`
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('nextUserId', (parseInt(nextId) + 1).toString());
  
  return newUser;
};

export const updateUser = (updatedUser) => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === updatedUser.id);
  
  if (index !== -1) {
    users[index] = {...users[index], ...updatedUser};
    localStorage.setItem('users', JSON.stringify(users));
    return users[index];
  }
  
  return null;
};

export const updatePassword = (userId, newPassword) => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === userId);
  
  if (index !== -1) {
    users[index].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  
  return false;
};

// Store related functions
export const getStores = () => {
  return JSON.parse(localStorage.getItem('stores') || '[]');
};

export const getStoreById = (id) => {
  const stores = getStores();
  return stores.find(store => store.id === id);
};

export const getStoreByEmail = (email) => {
  const stores = getStores();
  return stores.find(store => store.email === email);
};

export const addStore = (store) => {
  const stores = getStores();
  const nextId = localStorage.getItem('nextStoreId') || '1';
  
  const newStore = {
    ...store,
    id: `store${nextId}`
  };
  
  stores.push(newStore);
  localStorage.setItem('stores', JSON.stringify(stores));
  localStorage.setItem('nextStoreId', (parseInt(nextId) + 1).toString());
  
  return newStore;
};

// Rating related functions
export const getRatings = () => {
  return JSON.parse(localStorage.getItem('ratings') || '[]');
};

export const getRatingsByStoreId = (storeId) => {
  const ratings = getRatings();
  return ratings.filter(rating => rating.storeId === storeId);
};

export const getRatingByUserAndStore = (userId, storeId) => {
  const ratings = getRatings();
  return ratings.find(rating => rating.userId === userId && rating.storeId === storeId);
};

export const addOrUpdateRating = (userId, storeId, ratingValue) => {
  const ratings = getRatings();
  const existingRating = ratings.find(r => r.userId === userId && r.storeId === storeId);
  
  if (existingRating) {
    existingRating.rating = ratingValue;
    existingRating.updatedAt = new Date().toISOString();
  } else {
    const newRating = {
      userId,
      storeId,
      rating: ratingValue,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    ratings.push(newRating);
  }
  
  localStorage.setItem('ratings', JSON.stringify(ratings));
};

// Dashboard statistics
export const getDashboardStats = () => {
  const users = getUsers();
  const stores = getStores();
  const ratings = getRatings();
  
  return {
    totalUsers: users.length,
    totalStores: stores.length,
    totalRatings: ratings.length,
    normalUsers: users.filter(u => u.role === 'user').length,
    storeOwners: users.filter(u => u.role === 'store').length,
    adminUsers: users.filter(u => u.role === 'admin').length
  };
};

// Calculate average rating for a store
export const getStoreAverageRating = (storeId) => {
  const storeRatings = getRatingsByStoreId(storeId);
  
  if (storeRatings.length === 0) return 0;
  
  const sum = storeRatings.reduce((total, rating) => total + rating.rating, 0);
  return (sum / storeRatings.length).toFixed(1);
};

// Get store details with rating
export const getStoreWithRating = (storeId) => {
  const store = getStoreById(storeId);
  if (!store) return null;
  
  const avgRating = getStoreAverageRating(storeId);
  return { ...store, rating: avgRating };
};

// Get all stores with ratings
export const getAllStoresWithRatings = () => {
  const stores = getStores();
  return stores.map(store => ({
    ...store,
    rating: getStoreAverageRating(store.id)
  }));
};

// Get users who rated a store
export const getUsersWhoRatedStore = (storeId) => {
  const storeRatings = getRatingsByStoreId(storeId);
  const users = getUsers();
  
  return storeRatings.map(rating => {
    const user = users.find(u => u.id === rating.userId);
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      rating: rating.rating,
      ratedAt: rating.updatedAt
    };
  });
}; 