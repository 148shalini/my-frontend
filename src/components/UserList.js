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
      <h2>Users</h2>
      <ul className="user-list">
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;


// import React, { useEffect, useState } from 'react';
// import API from '../Api';
// import UserItem from './UserItem';
// import './UserList.css';
// // import {jwtDecode} from 'jwt-decode';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem('accessToken');
//   // const loggedInUserId = jwtDecode(token).user_id;

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await API.get('/users/');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="user-list-container">
//       <h2>Users</h2>
//       <ul className="user-list">
//         {users.map(user => (
//           <UserItem key={user.id} user={user} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;
