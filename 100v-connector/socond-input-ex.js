const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  let input = await getUserInput('Enter number of meters: ');
  
  let number = parseInt(input);

  if (isNaN(number)) {
    console.log("Please enter a valid number.");
    rl.close();
    return;
  }

  const arrElMeter=[];

  for (let i = 0; i < number; i++) {
    let id = await getUserInput(`Enter el meter id: ${i + 1}: `);
    arrElMeter.push({eid:id})
    console.log(arrElMeter)
  }

  console.log("El meter data:", arrElMeter);
    //in for obj // of for array
  for(let elem of arrElMeter){
    console.log(elem.eid)
  }
  rl.close();
}

main();
