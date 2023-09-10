import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./index.tsx";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../inputs/button/index.tsx";
import { useEffect, useState } from "react";

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
}
export default function EmployeeModal({open, setOpen, data = {} }: ModalProps) {
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
    if (roleTypeList == roleType) {
      return setRoleTypeList("")
    }
    setRoleTypeList(roleType);
  }
  const setStatusType = (statusType: string) => {
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
  const saveUser = () => {
    const new_role = {...role, "tag": roleTypeList}
    console.log(new_role, 'newTask');
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
          <input value={data.fullName} onChange={(e) => editUser('fullName', e.target.value)} type="text" placeholder="Enter Full Name" className="outline-none font-header border-b-[1px] w-full"/>
        </div>
        <div>
          <p className="font-medium font-header mb-[10px]">Email Address</p>
          <input value={data.email} onChange={(e) => editUser('email', e.target.value)}  placeholder="Enter Email Address" className="outline-none font-header border-b-[1px] w-full"/>
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
            text={`${data.email ? "Edit User" : "Create User" }`}
            // loading={true}
            onClick={saveUser}
          />
        </div>
      </div>
    </Modal>
  )
}