<img src="https://github.com/Vui-Chee/Tetris-Solarized/blob/master/tetris-header.png" height="250" width="100%" alt="tetris"/>

A desktop standalone game of Tetris. 

## Overview of features
1. User have to complete full rows of blocks to clear them.
2. Clearing a full row yields 100 points.
3. Each level as of now requires 1000 points to level up.
4. The drop rate of the piece will increase per level.
5. Game ends when a block passes over the top of the container.
6. If the score is within the top 10, it will be recorded.

## Design of Game
The app was designed using React as means to render the views of the game. The frontend code is then
built and run in a desktop wrapper known as  [Electron](https://electronjs.org/). The state of the game
is handled mostly by a library called [Redux](https://redux.js.org/introduction/getting-started). Most
of the events emitted will be handled as Redux actions. The rest of the code consists mostly of
presentational code and additional utilities.

The main container is Game and is location in `src/components/Game/index.js` and controls the state of the game.
There are 2 main states of the game, the Redux level state and the Game component level state. I have
decided to keep the states in the container simple as the Redux level state already contains most
of the data the game will need. When the Game component is mounted, it will start off a countdown sequence
before the actual game starts. The game starts off with a new piece (the shape which falls down periodically)
being created and inside the componentDidMount() is a method called loop(). loop() will run the movement
of the piece periodically, which can happened either by the user event (key presses) **or** the normal falling action
that is automatically dispatched.

## How to package?
Run `npm run package-mac`. Then `cd release-builds/tetris-solarized-darwin-x64/` and you will
see a .app file. Click on it to run the app.
