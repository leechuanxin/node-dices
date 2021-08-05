import * as jsonFileStorage from './jsonFileStorage.js';

// global constants
const JSON_FILE = 'data.json';

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

const handleReadRollFreq = (err, jsonContentObj) => {
  // Exit if there was an error
  if (err) {
    console.error('Edit error', err);
    return;
  }

  // Exit if key does not exist in DB
  if (!('rolls' in jsonContentObj && 'frequencies' in jsonContentObj)) {
    console.log('Unfortunately, there is no game running now, so you can\'t roll the dice.');
    console.log('Please start a new game by typing in: node index.js init');
    return;
  }

  const tally = jsonContentObj.frequencies;
  const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  console.log(`You rolled a ${randomDiceNumber}.`);
  if (String(randomDiceNumber) in tally) {
    // If we have seen the dice roll before, increment its count
    tally[String(randomDiceNumber)] += 1;
  } else {
    // Else, initialise count of this dice roll to 1
    tally[String(randomDiceNumber)] = 1;
  }
  jsonContentObj.frequencies = tally;

  // log highest frequency
  const frequenciesArr = Object.values(jsonContentObj.frequencies);
  const highestFreq = Math.max(...frequenciesArr);
  // turn tally object into 2d [roll, rollCount] array
  const diceRollsHighestFreq = Object.entries(jsonContentObj.frequencies)
    // retrieve the values that match the highest frequency
    .filter((roll) => roll[1] === highestFreq)
    // and only get the diceroll value
    .map((roll) => roll[0]);
  console.log(`The computer has rolled ${diceRollsHighestFreq.join(', ')} the most times.`);

  // Add input element to target array
  jsonContentObj.rolls.push(randomDiceNumber);
};

const handleWriteRollFreq = (err, jsonContentStr) => {
  if (!err) {
    const obj = JSON.parse(jsonContentStr);
    console.log(`You have rolled the dice ${obj.rolls.length} time(s) so far.`);
  }
};

const handleAverage = (err, obj) => {
  if (!err) {
    const { rolls } = obj;
    const average = rolls.reduce((a, b) => a + b) / rolls.length;
    console.log(`Average is ${average}.`);
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
  jsonFileStorage.edit(JSON_FILE, handleReadRollFreq, handleWriteRollFreq);
};

const average = () => {
  jsonFileStorage.read(JSON_FILE, handleAverage);
};

if (process.argv[2] === 'init') {
  init();
} else if (process.argv[2] === 'clear') {
  clear();
} else if (process.argv[2] === 'roll') {
  roll();
} else if (process.argv[2] === 'average') {
  average();
} else {
  console.log('Please enter a valid input: node index.js [init|clear|roll|average]');
}
