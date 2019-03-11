import {combineReducers} from 'redux';
import gameReducer from './gameReducer';
import blocksReducer from './blocksReducer';

export default combineReducers({
  gameState: gameReducer,
  blocksState: blocksReducer,
});
