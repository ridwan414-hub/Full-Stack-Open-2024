import diagnosesData from "../../data/diagnoses";
import { DiagnosisEntry } from "../../types";

const getDiagnosesData = (): DiagnosisEntry[] => {
  return diagnosesData;
};

export default { getDiagnosesData };
