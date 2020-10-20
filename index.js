const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
var licBadge;

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the title of your project:",
            name: "title"
        },
        {
            type: "input",
            message: "Please enter a description of your project:",
            name: "description"
        },
        {
            type: "input",
            message: "Please enter detailed installation instructions for your project:",
            name: "installation"
        },
        {
            type: "input",
            message: "Please enter details regarding how to use this application:",
            name: "usage"
        },
        {
            type: "list",
            message: "Please choose which license to use for your project:",
            choices: ["Apache License 2.0", "BSD 3-Clause License", "BSD 2-Clause License", "GNU General Public License v3.0)", "GNU Library (LGPL)", "MIT License", "Mozilla Public License 2.0", "Common Development and Distribution License", "Eclipse Public License", "Creative Commons License"],
            name: "license"
        },
        {
            type: "input",
            message: "Please enter contribution guidelines for this project:",
            name: "contributing"
        },
        {
            type: "input",
            message: "Please enter instructions about testing your project:",
            name: "tests"
        },
        {
            type: "input",
            message: "Please enter your Github username:",
            name: "github"
        },
        {
            type: "input",
            message: "Please enter your email address:",
            name: "email"
        },
       
    ]);
};

//Function that inputs the user's responses to the prompts to a README template
function generateFile(answers){
    return `
# ${answers.title}

${answers.description}

${licBadge}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This application has been created under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For question about using this application, please contact me at one of the links below.
<a href='https://www.github.com/${answers.github}'>Github</a>
<a href='mailto:${answers.email}'>${answers.email}</a>
`
};

//Function that adds a .svg image file for the badge of the license that the user selected in prompt
function licenseBadge(answers){
    if(answers.license === 'Apache License 2.0'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-Apache%202.0-brightgreen.svg)'
    } else if(answers.license === 'BSD 3-Clause License'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-BSD%203--Clause-green.svg)'
    } else if (answers.license === 'BSD 2-Clause License'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-BSD%202--Clause-yellowgreen.svg)'
    } else if (answers.license === 'GNU General Public License v3.0'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-GPLv3.0-yellow.svg)'
    } else if (answers.license === 'GNU Library (LGPL)'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-LPGL%20v3.0-orange.svg)'
    } else if (answers.license === 'MIT License'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-MIT-red.svg)'
    } else if (answers.license === 'Mozilla Public License 2.0'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-MPL%202.0-lightgrey.svg)'
    } else if (answers.license === 'Common Development and Distribution License'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-CDDL%201.0-blue.svg)'
    } else if (answers.license === 'Eclipse Public License'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-EPL%201.0-ff69b4.svg)'
    } else if (answers.license === 'Creative Commons License'){
        licBadge = '![License](https://img.shields.io/badge/LICENSE-CCL-black.svg)'
    }
}

//Outputs a README.md file using the answers that were given to the prompts, formatting it using the template laid out in the generateFile function
promptUser()
.then(function(answers){
    
    licenseBadge(answers)
    const readMe = generateFile(answers);
    
    return writeFileAsync("README.md", readMe);
})
.then(function(){
    console.log("Congratulations, you have successfully created a new README file. I sure hope it's awesome looking!");
})
.catch(function(err){
    console.log(err);
})