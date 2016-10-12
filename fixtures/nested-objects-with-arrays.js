module.exports = {
  firstName: 'John',
  lastName: 'Smith',

  // NOTE Kinesis Analytics would read values for `position` and `name` from
  // `emails` string value, trimming it to correcly discovered varchar length.
  // - `["john@example.c`
  // - `["john@example.com","john.smith@`
  //
  // NOTE This would happen only if `work` key is serialized after `emails`.
  work: {
    // position VARCHAR(16) $.work.position
    position: 'Developer',
    company: {
      // name VARCHAR(32) $.work.company.name
      name: 'Tools and Counters',
    },
  },

  another: {
    object: 'another.object.property'
  },

  // Would be read as VARCHAR(64):
  // ["john@example.com","john.smith@example.com" ]
  // Discovered row path would be `$.emails[0:]`
  emails: [
    'john@example.com',
    'john.smith@example.com',
  ],

  // Would be read as VARCHAR(16):
  // ["jo","smith" ]
  // Discovered row path would be `$.nicknames[0:]`
  nicknames: [
    'jo',
    'smith',
  ],
};
