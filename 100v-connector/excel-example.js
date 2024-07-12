const XLSX = require('xlsx');

// Define your data
const data = [
    ["Name", "Age", "Email"],
    ["Alice", 30, "alice@example.com"],
    ["Bob", 25, "bob@example.com"],
    ["Charlie", 35, "charlie@example.com"]
];

// Create a new workbook and a worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet(data);

// Append the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Write the workbook to a file
XLSX.writeFile(workbook, "output.xlsx");

console.log("Excel file has been created successfully.");
