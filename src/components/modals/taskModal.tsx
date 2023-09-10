import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./index.tsx";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../inputs/button/index.tsx";
import { useEffect, useState } from "react";

interface data {
  title?: string,
  description?: string,
  assignees?: string[],
  tags?: string[]
}
interface ModalProps {
  open?: boolean;
  setOpen: () => void;
  data?: data;
}
export default function TaskModal({open, setOpen, data = {} }: ModalProps) {
  const [taskTypeList, setTaskTypeList] = useState([] as string[]);
  const [task, setTask] = useState({});
  const statusColor = (color: string) => {
    switch(color) {
      case "Active": return 'bg-green-200 text-green-600';
      case "Blocked": return  "bg-red-200 text-red-600";
      case "Pending": return "bg-yellow-200 text-yellow-600";
      case "On Leave": return "bg-sky-200 text-sky-600";
      default: return "bg-gray-200 text-gray-600"
    }
  }
  const setTaskType = (taskType: string) => {
    if (taskTypeList.includes(taskType)) {
      const newList = [...taskTypeList].filter((list: string) => list != taskType)
      return setTaskTypeList(newList)
    }
    setTaskTypeList([...taskTypeList, taskType])
  }
  const taskTypes = ['Design', 'Product', 'Frontend', 'Backend'];

  const editTask = (params: string, value: string) => {
    setTask({...task, [params]: value})
  }
  const saveTask = () => {
    const new_task = {...task, "tags": taskTypeList}
    console.log(new_task, 'newTask')
  }

  useEffect(() => {
    setTaskTypeList(data.tags ?? [] as string[]);
    setTask(data);
  }, [open])

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="p-[20px] space-y-[30px]">
        <header className="flex justify-between items-center mb-[30px]">
          <p className="font-semibold font-header text-[18px]">{data.title ? 'Edit task' : 'Create a new task'}</p>
          <FontAwesomeIcon icon={faXmark} size="xl" onClick={setOpen} className="cursor-pointer"/>
        </header>
        <div>
          <p className="font-medium font-header mb-[10px]">Title</p>
          <input value={data.title} onChange={(e) => editTask('title', e.target.value)} type="text" placeholder="Enter a new title" className="outline-none font-header border-b-[1px] w-full"/>
        </div>
        <div>
          <p className="font-medium font-header mb-[10px]">Task Description</p>
          <textarea value={data.description} onChange={(e) => editTask('description', e.target.value)}  placeholder="Enter description" className="outline-none font-header border-b-[1px] w-full"/>
        </div>
        <div>
          <p className="font-medium font-header mb-[10px]">Task Type</p>
          <div className="flex flex-wrap gap-[10px]">
            {
              taskTypes.map((type: string) => (
                <span className={`${statusColor(type)} text-xs rounded-md py-1 px-3`} onClick={() => setTaskType(type) }>
                  {type}
                  {
                    taskTypeList.includes(type) && (
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
            text={`${data.title ? "Edit Task":"Create Task"}`}
            // loading={true}
            onClick={saveTask}
          />
        </div>
      </div>
    </Modal>
  )
}