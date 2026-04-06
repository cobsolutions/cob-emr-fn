import { AnkleStt } from './AnkleStt';
import { FootStt } from './FootStt';
import { HipStt } from './HipStt';
import { KneeStt } from './KneeStt';

export interface SelectiveTissueTensionLower {
  selectiveTissueTensionLower: boolean;
  hip: boolean;
  hipStt: HipStt;
  knee: boolean;
  kneeStt: KneeStt;
  ankle: boolean;
  ankleStt: AnkleStt;
  foot: boolean;
  footStt: FootStt;
}
