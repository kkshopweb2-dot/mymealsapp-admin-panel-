import styles from './Dashboard.module.css';

const Dashboard = () => {

  return (
    <div className={styles['dashboard-container']}>
      <h1 className={styles['dashboard-title']}>Welcome </h1>
      {/* Dashboard content */}
      <div className="empty-dashboard">
      </div>
    </div>
  );
};

export default Dashboard;