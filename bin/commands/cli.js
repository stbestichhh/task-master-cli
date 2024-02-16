const yargs = require('yargs');
const inquirer = require('inquirer');
const { addTask, listTask, updateTask, deleteTask } = require('../services/task.service');

yargs
  .command({
    command: 'add',
    describe: 'Add new task',
    handler: () => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter task name:',
          },
          {
            type: 'input',
            name: 'description',
            message: 'Write more about task:',
          },
          {
            type: 'input',
            name: 'deadline',
            message: 'Enter task deadline (DD-MM-YYYY):',
          },
        ])
        .then((answers) => {
          const { title, description, deadline } = answers;
          addTask(title, description, deadline);
        });
    },
  })
  .command({
    command: ['list', 'ls'],
    describe: 'Show list of all the tasks',
    handler: () => {
      listTask();
    },
  })
  .command({
    command: 'update <name>',
    describe: 'Update task properties',
    handler: (argv) => {
      const taskName = argv.name;
      inquirer
        .prompt([
          {
            type: 'checkbox',
            name: 'properties',
            message: 'Select properties to update:',
            choices: [
              { name: 'title' },
              { name: 'description' },
              { name: 'deadline' },
              { name: 'status' },
            ],
          },
          {
            type: 'input',
            name: 'newTitle',
            message: 'Enter new title:',
            when: (answers) => answers.properties.includes('title'),
          },
          {
            type: 'input',
            name: 'newDescription',
            message: 'Enter new description:',
            when: (answers) => answers.properties.includes('description'),
          },
          {
            type: 'input',
            name: 'newDeadline',
            message: 'Enter new deadline (YYYY-MM-DD):',
            when: (answers) => answers.properties.includes('deadline'),
          },
          {
            type: 'list',
            name: 'newStatus',
            message: 'Select new status:',
            choices: ['done', 'pending'],
            when: (answers) => answers.properties.includes('status'),
          },
        ])
        .then((answers) => {
          updateTask(taskName, answers);
        });
    },
  })
  .command({
    command: 'u <name> [flags...]',
    describe: 'Update a task property using flags',
    builder: (yargs) => {
      return yargs.options({
        s: {
          alias: 'status',
          describe: 'Update task status',
        },
        t: {
          alias: 'title',
          describe: 'Change task name',
        },
        d: {
          alias: 'description',
          describe: 'Update task description',
        },
        D: {
          alias: 'deadline',
          describe: 'Change task deadline (DD-MM-YYYY)',
        },
      });
    },
    handler: (argv) => {
      const { name, status, title, description, deadline } = argv;
      const flags = { status, title, description, deadline };      
      updateTask(name, flags);
    },
  })
  .command({
    command: ['delete <name>', 'd <name>'],
    describe: 'Delete task',
    handler: (argv) => {
      const taskName = argv.name;
      deleteTask(taskName);
    },
  })
  .demandCommand()
  .help().argv;
