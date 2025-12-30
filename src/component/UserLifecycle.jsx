import styles from '../css/UserDetails.module.css';

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

const UserLifecycle = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Lifecycle</h1>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.noData}>
                  No users found
                </td>
              </tr>
            ) : (
              dummyUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.plan}</td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[user.status.toLowerCase()]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joined}</td>
                  <td>-</td>
                  <td className={styles.actions}>
                    <button className={styles.view}>View</button>
                    <button className={styles.edit}>Edit</button>
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

export default UserLifecycle;
