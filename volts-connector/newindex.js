#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import http from "http";
import https from "https";
import readline from "readline";
import ModbusRTU from "modbus-serial";
import XLSX from "xlsx";
import ElectricMater from "./ElectricMater.js";

//0 -Set company gy name
let port;
let companyName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
//const sleepALot = (ms = 120000) => new Promise((r) => setTimeout(r, ms));//this is 2 mins
const sleepALot = (ms = 60000) => new Promise((r) => setTimeout(r, ms));

async function welcome() 
{
    const title = chalkAnimation.neon("Volts-Connector \n");
    await sleep();
    title.stop();
    console.log(`
      ${chalk.bgBlue("Welcome to the controller")}
      The application need to run indefinatly for all meters to be read
          `);
}

async function askForCompanyName() {
    const companyNameInput = await inquirer.prompt({
      name: "company_name",
      type: "input",
      message: "What is the company name?",
      default() {
        return "Markeli";
      },
    });
    companyName = companyNameInput.company_name;
    console.log(companyName);
}
  
async function askForPort() {
    const portInput = await inquirer.prompt({
      name: "connector_port",
      type: "input",
      message: "What is the connector port?",
      default() {
        return "TtyS0";
      },
    });
    port = portInput.connector_port;
    console.log(port);
}




  
//1- read meter address list
//2- Create classes for ech of the list
//3- read from meter
//4- write to db
//4.5- Eport excel
//5- Reepeat
await welcome()
await askForCompanyName()
await askForPort()
