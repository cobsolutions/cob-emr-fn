import { SleepingPostures } from "./SleepingPostures";
import { Surface } from "./Surface";

export interface Sleep {
  //prior-level-function_self-care_sleep
  sleepFlag: boolean;
  //prior-level-function_self-care_sleep
  disturbedSleep: boolean;
  sleepingPostures: SleepingPostures;
  // prior-level-function_self-care_sleep_pillows
  pillows: boolean;
  
  surface: Surface;
}
