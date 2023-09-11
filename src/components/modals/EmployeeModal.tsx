// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./index.tsx";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../inputs/button/index.tsx";
import { useEffect, useState } from "react";
import { getEmployees, setEmployees } from '../../utils/localStorage.ts'
import Notify from "../utils/Notify.ts";

interface data {
  fullName?: string,
  email?: string,
  status?: string,
  tag?: string,
  role?: string,
}
interface ModalProps {
  open?: boolean;
  setOpen: () => void;
  data?: data;
  setEmployeeList: (new_employees) => void;
  canDelete?: boolean
}
export default function EmployeeModal({open, setOpen, data = {}, setEmployeeList, canDelete }: ModalProps) {
  const [roleTypeList, setRoleTypeList] = useState("");
  const [statusTypeList, setStatusTypeList] = useState("");
  const [role, setRole] = useState({});

  const statusColor = (color: string) => {
    switch(color) {
      case "Active": return 'bg-green-200 text-green-600';
      case "Blocked": return  "bg-red-200 text-red-600";
      case "Pending": return "bg-yellow-200 text-yellow-600";
      case "On Leave": return "bg-sky-200 text-sky-600";
      default: return "bg-gray-200 text-gray-600";
    }
  }
  const setRoleType = (roleType: string) => {
    if (canDelete) return
    if (roleTypeList == roleType) {
      return setRoleTypeList("")
    }
    setRoleTypeList(roleType);
  }
  const setStatusType = (statusType: string) => {
    if (canDelete) return
    if (statusTypeList == statusType) {
      return setStatusTypeList("")
    }
    setStatusTypeList(statusType);
  }
  const roleTypes = ['Design', 'Product', 'Frontend', 'Backend'];
  const statusTypes = ['Active', 'Pending', 'Blocked', 'On Leave'];

  const editUser = (params: string, value: string) => {
    setRole({...role, [params]: value})
  }
  const deleteUser = () => {
    const new_employees = getEmployees().filter((em: {id: string}) => em.id != role.id);
    setEmployees(new_employees);
    setEmployeeList(new_employees);
    setOpen();
    Notify('user deleted successfully', 'success')
  }
  const saveUser = () => {
    // delete
    if (canDelete) {
      deleteUser();
      return;
    }
    //edit
    if (data.email) {
      const new_employees = getEmployees().map((em: {id: string}) => {
        if (em.id == role.id) {
          return {...role, "role": roleTypeList, "status": statusTypeList}
        }
        return em
      })
      setOpen();
      setEmployees(new_employees);
      setEmployeeList(new_employees);
      Notify('user edited successfully', 'success')

      return
    }
    //create
    const new_employees = {...role, "role": roleTypeList, "status": statusTypeList, "id": getEmployees()?.length ?? 0}
    setOpen();
    setEmployeeList([...getEmployees() ?? [], new_employees]);    
    setEmployees([...getEmployees() ?? [], new_employees]);
    Notify('user created successfully', 'success')
  }

  useEffect(() => {
    setRoleTypeList(data.role);
    setStatusTypeList(data.status);
    setRole(data);
  }, [open])

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="p-[20px] space-y-[30px]">
        <header className="flex justify-between items-center mb-[30px]">
          <p className="font-semibold font-header text-[18px]">{data.email ? 'Edit User' : 'Create a new User'}</p>
          <FontAwesomeIcon icon={faXmark} size="xl" onClick={setOpen} className="cursor-pointer"/>
        </header>
        <div>
          <p className="font-medium font-header mb-[10px]">Full Name</p>
          <input disabled={canDelete} value={role.fullName} onChange={(e) => editUser('fullName', e.target.value)} type="text" placeholder="Enter Full Name" className="outline-none font-header border-b-[1px] w-full"/>
        </div>
        <div>
          <p className="font-medium font-header mb-[10px]">Email Address</p>
          <input disabled={canDelete} value={role.email} onChange={(e) => editUser('email', e.target.value)}  placeholder="Enter Email Address" className="outline-none font-header border-b-[1px] w-full"/>
        </div>
        <div>
          <p className="font-medium font-header mb-[10px]">Role</p>
          <div className="flex flex-wrap gap-[10px]">
            {
              roleTypes.map((type: string) => (
                <span className={`${statusColor(type)} text-xs rounded-md py-1 px-3`} onClick={() => setRoleType(type) }>
                  {type}
                  {
                    roleTypeList == type && (
                      <FontAwesomeIcon icon={faCheck} className="ml-[4px] text-green-500" size="lg"/>
                    )
                  }
                </span>
              ))
            }
            </div>
        </div>
        <div>
          <p className="font-medium font-header mb-[10px]">Status</p>
          <div className="flex flex-wrap gap-[10px]">
            {
              statusTypes.map((type: string) => (
                <span className={`${statusColor(type)} text-xs rounded-md py-1 px-3`} onClick={() => setStatusType(type) }>
                  {type}
                  {
                    statusTypeList == type && (
                      <FontAwesomeIcon icon={faCheck} className="ml-[4px] text-green-500" size="lg"/>
                    )
                  }
                </span>
              ))
            }
            </div>
        </div>
        <div>
          
          <Button 
            text={`${!canDelete ? (data.email ? "Edit User" : "Create User"): 'Delete User' }`}
            // loading={true}
            onClick={saveUser}
          />
        </div>
      </div>
    </Modal>
  )
}