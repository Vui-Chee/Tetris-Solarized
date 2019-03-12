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
of the piece periodically, which can happened either by the user event (key presses) or the normal falling action
that is automatically dispatched.

The Game container also handles the user events such as key presses, which can cause the piece to move in a
certain direction or rotate or drop immediately. This events will dispatch a Redux action which fires off
the reducer functions inside `src/reducers`. These reducer functions updates the Redux level state, which
will be sent to the Game container via (React Redux)[https://react-redux.js.org/] as **props**. The Game
container will receive these props through a lifecycle method called componentWillReceiveProps() which will
allow the container to manage the game based on new updates to the Redux level state.

## Challenges

One of the main challenges in this project is to move a piece fluidly when a user presses a key. I initially
started off by passing the key press type into the Redux action which causes movement. However, doing this
will only capture a single key press. I wanted the piece to be able to move diagonally. Furthermore, doing
this also causes the movement of the piece to be rather *rigid*. I wanted a more *smooth* feel when moving
the piece. So I decided the store the key presses in a global variable object. 

You might argue why not store that object inside the container state? The problem is as stated before, it 
will capture more than one key press event. As to my knowledge, storing the key presses in a global 
variable will allow more than one key press to be stored. To the second implication of fluidness of 
the movement, storing the key presses in a global variable has allowed me the use loop() to periodically
dispatch a movement Redux action. This periodicity is controlled by a Redux state called *movementRate* 
which will check the key press object for any events. Because it is iterate more quickly per user 
interaction, it allowed a more smooth feel to the piece movement. 

Another major issue is the animation that occurred when a full row of blocks is cleared. Since I knew very
little about animation, I had decided to use a library called (react-spring)[https://github.com/react-spring/react-spring]
which provides a React component to perform the desired animation. The initial idea was to start the animation
based on certain conditions, and then have each block report to the Game container when it had finished animating.
This was a terrible decision. It caused a tremendous lag to the game and causes over rerendering the BlocksContainer 
component. Despite several attempts to resolving the lag, I decided to abandon react-spring for a more simpler
solution using CSS. Instead of having to report the animation has completed, I decided it was simpler to set a
timeout to allow the animation to complete. So there is full row of blocks to clear, data passed to the 
Block component will informed it when to start the animation. This dramatically improved performance by reducing
the number of updates to Game container state. Simplicity is always the better option.

## How to package?
Run `npm run package-mac`. Then `cd release-builds/tetris-solarized-darwin-x64/` and you will
see a .app file. Click on it to run the app.
