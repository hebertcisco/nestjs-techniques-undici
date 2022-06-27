const fs = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

dotenv.config();

const directoryToWork = `${join(__dirname, '..')}`;

execSync(`cp ${directoryToWork}/.env.example ${directoryToWork}/.env`);