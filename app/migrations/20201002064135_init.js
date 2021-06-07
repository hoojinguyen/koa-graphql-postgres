exports.up = async function(knex) {
  await knex.raw(`
      CREATE TABLE users (
          "id" serial NOT NULL,
          "email" text NULL,
          "password" text NULL,
          "name" text NULL,
          "role" text NULL,
          "created_at" timestamptz NULL DEFAULT now(),
          "updated_at" timestamptz NULL DEFAULT now(),
          "deleted_at" timestamptz NULL,
          CONSTRAINT users_email_key UNIQUE (email),
          CONSTRAINT users_pkey PRIMARY KEY (id)
      );
  `);

  await knex.raw(`
      CREATE TABLE todos (
        "id" serial NOT NULL,
        "user_id" serial NOT NULL,
        "title" text NULL,
        "completed" BOOLEAN,
        "created_at" timestamptz NULL DEFAULT now(),
        "updated_at" timestamptz NULL DEFAULT now(),
        "deleted_at" timestamptz NULL,
        CONSTRAINT todo_pkey PRIMARY KEY (id),
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  await knex.raw(`
      INSERT INTO users
        (role, email, password, name)
      VALUES
      ('admin', 'admin@gmail.com', '1234', 'Admin'),
      ('guest', 'guest@gmail.com', '1234', 'Guest'),
      ('guest', 'vanhoinguyen98@gmail.com', '1234', 'Nguyen Van Hoi'),
      ('guest', 'khanhduv4@gmail.com', '1234', 'Le Mai Van Khanh'),  
      ('guest', 'tranngochung@gmail.com', '1234', 'Tran Ngoc Hung');  
  `);

  await knex.raw(`
      INSERT INTO todos
        (user_id, title, completed)
      VALUES
        ('3','Hoc Vuejs', false),
        ('3','Hoc Reactjs', false),
        ('3','Hoc Angularjs', false),
        ('3','Hoc C++', false),
        ('3','Hoc C#', false),
        ('4','Lay hang', false),
        ('4','Chuyen Nha', false),
        ('4','Don Ve sinh phong', false),
        ('4','Mua Qua Tet', false),
        ('4','Lam Dealine', false),
        ('5','Sua xe', false),
        ('5','Mua sua rua mat', false),
        ('5','Sap xep quan ao', false),
        ('5','Tao tai khoan', false),
        ('5','Ngam gai', false);
  `);
};

exports.down = async function(knex) {
  await knex.raw(` DROP TABLE IF EXISTS todos;`);
  await knex.raw(` DROP TABLE IF EXISTS users;`);
};
