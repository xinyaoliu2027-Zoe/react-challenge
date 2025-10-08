import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';

type FirebaseQueryResult = [unknown, boolean, Error | null];

export function useFirebaseData(path: string): FirebaseQueryResult {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      },
      (err: Error) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return [data, loading, error];
}