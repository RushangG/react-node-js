import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleUpdateFunction1788949718267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_user_roles(user_id INT, new_role_ids INT[]) 
            returns void 
            LANGUAGE plpgsql AS
             $$
             Begin 
                --delete 
                Delete from users_roles where "userId" = user_id and "roleId" != ALL (new_role_ids);

                --insert
                INSERT INTO users_roles ("userId", "roleId")
                SELECT user_id, unnest(new_role_ids)
                WHERE NOT EXISTS (
                    SELECT 1 FROM users_roles 
                    WHERE "userId" = user_id AND "roleId" = ALL (new_role_ids)
                );
             End;
             $$
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP FUNCTION IF EXISTS update_user_roles;
        `);
  }
}
