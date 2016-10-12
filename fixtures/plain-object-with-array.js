module.exports = {
  firstName: 'John',
  lastName: 'Smith',
  // Would be read as VARCHAR(64):
  // ["john@example.com","john.smith@example.com" ]
  // Discovered row path would be `$.emails[0:]`
  emails: [
    'john@example.com',
    'john.smith@example.com',
  ],
};
