import patientsData from "../../data/patients";
import {   EntryWithoutId, NewPatientEntry, Patient } from "../../types";
import { v4 as uuidv4 } from "uuid";


const getPatientsData = (): Patient[] => {
  return patientsData;
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...entry
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addPatientEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const entryId = uuidv4();
  const newEntry = { ...entry, id: entryId };
  const patient = patientsData.find(p => p.id === id);
  if (patient) {
    patient.entries.push(newEntry);
  }
  return patient;
};


export default { getPatientsData, getPatientById, addPatient ,addPatientEntry};