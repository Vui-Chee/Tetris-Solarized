import React from 'react';
import {Switch, Route} from 'react-router-dom';

import IntroPage from '../components/IntroPage';
import Game from '../components/Game';
import HiScores from '../components/HiScores';
import Instructions from '../components/Instructions';

const routes = (
  <Switch>
    <Route exact path="/" component={IntroPage} />
    <Route path="/game" component={Game} />
    <Route path="/hiscores" component={HiScores} />
    <Route path="/instructions" component={Instructions} />
  </Switch>
);

export default routes;
