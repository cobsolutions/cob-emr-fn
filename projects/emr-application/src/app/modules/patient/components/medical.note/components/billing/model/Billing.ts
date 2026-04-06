import { braces } from "./braces";
import { calendarMonth } from "./calendarMonth";
import { casts } from "./casts";
import { directTimedCodes } from "./directTimedCodes";
import { nerveConductionStudies } from "./nerveConductionStudies";
import { otherTreatmentProcedures } from "./otherTreatmentProcedures";
import { respiratory } from "./respiratory";
import { splintsorthotics } from "./splintsorthotics";
import { strapping } from "./strapping";
import { supplies } from "./supplies";
import { untimedCodes } from "./untimedCodes";

export interface Billing {
  dailyNoteIncluded: boolean;
  precautions: string;
  objectiveFindings: string;
  preTreatment: string;
  postTreatment: string;
  untimedCodes: untimedCodes;
  strapping: strapping;
  calendarMonth: calendarMonth;
  nerveConductionStudies: nerveConductionStudies;
  respiratory: respiratory;
  directTimedCodes: directTimedCodes;
  otherTreatmentProcedures: otherTreatmentProcedures;
  supplies: supplies;
  splintsorthotics: splintsorthotics;
  casts: casts;
  braces: braces;
}
