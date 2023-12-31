// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/inputs/button";
import TextField from "../../../components/inputs/textfield";
// import EmployeeList from "./employees.json";
import EmployeeModal from "../../../components/modals/EmployeeModal";
import { useEffect, useState } from "react";
import { getEmployees } from '../../../utils/localStorage'

export default function Employees() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [EmployeeList, setEmployeeList] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const statusColor = (color: string) => {
    switch(color) {
      case "Active": return 'bg-green-200 text-green-600';
      case "Blocked": return  "bg-red-200 text-red-600";
      case "Pending": return "bg-yellow-200 text-yellow-600";
      case "On Leave": return "bg-sky-200 text-sky-600";
      default: return "bg-gray-200 text-gray-600";
    }
  }
  const editUser = (data: object) => {
    setCanDelete(false);
    setOpenModal(!openModal);
    setModalData(data);
  }
  const createUser = () => {
    setCanDelete(false);
    setOpenModal(!openModal);
    setModalData({});
  }
  const deleteUser = (data: object) => {
    setCanDelete(true);
    setOpenModal(!openModal);
    setModalData(data);
  }
  useEffect(()=> {
    setEmployeeList(getEmployees() ?? [])
  },[])
  return (
    <main className="p-[40px]">
      <EmployeeModal open={openModal} data={modalData} setOpen={() => setOpenModal(!openModal)} setEmployeeList={setEmployeeList} canDelete={canDelete}/>
      <div>
        <header className="font-primary flex items-center mb-[40px]">
            <h1 className="text-[28px] font-semibold text-gray-800">Employee Management</h1>
        </header>
        <div className="flex font-medium gap-x-[20px] text-[15px] text-grey mb-[30px]">
          <p className="text-primary-100 border-b-primary border-b-2">All Users</p>
          {/* <p className="hover:text-yellow-600">Pending Invitations</p>
          <p className="hover:text-green-600">Active</p>
          <p className="hover:text-red-600">Blocked</p> */}
        </div>
        <div className="shadow-[0_10px_25px_2px_rgb(0,0,0,0.08)] rounded-lg p-[20px]">
          {/* header */}
          <div className="flex items-center gap-x-[10px] mb-[10px]">
            <h1 className="font-semibold leading-none w-full font-header">User List ({EmployeeList.length})</h1>
            <TextField 
            text="Search by name / email" 
            type="search"
            lefticon="search"
            className="py-[8px] w-full min-w-[400px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button 
              text="Invite User"
              className="py-[8px] max-w-[300px] w-full text-[15px]"
              icon="plus"
              onClick={createUser}
            />

          </div>
          {/* table */}
          <div className="overflow-x-auto">
              <div className="min-w-screen min-h-screen overflow-hidden">
                  <div className="w-full ">
                      <div className="">
                          <table className="min-w-max w-full table-auto">
                              <thead>
                                  <tr className="border-b-[2px] text-gray-600 text-sm leading-normal">
                                      <th className="py-3 px-6 text-left w-[10px]">S/N</th>
                                      <th className="py-3 px-6 text-left">Full Name</th>
                                      <th className="py-3 px-6 text-left">Email</th>
                                      <th className="py-3 px-6 text-left">Role</th>
                                      <th className="py-3 px-6 text-left">Status</th>
                                      <th className="py-3 px-6 text-center">Actions</th>
                                  </tr>
                              </thead>
                              <tbody className="text-gray-600 text-sm font-light">
                                {
                                  EmployeeList.filter((em) => em.fullName.toLowerCase().indexOf(searchValue.toLowerCase()) != -1).map((employee, index) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                      <td className="py-5 px-6 w-[10px]">{index + 1}</td>
                                      <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center cursor-pointer" onClick={() => editUser(employee)}>
                                          {/* <div className="mr-2">
                                              <img className="w-6 h-6 rounded-full" src={employee.img}/>
                                          </div> */}
                                          <span className="font-medium">{employee.fullName}</span>
                                        </div>
                                      </td>
                                      <td className="py-3 px-6 text-left">
                                        <span>{employee.email}</span>
                                      </td>
                                      <td className="py-3 px-6 text-left">
                                        <span>
                                          {employee.role}
                                          {/* <span className="bg-sky-200 p-[4px] rounded-md ml-[8px] font-medium text-[12px]">{employee.tag}</span> */}
                                        </span>
                                      </td>
                                      <td className="py-3 px-6 text-left">
                                          <span className={`${statusColor(employee.status)} py-1 px-3 rounded-full text-xs`}>
                                            <FontAwesomeIcon icon={faCircle} className="w-[6px] mr-[4px]"/>
                                            {employee.status}
                                          </span>
                                      </td>
                                      <td className="py-3 px-6 text-center">
                                          <div className="flex item-center justify-center">
                                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer" onClick={() => editUser(employee)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                  </svg>
                                              </div>
                                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer" onClick={() => deleteUser(employee)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                  </svg>
                                              </div>
                                          </div>
                                      </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  )
}