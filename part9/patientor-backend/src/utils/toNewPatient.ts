import {  Gender, NewPatientEntry } from "../../types";
import { z } from "zod";

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.any()).default([]),
});

export const NonSensitivePatientEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});



export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

