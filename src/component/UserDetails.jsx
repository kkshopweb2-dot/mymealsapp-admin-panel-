import styles from '../css/UserDetails.module.css';
import { useState } from 'react';

const dummyUsers = [
  {
    id: 'U001',
    name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '9876543210',
    plan: 'Monthly',
    status: 'Active',
    joined: '2024-06-10',
  },
  {
    id: 'U002',
    name: 'Anita Verma',
    email: 'anita@gmail.com',
    phone: '9123456780',
    plan: 'Weekly',
    status: 'Paused',
    joined: '2024-07-01',
  },
];

const UserDetails = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Details</h1>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className={styles.noData}>
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.plan}</td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[user.status.toLowerCase()]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joined}</td>
                  <td className={styles.actions}>
                    <button className={styles.view}>View</button>
                    <button className={styles.edit}>Edit</button>
                    <button className={styles.block}>Block</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
