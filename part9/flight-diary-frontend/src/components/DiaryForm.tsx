import React, { useState } from 'react';
import axios from 'axios';
import { createDiary } from '../diaryService';
import { NewDiaryEntry, Weather, Visibility } from '../types';

interface Props {
  addDiary: (diary: NewDiaryEntry) => void;
  setError: (error: string | null) => void;
}

const DiaryForm = ({addDiary, setError}: Props) => {
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = await createDiary(newDiary);
      addDiary(data);
      setNewDiary({} as NewDiaryEntry);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data as string);
      } else {
        setError("An error occurred while creating the diary entry.");
      }
    }
  };

  return (
    <form onSubmit={diaryCreation}>
      <div>
        date
        <input
          type="date"
          min="2009-01-01"
          max="2022-12-31"
          value={newDiary.date}
          onChange={(event) =>
            setNewDiary({
              ...newDiary,
              date: event.target.value,
            } as NewDiaryEntry)
          }
        />
      </div>
      <div>
        weather
        {Object.values(Weather).map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="weather"
              value={value}
              checked={newDiary.weather === value}
              onChange={(event) =>
                setNewDiary({
                  ...newDiary,
                  weather: event.target.value as Weather,
                })
              }
            />
            {value}
          </label>
        ))}
      </div>
      <div>
        visibility
        {Object.values(Visibility).map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="visibility"
              value={value}
              checked={newDiary.visibility === value}
              onChange={(event) =>
                setNewDiary({
                  ...newDiary,
                  visibility: event.target.value as Visibility,
                })
              }
            />
            {value}
          </label>
        ))}
      </div>
      <div>
        comment
        <input
          value={newDiary.comment}
          onChange={(event) =>
            setNewDiary({
              ...newDiary,
              comment: event.target.value,
            } as NewDiaryEntry)
          }
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
