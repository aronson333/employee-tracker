USE employees_db;

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
