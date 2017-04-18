exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments().primary();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password_digest').notNullable();
      table.timestamps();
    }),

    knex.schema.createTable('answers', (table) => {
      table.increments().primary();
      table.string('question').notNullable();
      table.json('section').notNullable();
      table.json('level').notNullable();
      table.string('theory').notNullable();
      table.text('answer').notNullable();
      table.json('answers').notNullable();
      table.string('notes');
      table.string('username');
      table.timestamps();
    })
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('questions')
  ]);
