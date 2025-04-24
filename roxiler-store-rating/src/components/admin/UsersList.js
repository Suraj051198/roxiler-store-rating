import React, { useEffect, useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getUsers } from '../../utils/dataUtils';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // Get all users
    const allUsers = getUsers();
    setUsers(allUsers);
    setFilteredUsers(allUsers);
  }, []);

  useEffect(() => {
    // Filter users based on search term and role
    let result = users;
    
    // Filter by role
    if (filterRole !== 'all') {
      result = result.filter(user => user.role === filterRole);
    }
    
    // Filter by search term (name, email, address)
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(lowercasedTerm) ||
        user.email.toLowerCase().includes(lowercasedTerm) ||
        user.address.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    // Sort users
    result = [...result].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredUsers(result);
  }, [users, searchTerm, sortConfig, filterRole]);

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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users Management</h2>
        <Link to="/admin/users/add" className="btn btn-primary">Add New User</Link>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row filter-container">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">Normal User</option>
                <option value="store">Store Owner</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th 
                    className="clickable"
                    onClick={() => handleSort('name')}
                  >
                    Name {getSortIcon('name')}
                  </th>
                  <th 
                    className="clickable"
                    onClick={() => handleSort('email')}
                  >
                    Email {getSortIcon('email')}
                  </th>
                  <th 
                    className="clickable"
                    onClick={() => handleSort('address')}
                  >
                    Address {getSortIcon('address')}
                  </th>
                  <th 
                    className="clickable"
                    onClick={() => handleSort('role')}
                  >
                    Role {getSortIcon('role')}
                  </th>
                  <th className="actions-column">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.address.length > 50 
                          ? `${user.address.substring(0, 50)}...` 
                          : user.address
                        }
                      </td>
                      <td>
                        <span className={`badge bg-${user.role === 'admin' ? 'danger' : user.role === 'store' ? 'warning' : 'success'}`}>
                          {user.role === 'admin' ? 'Admin' : user.role === 'store' ? 'Store Owner' : 'Normal User'}
                        </span>
                      </td>
                      <td>
                        <Link 
                          to={`/admin/users/${user.id}`} 
                          className="btn btn-sm btn-info me-2"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList; 