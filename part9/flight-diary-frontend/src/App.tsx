import { useState, useEffect } from 'react';
import { getAllDiaries } from './diaryService';
import { NewDiaryEntry, DiaryEntry } from './types';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  const addDiary = (newDiary: NewDiaryEntry) => {
    setDiaries(diaries.concat(newDiary as DiaryEntry));
  };

  return (
    <div className="App">
      <h2>Add new entry</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <DiaryForm addDiary={addDiary} setError={setError} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;