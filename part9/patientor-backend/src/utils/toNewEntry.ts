import { z } from "zod";
import { EntryWithoutId, HealthCheckRating } from "../../types";

const baseEntrySchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional().default([]),
  });
// Zod schema for SickLeave validation
const sickLeaveSchema = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
  })
  .optional();
// Zod schema for different entry types
const healthCheckEntrySchema = baseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
  });
  
const hospitalEntrySchema = baseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
      date: z.string(),
      criteria: z.string(),
    }),
  });
  
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: sickLeaveSchema,
  });  
  
const entrySchema = z.union([
    healthCheckEntrySchema,
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema,
    ]);

export const toNewEntry = (object: unknown): EntryWithoutId => {
  const result = entrySchema.safeParse(object);

  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => {
      if (issue.code === "invalid_union") {
        // Find the error for the matching entry type
        const matchingError = issue.unionErrors.find(error => 
          error.issues.every(i => i.path[0] !== "type" || ("received" in i && i.received === (object as { type: string }).type))
        );
        
        if (matchingError) {
          return matchingError.issues.map(i => {
            if (i.code === "invalid_enum_value" && i.path[0] === "healthCheckRating") {
              return `Invalid Health Check Rating: ${i.received}. Must be one of: ${Object.values(HealthCheckRating)
                .filter((v) => typeof v === "number")
                .join(", ")}`;
            }
            return `${i.path.join(".")}: ${i.message}`;
          }).join(", ");
        }
      }
      return `${issue.path.join(".")}: ${issue.message}`;
    });

    throw new Error(errorMessages.join(", "));
  }

  return result.data;
};
