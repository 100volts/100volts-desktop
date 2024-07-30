#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


//global variable for key & port
let key;
let port;

//helper function
const sleep=(ms=2000)=> new Promise((r)=> setTimeout(r,ms));
const sleepALot=(ms=2000000000)=> new Promise((r)=> setTimeout(r,ms));


async function welcome(){
    const title=chalkAnimation.neon('Volts-Connector \n')
    await sleep();
    title.stop();
    console.log(`
    ${chalk.bgBlue('Welcome to the controller')}
    The application need to run indefinatly for all meters to be read
        `);

}

async function askForKey(){
    const keyInput=await inquirer.prompt(
        {
            name:'company_key',
            type: 'input',
            message: 'What is the company key?',
            default(){
                return 'key0';
            },
        }
    );
    key = keyInput.company_key;
    console.log(key)
}

async function askForPort(){
    const portInput=await inquirer.prompt(
        {
            name:'connector_port',
            type: 'input',
            message: 'What is the connector port?',
            default(){
                return 'TtyS0';
            },
        }
    );
    port = portInput.connector_port;
    console.log(port)
}

async function mainScreen(){
    console.clear();
    const msg='Working';

    figlet(msg,(err,data)=>{
        console.log(gradient.pastel.multiline(data))
    });
    await sleepALot();
    await mainScreen();
} 

await welcome();
await askForKey();
await askForPort();
await mainScreen();