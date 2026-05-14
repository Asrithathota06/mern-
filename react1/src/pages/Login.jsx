import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const storedUser = localStorage.getItem('registeredUser');
    if (!storedUser) {
      setError('No registered user found. Please register first.');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.email === email && userData.password === password) {
      navigate('/dashboard');
      return;
    }

    setError('Invalid email or password. Please try again.');
  };

  return (
    <section className="card">
      <h2>Student Login</h2>
      <p>Login to access your student dashboard.</p>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="full">
          <label htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError('');
            }}
          />
        </div>

        <div className="full">
          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError('');
            }}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="full">
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
}

export default Login;
