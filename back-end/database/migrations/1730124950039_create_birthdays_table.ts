import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Birthdays extends BaseSchema {
  protected tableName = 'birthdays'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('fullname').notNullable()
      table.datetime('birthdate').notNullable()
      table.datetime('created_at')
      table.datetime('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
