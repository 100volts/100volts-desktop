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

    const testData= {
        voltagell1: 232.448,
        voltagell2: 233.691,
        voltagell3: 236.301,
        currentl1: 88.498,
        currentl2: 102.555,
        currentl3: 97.336,
        activePowerL1: 236.301,
        activePowerL2: 236.301,
        activePowerL3: 236.301
    };
    const arrayOfArrays = Object.entries(testData);

    console.log(arrayOfArrays);
    const dataPrep = [
        ["Element", "Value"],
    ];
    const data = dataPrep.concat(arrayOfArrays);
    console.log(data);

    const XLSX = require('xlsx');
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "output.xlsx");
    console.log("Excel file has been created successfully.");
}

main();


