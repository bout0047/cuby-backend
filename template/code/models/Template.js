// models/User.js
import knex from '../knexfile.js';

class User {
  static async getAllUsers() {
    return knex('users').select('*');
  }

  static async createUser(user) {
    return knex('users').insert(user).returning('*');
  }

  // Add other methods as needed
}

export default User;
