import React from 'react';
import { DiaryEntry } from '../types';

interface Props {
  diaries: DiaryEntry[];
}

const DiaryList: React.FC<Props> = ({ diaries }) => {
  return (
    <>
      <h2>Diary entries</h2>
      <ul style={{ margin: 0, padding: 0 }}>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>weather: {diary.weather}</div>
            <div>visibility: {diary.visibility}</div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default DiaryList;
