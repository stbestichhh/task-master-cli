const yargs = require('yargs');
const inquirer = require('inquirer');

yargs
  .command({
    command: 'add',
    describe: 'Add new task',
    handler: (argv) => {
      inquirer.promt([
        {
          type: 'input',
          name: 'Title',
          message: 'Enter task name:',
        },
        {
          type: 'input',
          name: 'Description',
          message: 'Write more about task:',
        },
        {
          type: 'input',
          name: 'Deadline',
          message: 'Enter task deadline (DD-MM-YYYY)',
        },
      ]).then((answers) => {
        //addTask 
      });
    },
  })
  .command({
    command: ['list', 'ls'],
    describe: 'Show list of all the tasks',
    handler: () => {
      //listTasks
    },
  });
