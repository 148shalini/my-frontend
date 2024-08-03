import React, { useEffect, useState } from 'react';
import api from '../auth';
import UserItem from './UserItem';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2 className="user-list-heading">Users</h2>
      <ul className="user-list">
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;