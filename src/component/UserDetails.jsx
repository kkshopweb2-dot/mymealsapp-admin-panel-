import styles from '../css/UserDetails.module.css';
import { useState } from 'react';

const USERS_PER_PAGE = 5;

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
  {
    id: 'U003',
    name: 'Vikram Singh',
    email: 'vikram@gmail.com',
    phone: '9988776655',
    plan: 'Monthly',
    status: 'Active',
    joined: '2024-06-15',
  },
  {
    id: 'U004',
    name: 'Priya Kapoor',
    email: 'priya@gmail.com',
    phone: '8877665544',
    plan: 'Yearly',
    status: 'Active',
    joined: '2024-05-20',
  },
  {
    id: 'U005',
    name: 'Amit Patel',
    email: 'amit@gmail.com',
    phone: '7766554433',
    plan: 'Weekly',
    status: 'Cancelled',
    joined: '2024-04-10',
  },
  {
    id: 'U006',
    name: 'Sneha Reddy',
    email: 'sneha@gmail.com',
    phone: '6655443322',
    plan: 'Monthly',
    status: 'Active',
    joined: '2024-07-05',
  },
  {
    id: 'U007',
    name: 'Rohan Gupta',
    email: 'rohan@gmail.com',
    phone: '5544332211',
    plan: 'Yearly',
    status: 'Paused',
    joined: '2024-03-12',
  },
  {
    id: 'U008',
    name: 'Meera Joshi',
    email: 'meera@gmail.com',
    phone: '4433221100',
    plan: 'Monthly',
    status: 'Active',
    joined: '2024-06-25',
  },
  {
    id: 'U009',
    name: 'Arjun Malhotra',
    email: 'arjun@gmail.com',
    phone: '3322110099',
    plan: 'Weekly',
    status: 'Active',
    joined: '2024-07-08',
  },
  {
    id: 'U010',
    name: 'Kavita Das',
    email: 'kavita@gmail.com',
    phone: '2211009988',
    plan: 'Monthly',
    status: 'Cancelled',
    joined: '2024-02-14',
  },
  {
    id: 'U011',
    name: 'Sanjay Nair',
    email: 'sanjay@gmail.com',
    phone: '1100998877',
    plan: 'Yearly',
    status: 'Active',
    joined: '2024-01-30',
  },
  {
    id: 'U12',
    name: 'Pooja Desai',
    email: 'pooja@gmail.com',
    phone: '9900887766',
    plan: 'Monthly',
    status: 'Paused',
    joined: '2024-05-05',
  },
];

const Users = () => {
  const [tab, setTab] = useState('details');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [viewUser, setViewUser] = useState(null);

  // 🔍 Filter users
  const filteredUsers = dummyUsers.filter(user => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status === 'All' || user.status === status;

    return matchSearch && matchStatus;
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const users = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      {/* ================= HEADER ================= */}
      <div className={styles.pageHeader}>
        <h1>Users</h1>
        <p>Manage all registered users</p>
      </div>

      {/* ================= TABS ================= */}
      <div className={styles.tabs}>
        <button
          className={tab === 'details' ? styles.activeTab : ''}
          onClick={() => setTab('details')}
        >
          User Details
        </button>
        <button
          className={tab === 'lifecycle' ? styles.activeTab : ''}
          onClick={() => setTab('lifecycle')}
        >
          User Lifecycle
        </button>
      </div>

      {/* ================= TOOLBAR ================= */}
      {tab === 'details' && (
        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {tab === 'details' && <th>Email</th>}
              {tab === 'details' && <th>Phone</th>}
              <th>Plan</th>
              <th>Status</th>
              <th>{tab === 'details' ? 'Joined' : 'Start Date'}</th>
              {tab === 'lifecycle' && <th>End Date</th>}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className={styles.noData}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>

                  {tab === 'details' && <td>{user.email}</td>}
                  {tab === 'details' && <td>{user.phone}</td>}

                  <td>{user.plan}</td>

                  <td>
                    <span
                      className={`${styles.status} ${styles[user.status.toLowerCase()]}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>{user.joined}</td>
                  {tab === 'lifecycle' && <td>-</td>}

                  <td className={styles.actions}>
                    <button onClick={() => setViewUser(user)}>View</button>
                    <button className={styles.edit}>Edit</button>
                    {tab === 'details' && (
                      <button className={styles.block}>Block</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={page === p ? styles.activePage : ''}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>User Information</h2>

            <div className={styles.modalGrid}>
              <p><strong>ID:</strong> {viewUser.id}</p>
              <p><strong>Name:</strong> {viewUser.name}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Phone:</strong> {viewUser.phone}</p>
              <p><strong>Plan:</strong> {viewUser.plan}</p>
              <p><strong>Status:</strong> {viewUser.status}</p>
              <p><strong>Joined:</strong> {viewUser.joined}</p>
            </div>

            <div className={styles.modalActions}>
              <button onClick={() => setViewUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
