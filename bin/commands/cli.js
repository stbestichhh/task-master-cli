const yargs = require('yargs');
const inquirer = require('inquirer');
const {
  addTask,
  listTask,
  pickTask,
  getTaskListStatus,
  updateTask,
  deleteTask,
  dropTasks,
} = require('../services/task.service');

yargs
  .command({
    command: ['add', 'a'],
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
    command: 'pick <name>',
    describe: 'Get task by name',
    handler: (argv) => {
      pickTask(argv.name);
    },
  })
  .command({
    command: ['status', 's'],
    describe: 'Get short stats of all your tasks',
    handler: () => {
      getTaskListStatus();
    },
  })
  .command({
    command: ['update <name>', 'u <name>'],
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
            message: 'Enter new deadline (DD-MM-YYYY):',
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
    command: 'done <name>',
    describe: 'Check task as done',
    handler: (argv) => {
      const taskName = argv.name;
      const properties = { newStatus: 'done' };
      updateTask(taskName, properties);
    },
  })
  .command({
    command: 'udone <name>',
    describe: 'Check task as not done',
    handler: (argv) => {
      const taskName = argv.name;
      const properties = { newStatus: 'pending' };
      updateTask(taskName, properties);
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
  .command({
    command: ['drop'],
    describe: 'Delete all tasks',
    handler: () => {
      dropTasks();
    }
  })
  .demandCommand()
  .help().argv;
