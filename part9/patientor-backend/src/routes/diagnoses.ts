import { Router } from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnosesData());
});

export default diagnosesRouter;
