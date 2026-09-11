import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleUpdateFunction1788949718267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           CREATE OR REPLACE FUNCTION modify_user_roles(user_id INT, new_role_ids INT[]) 
            returns void 
            LANGUAGE plpgsql AS
             $$
             Begin 
              --delete 
                DELETE FROM users_roles
                WHERE "userId" = user_id
                And "roleId" != ALL (new_role_ids);

                --insert
                Insert into users_roles ("userId", "roleId")
                select user_id, role_id
                from unnest(new_role_ids) as role_id
                on conflict ("userId", "roleId") do nothing;
				End;
             $$;

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP FUNCTION IF EXISTS update_user_roles(INT, INT[]);
        `);
  }
}
