import * as jsonFileStorage from './jsonFileStorage.js';

// global constants
const JSON_FILE = 'data.json';
const ROLLS_KEY = 'rolls';

// eslint-disable-next-line no-unused-vars
const handleInit = (writeErr, jsonContentStr) => {
  if (!writeErr) {
    console.log('You have started a new game!');
  }
};

// eslint-disable-next-line no-unused-vars
const handleClear = (writeErr, jsonContentStr) => {
  if (!writeErr) {
    console.log('The existing scores have been cleared. You can start a new game by typing in: node index.js init');
  }
};

const handleRoll = (consoleStr) => {
  if (consoleStr === 'Key does not exist') {
    console.log('Unfortunately, there is no game running now, so your latest roll is not saved.');
    console.log('Please start a new game by typing in: node index.js init');
  }
};

const init = () => {
  const obj = {
    rolls: [],
    frequencies: {},
  };
  jsonFileStorage.write(JSON_FILE, obj, handleInit);
};

const clear = () => {
  const obj = {};
  jsonFileStorage.write(JSON_FILE, obj, handleClear);
};

const roll = () => {
  const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  console.log(`You rolled a ${randomDiceNumber}.`);
  jsonFileStorage.add(JSON_FILE, ROLLS_KEY, randomDiceNumber, handleRoll);
};

if (process.argv[2] === 'init') {
  init();
} else if (process.argv[2] === 'clear') {
  clear();
} else if (process.argv[2] === 'roll') {
  roll();
}
