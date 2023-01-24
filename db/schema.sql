DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  -- id set to integer, automatic increment, and primary key
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- name set to varchar, max size 30, not null
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  -- id set to integer, automatic increment, and primary key
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- title set to varchar, max size 30, and not null
  title VARCHAR(30) NOT NULL,
  -- salary set to decimal and not null
  salary DECIMAL NOT NULL,
  -- department id set to integer and not null
  department_id INT NOT NULL,
  -- foreign key department id referencing department table on id with on delete constraint
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
  -- optional - index on department id
);

CREATE TABLE employee (
  -- id set to integer with automatic increment and primary key constraints
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- first name set to var char, max size 30, and not null contraint
  first_name VARCHAR(30) NOT NULL,
  -- last name set to var char, max size 30, and not null
  last_name VARCHAR(30) NOT NULL,
  -- role id set to integer and not null
  role_id INT NOT NULL,
  -- manager id set to integer
  manager_id INT,
  -- foreign key on role id referencing role table on id with on delete constraint
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  -- foreign key on manager id referencing employee table on id with on delete constraint
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
  -- optional - indexes on role id, manager id
);

-- INSERT INTO your_table_for_departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering');

-- INSERT INTO your_table_for_roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Salesperson', 100000, 1),
  ('Sales Manager', 200000, 1),
  ('Sales Director', 300000, 1),
  ('Sales VP', 400000, 1),
  ('Marketing Manager', 200000, 2),
  ('Marketing Director', 300000, 2),
  ('Marketing VP', 400000, 2),
  ('Software Engineer', 100000, 3),
  ('Software Engineer II', 200000, 3),
  ('Software Engineer III', 300000, 3),
  ('Software Engineer IV', 400000, 3),
  ('Software Engineer V', 500000, 3);

-- INSERT INTO your_table_for_employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, 1),
  ('Jane', 'Doe', 2, 1),
  ('John', 'Smith', 3, 1),
  ('Jane', 'Smith', 4, 1),
  ('John', 'Jones', 5, 1),
  ('Jane', 'Jones', 6, 1),
  ('John', 'Brown', 7, 1),
  ('Jane', 'Brown', 8, 1),
  ('John', 'White', 9, 1),
  ('Jane', 'White', 10, 1),
  ('John', 'Black', 11, 1),
  ('Jane', 'Black', 12, 1);
