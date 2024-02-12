const yargs = require('yargs');

yargs
  .command({
    command: 'add',
    describe: 'Add new task',
    builder: {
      title: {
        describe: 'Task title',
        demandOption: true,
        type: 'string',
      },
      description: {
        describe: 'Task description',
        demandOption: true,
        type: 'string',
      },
      deadLine: {
        describe: 'Task deadline (DD-MM-YYYY)',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      //addTask
    },
  })
  .command({
    command: ['list', 'ls'],
    describe: 'Show list of all the tasks',
    handler: () => {
      //listTasks
    },
  });
