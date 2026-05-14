import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roll: '',
    department: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, roll, department, password } = formData;
    if (!name || !email || !roll || !department || !password) {
      setError('Please fill in all fields before registering.');
      return;
    }

    const userData = { name, email, roll, department, password };
    localStorage.setItem('registeredUser', JSON.stringify(userData));
    navigate('/login');
  };

  return (
    <section className="card">
      <h2>Student Registration</h2>
      <p>Fill in your details to create a student account.</p>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="roll">Roll Number</label>
          <input
            id="roll"
            type="text"
            placeholder="Enter roll number"
            value={formData.roll}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <input
            id="department"
            type="text"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div className="full">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="full">
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default Registration;
