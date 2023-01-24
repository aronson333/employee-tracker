const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
// Import console table for logging information on screen in table format
require("console.table");

// Call startup function
initApp();

function initApp() {
  const logoText = logo({ name: "Employee Tracker" }).render();

  console.log(logoText);

  promptQuestions();
}

function promptQuestions() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add a New Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      default:
        quit();
    }
  });
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => promptQuestions());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => promptQuestions());
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => promptQuestions());
}

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ])
    .then(res => db.createDepartment(res))
    .then(() => promptQuestions());
}

function addRole() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      return prompt([
        {
          name: "title",
          message: "What is the name of the role?"
        },
        {
          name: "salary",
          message: "What is the salary of the role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "What department does the role belong to?",
          choices: departmentChoices
        }
      ]);
    })
    .then(role => db.createRole(role))
    .then(() => promptQuestions());
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          prompt([
            {
              type: "list",
              name: "role_id",
              message: "What is the employee's role?",
              choices: roleChoices
            }
          ]).then(res => {
            let roleId = res.role_id;
            db.findAllEmployees()
              .then(([rows]) => {
                let employees = rows;
                const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id
                }));
                prompt([
                  {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                  }
                ]).then(res => {
                  let managerId = res.manager_id;
                  db.createEmployee({first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId})
                    .then(() => promptQuestions());
                });
              });
          });
        });
    });
}

function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      return prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        }
      ]);
    })
    .then(res => {
      let employeeId = res.employee_id;
      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          prompt([
            {
              type: "list",
              name: "role_id",
              message: "What is the employee's new role?",
              choices: roleChoices
            }
          ]).then(res => {
            let roleId = res.role_id;
            db.updateEmployeeRole(employeeId, roleId)
              .then(() => promptQuestions());
          });
        });
    });
}

// function - Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}

// ========================
//  OPTIONAL
// ========================

// fuction - View all employees that belong to a department

// function - View all employees that report to a specific manager

// function - Update an employee's manager

// function - View all departments and show their total utilized department budget

// function - Delete an employee

// function - Delete a department

// function - Delete a role

