exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('username').notNullable().unique();
  table.string('email').notNullable().unique();
  table.string('password_digest').notNullable();
  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('users');
