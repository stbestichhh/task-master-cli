const yargs = require('yargs');
const inquirer = require('inquirer');
const { addTask, listTask, updateTask, deleteTask } = require('../services/task.service');

yargs
  .command({
    command: 'add',
    describe: 'Add new task',
    handler: () => {
      inquirer
        .promt([
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
    command: ['update <name>', 'u <name>'],
    describe: 'Update task properties',
    handler: (argv) => {
      inquirer
        .promt([
          {
            type: 'checkbox',
            name: 'properties',
            message: 'Select properties to update:',
            choices: [
              { name: 'Task name' },
              { name: 'Description' },
              { name: 'Deadline' },
              { name: 'Status' },
            ],
          },
          {
            type: 'input',
            name: 'newTitle',
            message: 'Enter new title:',
            when: (answers) => answers.properties.includes('Title'),
          },
          {
            type: 'input',
            name: 'newDescription',
            message: 'Enter new description:',
            when: (answers) => answers.properties.includes('Description'),
          },
          {
            type: 'input',
            name: 'newDeadline',
            message: 'Enter new deadline (YYYY-MM-DD):',
            when: (answers) => answers.properties.includes('Deadline'),
          },
          {
            type: 'list',
            name: 'newStatus',
            message: 'Select new status:',
            choices: ['done', 'pending'],
            when: (answers) => answers.properties.includes('Status'),
          },
        ])
        .then((answers) => {
          const taskName = argv.name;
          updateTask(taskName, answers);
        });
    },
  })
  .command({
    command: 'update <name> [flags...]',
    describe: 'Update a task property using flags',
    builder: (yargs) => {
      return yargs.options({
        's': {
          alias: 'status',
          describe: 'Update task status',
        },
        't': {
          alias: 'title',
          describe: 'Change task name',
        },
        'd': {
          alias: 'description',
          describe: 'Update task description',
        },
        'dl': {
          alias: 'deadline',
          describe: 'Change task deadline (DD-MM-YYYY)',
        },
      });
    },
    handler: (argv) => {
      const { name, flags } = argv;
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
