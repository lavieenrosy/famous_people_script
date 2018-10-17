
exports.up = function(knex) {
  return knex.schema.createTable('milestones', (table) => {
    table.increments();
    table.string('description').notNull();
    table.date('date_archieved').notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('milestones');
};
