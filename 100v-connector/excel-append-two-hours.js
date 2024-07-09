const fs = require('fs');
const readline = require('readline');
const XLSX = require('xlsx');

// Create an interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt the user and get input
function getUserInput(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// Function to append user names to an Excel file
async function appendUserNamesToExcel() {
  try {
    // Prompt the user to enter a name
    let userName = await getUserInput('Enter a user name: ');

    // Load existing workbook or create a new one
    let workbook;
    if (fs.existsSync('userNames.xlsx')) {
      const fileContent = fs.readFileSync('userNames.xlsx');
      workbook = XLSX.read(fileContent, { type: 'buffer' });
    } else {
      workbook = XLSX.utils.book_new();
    }

    // Get the first worksheet
    const sheetName = workbook.SheetNames[0] || 'Sheet1';
    const worksheet = workbook.Sheets[sheetName] || XLSX.utils.aoa_to_sheet([]);

    // Append user name to the worksheet with current timestamp
    const timestamp = new Date().toISOString();
    const newRow = [timestamp, userName];
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const newRange = { ...range };
    newRange.s.r = range.e.r + 1;
    newRange.e.r = range.e.r + 1;
    worksheet[XLSX.utils.encode_cell({ r: newRange.s.r, c: 0 })] = { v: timestamp };
    worksheet[XLSX.utils.encode_cell({ r: newRange.s.r, c: 1 })] = { v: userName };

    // Update the range of the worksheet
    worksheet['!ref'] = XLSX.utils.encode_range(newRange);

    // Update or add the worksheet to the workbook
    if (!workbook.Sheets[sheetName]) {
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // Write the workbook back to the file
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    fs.writeFileSync('userNames.xlsx', excelBuffer);

    console.log(`User name '${userName}' appended to Excel file.`);
  } catch (error) {
    console.error('Error appending user name:', error);
  }
}

// Schedule appending user names every 2 hours
setInterval(appendUserNamesToExcel, 10*1000); // 2 hours in milliseconds

// Initial prompt to start the process
console.log('Script running. Enter a user name to append to Excel:');
