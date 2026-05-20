import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Updates our state whenever a user types into an input field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // THE MISSING ENGINE: Fires when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      console.log("Sending registration data to backend...", formData);
      
      // Send data to your Express backend registration endpoint
      const response = await API.post('/api/auth/register', formData);
      
      console.log("Backend response:", response.data);
      setMessage('🎉 Registration successful! Redirecting to login...');
      
      // Wait 2 seconds so they read the success message, then send them to login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Registration error encountered:", err);
      const backendError = err.response?.data?.message || err.response?.data || err.message;
      
      // Pop up a clear browser alert if the backend rejects it
      alert(`Backend rejected registration!\nReason: ${backendError}`);
      setMessage(`❌ Registration failed: ${backendError}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>📝 Create an Account</h2>
      {message && <p style={{ fontWeight: 'bold', color: message.startsWith('🎉') ? 'green' : 'red' }}>{message}</p>}
      
      {/* 1. CRUCIAL: The onSubmit hook attaches our missing function to the form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input 
            type="text" 
            name="username" // Must match the state key exactly
            value={formData.username} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* 2. CRUCIAL: Must be type="submit" so it triggers the form onSubmit */}
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}