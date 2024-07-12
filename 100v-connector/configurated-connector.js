const readline = require("readline");
const http = require("http");

const postData = JSON.stringify({
  email: "plamen@mail.com",
  password: "12345678",
});
const options = {
  hostname: "localhost",
  port: 8080,
  path: "/api/vi/auth/authenticate",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
};

function sendPostRequest() {
  const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log("Response:", data);
    });
  });
  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function getTodaysDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate);
  return formattedDate;
}

async function main() {
  const arrElMeter = [];
  arrElMeter.push([{ eid: 1 }, { eid: 2 }]);
  console.log("El meter data:", arrElMeter);

  for (let elem of arrElMeter) {
    console.log(elem.eid);
  }
  rl.close();

  const testData = {
    voltagell1: 232.448,
    voltagell2: 233.691,
    voltagell3: 236.301,
    currentl1: 88.498,
    currentl2: 102.555,
    currentl3: 97.336,
    activePowerL1: 236.301,
    activePowerL2: 236.301,
    activePowerL3: 236.301,
  };
  const arrayOfArrays = Object.entries(testData);

  console.log(arrayOfArrays);
  const dataPrep = [["Element", "Value"]];
  const data = dataPrep.concat(arrayOfArrays);
  console.log(data);

  const XLSX = require("xlsx");
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, getTodaysDate());
  XLSX.writeFile(workbook, "output.xlsx");
  console.log("Excel file has been created successfully.");
  sendPostRequest();
}

main();
