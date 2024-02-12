const validateName = (name) => {
  if (name === undefined || name === '') {
    return console.error('Task name cannot be null or empty.');
  }
};

module.exports = validateName;
