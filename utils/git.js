'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const ini = require('ini');
module.exports = function (type = 'global') {
    let configPath = '';
    const workDir = process.cwd();

    if (type === 'global') {
        configPath = path.join(os.homedir(), '.gitconfig');
    } else {
        configPath = path.resolve(workDir, '.git/config');
    }

    if (!fs.existsSync(configPath)) {
        configPath = path.join(os.homedir(), '.config/git/config');
    }

    const filePath = fs.existsSync(configPath) ? configPath : null;
    const file = fs.readFileSync(filePath, 'utf8');
    return ini.parse(file);
}