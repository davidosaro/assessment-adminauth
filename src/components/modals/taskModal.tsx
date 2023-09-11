// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./index.tsx";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../inputs/button/index.tsx";
import { useEffect, useState } from "react";
import { setTasks, getTasks } from "../../utils/localStorage.ts";
import Notify from "../utils/Notify.ts";

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
  setTaskList: (new_tasks) => void;
  canDelete?: boolean
}
export default function TaskModal({open, setOpen, data = {}, setTaskList, canDelete }: ModalProps) {
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
    if (canDelete) return
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
  const deleteTask = () => {
    const new_tasks = getTasks().filter((tasks) => tasks.id != task.id);
    setTasks(new_tasks);
    setTaskList(new_tasks);
    setOpen();
    Notify('task deleted successfully', 'success')
  }
  const saveTask = () => {
    if (canDelete) {
      deleteTask();
      return;
    }
    //edit
    if (data.title) {
      const new_task = getTasks().map((tasks) => {
        if (tasks.id == task.id) {
          return {...task, "tags": taskTypeList}
        }
        return tasks
      })
      setOpen();
      setTasks(new_task);
      setTaskList(new_task);
      Notify('user edited successfully', 'success')

      return
    }
    const new_task = {...task, "tags": taskTypeList, "id": getTasks()?.length ?? 0}
    setOpen();
    setTaskList([...getTasks() ?? [], new_task]);
    setTasks([...getTasks() ?? [], new_task]);
    Notify('task created successfully', 'success')
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
          <input disabled={canDelete} value={task.title} onChange={(e) => editTask('title', e.target.value)} type="text" placeholder="Enter a new title" className="outline-none font-header border-b-[1px] w-full"/>
        </div>
        <div>
          <p className="font-medium font-header mb-[10px]">Task Description</p>
          <textarea disabled={canDelete} value={task.description} onChange={(e) => editTask('description', e.target.value)}  placeholder="Enter description" className="outline-none font-header border-b-[1px] w-full"/>
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
          
            text={`${!canDelete ? (data.title ? "Edit Task":"Create Task") : "Delete Task"}`}
            // loading={true}
            onClick={saveTask}
          />
        </div>
      </div>
    </Modal>
  )
}