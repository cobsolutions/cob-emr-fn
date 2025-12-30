import { SleepingPostures } from "./SleepingPostures";
import { Surface } from "./Surface";

export interface Sleep {
  //prior-level-function_self-care_sleep
  disturbedSleep: boolean;
  //prior-level-function_self-care_sleep_sleeping_postures
  sleepingPosturesFlag:boolean;

  sleepingPostures: SleepingPostures;
  // prior-level-function_self-care_sleep_pillows
  pillows: boolean;
  // prior-level-function_self-care_sleep_surface
  surfaceFlag:boolean;
  
  surface: Surface;
}
