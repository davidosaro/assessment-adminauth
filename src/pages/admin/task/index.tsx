// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { faCalendarDays, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/inputs/button";
// import TaskList from './tasks.json';
import TaskModal from "../../../components/modals/taskModal";
import { useEffect, useState } from "react";
import { getTasks } from "../../../utils/localStorage";

export default function Tasks() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [TaskList, setTaskList] = useState([]);
  const [canDelete, setCanDelete] = useState(false);

  const statusColor = (color: string) => {
    switch(color) {
      case "Active": return 'bg-green-200 text-green-600';
      case "Blocked": return  "bg-red-200 text-red-600";
      case "Pending": return "bg-yellow-200 text-yellow-600";
      case "On Leave": return "bg-sky-200 text-sky-600";
      default: return "bg-gray-200 text-gray-600"
    }
  }
  const editTask = (data: object) => {
    setCanDelete(false);
    setOpenModal(!openModal);
    setModalData(data);
  }
  const createTask = () => {
    setCanDelete(false);
    setOpenModal(!openModal);
    setModalData({});
  }
  const deleteTask = (data: object) => {
    setCanDelete(true);
    setOpenModal(!openModal);
    setModalData(data);
  }
  useEffect(()=> {
    setTaskList(getTasks() ?? [])
  },[])
return (
  <main className="p-[40px]">
    <TaskModal open={openModal} data={modalData} setOpen={() => setOpenModal(!openModal)} setTaskList={setTaskList} canDelete={canDelete}></TaskModal>
    <header className="font-primary flex justify-between mb-[40px]">
      <h1 className="text-[28px] font-semibold text-gray-800 flex items-center">
        Tasks
        <span className="bg-blue-500 w-[30px] h-[30px] ml-[10px] text-white font-medium text-[14px] rounded-full flex justify-center items-center">{TaskList.length}</span>
      </h1>
      <div className="flex gap-x-[10px]">
        <Button 
          text="Create Task" 
          // type='outline'
          className="!w-[250px] bg-sky-50 border-0 !text-sky-500"
          onClick={createTask}
        />
        {/* <Button 
          icon="ellipsis" 
          type='outline'
          className="w-[50px]"
        /> */}
      </div>
    </header>
    <div className="grid grid-cols-3 gap-[20px] mb-[60px]">
      {
        TaskList.map((task) => (
          <div className="w-full border-[1px] rounded-lg p-[12px] shadow-lg">
            <div className="flex flex-wrap gap-[10px]">
              {
                task.tags.map((tag) => (
                  <span className={`${statusColor(tag)} text-xs rounded-md py-1 px-3`}>{tag}</span>
                ))
              }
              <span onClick={() => editTask(task)} className={`${statusColor('active')} text-xs rounded-md py-1 px-3 cursor-pointer`}>
              <FontAwesomeIcon icon={faPlus}/>
              </span>
            </div>
            <header className="py-[20px] space-y-[10px] cursor-pointer" onClick={() => editTask(task)}>
              <h1 className="text-gray-800 font-semibold text-[24px] leading-none">{task.title}</h1>
              <h2 className=" text-gray-500 text-[14px]">{task.description}</h2>
            </header>
            <footer className="flex justify-between">
{/*               
              <div className="flex items-center justify-start">
                {
                  task.assignees.map((assignee) => (
                    <img className="w-6 h-6 rounded-full transition-transform transform hover:scale-125" src={assignee.img}/>
                  ))
                }
              </div> */}
              <h1 className="space-x-[8px] text-grey">
                
                <FontAwesomeIcon icon={faCalendarDays} size="lg" />
                <span>{task.endDate}</span>
              </h1>
              <FontAwesomeIcon icon={faTrash} size="lg" className="space-x-[8px] text-grey hover:text-red-600 cursor-pointer mr-[4px]"
              onClick={()=> deleteTask(task)}/>
            </footer>
          </div>
        ))
      }
    </div>
  </main>
)
}