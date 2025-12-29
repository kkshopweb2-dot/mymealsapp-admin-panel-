import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles['dashboard-container']}>
      <h1 className={styles['dashboard-title']}>Welcome</h1>

      {/* Dashboard content with background */}
      <div className={styles['dashboard-content']}>
        {/* Your dashboard widgets / cards will go here */}
      </div>
    </div>
  );
};

export default Dashboard;
