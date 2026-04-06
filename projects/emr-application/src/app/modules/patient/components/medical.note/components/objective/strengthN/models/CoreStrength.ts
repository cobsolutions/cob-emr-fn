import { ProneExtensionCoreStrength } from './ProneExtensionCoreStrength';
import { PushupCoreStrength } from './PushupCoreStrength';
import { SitupsCoreStrength } from './SitupsCoreStrength';
import { SupineFlexionCoreStrength } from './SupineFlexionCoreStrength';

export interface CoreStrength {
  coreStrength: boolean;
  proneExtensioncoreStrength: boolean;
  proneExtensionCs: ProneExtensionCoreStrength;
  supineFlexionCoreStrength: boolean;
  supineFlexionCs: SupineFlexionCoreStrength;
  situpsCoreStrength: boolean;
  situpsCs: SitupsCoreStrength;
  pushupCoreStrength: boolean;
  pushupCs: PushupCoreStrength;
}
