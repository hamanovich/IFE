
exports.up = function(knex, Promise) {
  
};

exports.down = knex => knex.schema.dropTable('answers');
