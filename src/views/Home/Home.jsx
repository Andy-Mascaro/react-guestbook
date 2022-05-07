import { useState, useEffect }  from 'react';
import { useUserContext } from '../../context/UserContext';
import { getEntries, createEntry } from '../../services/entries';

export default function Home() {
  const { currentUser } = useUserContext();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [newEntry, setNewEntry] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEntries();
        setEntries(data);
      } catch (error) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEntries();
        setEntries(data);
      } catch (error) {
        setError(e.message);
      }
    };
    fetchData();
  }, [newEntry]);
  

  const handleSubmit = async () => {
    try {
      const data = await createEntry({ content: newEntry });
      setEntries((prevState) => [...prevState, data]);
      setNewEntry('');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="entries">
      <div>
        <label>
          <input
          placeholder='Type here'
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Add New Entry</button>
      </div>
      {error && (
        <p>
          {error} <span onClick={() => setError('')}></span>
        </p>
      )}
      <h1>Your Personal Entries</h1>
      <>
      {entries.map((data) => (
          <div key={data.id}>
          <p>{data.content}</p>
          <p>{data.created_at}</p>
          <p>Made By: {currentUser.email}</p>
        </div>
        ))}
        </>
    </div>
  );
}
