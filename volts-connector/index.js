#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import http from  'http';


//global variable for key & port
let key;
let port;

//helper function
const sleep=(ms=2000)=> new Promise((r)=> setTimeout(r,ms));
const sleepALot=(ms=120000)=> new Promise((r)=> setTimeout(r,ms));


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



const postData = JSON.stringify({
    email: "plamen@mail.com",
    password: "12345678",
});
const options = {
    hostname: "localhost",
    port: 8081,
    path: "/api/vi/auth/authenticate",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
    },
};
let reqdata
async function sendPostRequest() {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            });
        });

        req.on('error', (e) => {
            reject(`Problem with request: ${e.message}`);
        });

        req.write(postData);
        req.end();
    });
}

async function postElMeterData(){
    await sendPostRequest().then(data=>reqdata=data);
}

async function mainScreen(){
    console.clear();
    const msg='Working';

    figlet(msg,(err,data)=>{
        console.log(gradient.pastel.multiline(data))
    });
    await postElMeterData();
    const jsonObject = JSON.parse(reqdata);
    console.log("Tokken: ", jsonObject['access_token'])
    await sleepALot();
    await mainScreen();
} 

await welcome();
await askForKey();
await askForPort();
await mainScreen();