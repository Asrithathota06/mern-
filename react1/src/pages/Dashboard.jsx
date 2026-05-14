import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <section className="card">
      <h2>Student Dashboard</h2>
      <p>Welcome to your dashboard. This is the home page after a successful login.</p>
      <div className="full">
        <button type="button" onClick={() => navigate('/login')}>
          Return to Login
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
