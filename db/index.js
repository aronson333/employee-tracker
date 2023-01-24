const connection = require("./connection");

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  //  2. method - find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
    );
  }
  //  3. method - create a new employee - takes employee object as input parameter
  createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", [employee]);
  }
  //  4. method - update employee's role - takes employee id and role id as input parameters
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
  }
  //  5. method - find all roles - join with departments to diplay department names
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
    );
  }
  //  6. method - create a new role - takes in role object as input parameter
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }
  //  7. method - find all departments
  findAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }
  //  8. method - create a new department - takes in department object as input parameter
  createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }
  
  // ================
  // OPTIONAL METHODS
  // ================
  
  //  - method: Find all employees except the given employee id
  //  - method: Find all employees in a given department, join with roles to display role titles
  //  - method: Find all employees by manager, join with departments and roles to display titles and department names
  //  - method: Find all departments, join with employees and roles and sum up utilized department budget
  //  - method: Remove a department
  //  - method: Remove a role from the db
  //  - method: Update the given employee's manager
  //  - method: Remove an employee with the given id
}

module.exports = new Database(connection);

