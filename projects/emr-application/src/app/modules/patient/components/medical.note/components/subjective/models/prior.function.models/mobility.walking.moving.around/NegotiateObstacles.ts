export interface NegotiateObstacles {
  // "prior-level-function_mobility-walking-moving-around_negotiate_obstacles_crowded_streets": false,
  //           "prior-level-function_mobility-walking-moving-around_negotiate_obstacles_terrain": false,
  // "prior-level-function_mobility-walking-moving-around_negotiate_obstacles": false,
  negotiateObstaclesFlag:boolean;
  bumpedInCrowdedStreets: boolean;
  terrain: boolean;
}
