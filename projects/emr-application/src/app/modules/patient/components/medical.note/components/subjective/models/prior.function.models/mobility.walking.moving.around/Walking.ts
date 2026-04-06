export interface Walking {
  // "prior-level-function_mobility-walking-moving-around_walking_walking_forward": false,
  //           "prior-level-function_mobility-walking-moving-around_walking_walking_backward": false,
  //           "prior-level-function_mobility-walking-moving-around_walking_walking_sideways": false,
  //           "prior-level-function_mobility-walking-moving-around_walking_walking_strolling": false,
  //           "prior-level-function_mobility-walking-moving-around_walking_walking_surfaces": false,
  //           "prior-level-function_mobility-walking-moving-around_walking_walking_obstacles": false,
  
  //"prior-level-function_mobility-walking-moving-around_walking": false,
  walkingFlag:boolean;
  forward: boolean;
  backward: boolean;
  sideways: boolean;
  strolling: boolean;
  walkingOnDifferentSurfaces: boolean;
  walkingAroundObstacles: boolean;
}
