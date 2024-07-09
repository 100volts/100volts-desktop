const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var meters=new Object();

rl.question('Enter number of meters: ', (input) => {
  let number = parseInt(input);

  if (isNaN(number)) {
    console.log("Please enter a valid number.");
  } else {
    for (let i = 0; i < number; i++) {
      console.log("Iteration number: " + (i + 1));
        
    }
  }
  rl.close();
});
