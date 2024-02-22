const validateName = (name) => {
  if (name === undefined || name === '') {
    throw new Error('Task name cannot be null or empty.')
  }
};

module.exports = validateName;
