"use strict";

import GameBuilder from "./game.js";

const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(10)
  .withBugCount(7)
  .build();
