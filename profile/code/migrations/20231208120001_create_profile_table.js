export const up = async (knex) => {
  await knex.schema.createTable('profile', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.jsonb('goals'); // Assuming goals should be stored as JSONB
    table.jsonb('stats'); // Assuming stats should be stored as JSONB
    table.jsonb('interests'); // Assuming interests should be stored as JSONB
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('profile');
};
