
import { signInUser, signUpUser } from '../../services/user';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useStat('');
  const [type, setType] = useState('sign-in');

  const handleSubmit = async () => {
    email.preventDefault();
    try {
      if (type === 'sing-in') {
        const data = await signInUser(email, password);
        setCurrentUser(data);
        history.push();
      } else {
          const data = await signUpUser(email, password);
          setCurrentUser(data);
          history.push();
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
              type="auth"
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
