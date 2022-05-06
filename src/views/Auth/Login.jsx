import { useState } from 'react';
import { signInUser, signUpUser } from '../../services/user';
// import { useHistory } from 'react-router-dom';
export default function Login() {
  //   const history = useHistory();
  //   const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('sign-in');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'sign-in') {
        const data = await signInUser(email, password);
        setCurrentUser(data);
        // history.push();
      } else {
        const data = await signUpUser(email, password);
        setCurrentUser(data);
        //   history.push();
      }
    } catch (e) {
      setError('Please Sign UP or Sign in');
    }
  };

  return (
    <div className="button">
      <h1>
        <span
          className={type === 'sign-in' ? 'active' : ''}
          onClick={() => setType('sign-in')}
        >
          Sign In
        </span>
        <span
          className={type === 'sign-up' ? 'active' : ''}
          onClick={() => setType('sign-up')}
        >
          Sign Up
        </span>
        {error && <p>{error}</p>}
        <form className="auth" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={() => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>Enter</button>
        </form>
      </h1>
    </div>
  );
}
