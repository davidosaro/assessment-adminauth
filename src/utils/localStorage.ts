// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const admin_task = 'ADMIN_TASK';
const admin_employee = 'ADMIN_EMPLOYEE';
const admin_user = 'ADMIN_USER';

function getTasks() {
  return JSON.parse(localStorage.getItem(admin_task) as string)
}

function setTasks(tasks) {
  return localStorage.setItem(admin_task, JSON.stringify(tasks))
}

function getEmployees() {
  return JSON.parse(localStorage.getItem(admin_employee) as string)
}

function setEmployees(employees) {
  return localStorage.setItem(admin_employee, JSON.stringify(employees))
}

function getUser() {
  return JSON.parse(localStorage.getItem(admin_user) as string)
}

function setUser(user) {
  return localStorage.setItem(admin_user, JSON.stringify(user))
}

export {
  getTasks,
  setTasks,
  getEmployees,
  setEmployees,
  getUser,
  setUser
}