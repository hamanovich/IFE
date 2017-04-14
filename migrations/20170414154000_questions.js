
exports.up = knex => knex.schema.createTable('questions', (table) => {
  table.increments();
  table.string('question').notNullable();
  table.string('section').notNullable();
  table.string('level').notNullable();
  table.string('theory').notNullable();
  table.string('answers').notNullable();
  table.string('notes');
  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('questions');
