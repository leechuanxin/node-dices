import { write } from './jsonFileStorage.js';

// eslint-disable-next-line no-unused-vars
const handleInit = (writeErr, jsonContentStr) => {
  if (!writeErr) {
    console.log('You have started a new game!');
  }
};

const init = () => {
  const obj = {
    rolls: [],
    frequencies: {},
  };
  write('data.json', obj, handleInit);
};

if (process.argv[2] === 'init') {
  init();
}
