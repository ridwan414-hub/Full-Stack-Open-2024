import { Router } from "express";
import patientsService from "../services/patientsService";
import { errorMiddleware } from "../middlewares/errorHandler";
import { toNewPatientEntry } from "../utils/toNewPatient";
import { toNewEntry } from "../utils/toNewEntry";
const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getPatientsData());
});

patientsRouter.post("/", (req, res) => {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  res.json(patient);
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const patient = patientsService.getPatientById(req.params.id);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addPatientEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error occurred" });
    }
  }
});

patientsRouter.use(errorMiddleware);

export default patientsRouter;