export interface Walking {
  // current_functional_limitations_mobility-walking-moving-around_walking_walking_forward
  forward: boolean;
  // current_functional_limitations_mobility-walking-moving-around_walking_walking_backward
  backward: boolean;
  // current_functional_limitations_mobility-walking-moving-around_walking_walking_sideways
  sideways: boolean;
  // current_functional_limitations_mobility-walking-moving-around_walking_walking_strolling
  strolling: boolean;
  // current_functional_limitations_mobility-walking-moving-around_walking_walking_surfaces
  walkingOnDifferentSurfaces: boolean;
  // current_functional_limitations_mobility-walking-moving-around_walking_walking_obstacles
  walkingAroundObstacles: boolean;
}
