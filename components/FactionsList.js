import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function FactionsList() {
  const [factions, setFactions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'factions'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFactions(data); // Updates in REAL-TIME
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {factions.map(faction => (
        <div key={faction.id}>
          <h3>{faction.name}</h3>
          <p>{faction.desc}</p>
        </div>
      ))}
    </div>
  );
}
