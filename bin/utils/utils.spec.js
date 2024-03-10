const validateName = require('./validation');
const colors = require('colors');
const paint = require('./paint');
const { Task } = require('../models/task.model');

describe('Util functions', () => {
  describe('Validate task name', () => {
    it('Should throw if name undefined', () => {
      expect(() => { validateName(); }).toThrow('Task name cannot be null or empty.');
    });

    it(`Should throw if name is ''`, () => {
      const name = '';
      expect(() => { validateName(name); }).toThrow('Task name cannot be null or empty.');
    })
  });

  describe('Paint function', () => {
    it(`Should return green color for 'done' status`, () => {
      const status = Task.status.done;
      const result = paint(status);
      expect(result).toEqual(colors.green(status));
    });

    it(`Should return blue color for 'pending' status`, () => {
      const status = Task.status.pending;
      const result = paint(status);
      expect(result).toEqual(colors.blue(status));
    });

    it(`Should return red color for 'overdue' status`, () => {
      const status = Task.status.overdue;
      const result = paint(status);
      expect(result).toEqual(colors.red(status));
    });

    it('Should return yellow color for other cases', () => {
      const str = 'some word';
      const result = paint(str);
      expect(result).toEqual(colors.yellow(str));
    });
  });
});
