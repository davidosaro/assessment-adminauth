import { faArrowTrendDown, faArrowTrendUp, faChartSimple, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/inputs/button";

function Admin() {
  return (
    <main className="p-[40px]">
      <div>
        <header className="font-primary flex justify-between mb-[20px]">
          <h1 className="text-[28px] font-semibold text-gray-800">Summary</h1>
          <div className="flex gap-x-[10px]">
            <Button 
              text="Export Data" 
              type='outline'
              className="w-[150px] bg-sky-50 border-0 text-sky-500"
            />
            <Button 
              icon="ellipsis" 
              type='outline'
              className="w-[50px]"
            />
          </div>
        </header>
        {/*  */}

        <div>
          <header className="mb-[20px]">
            {/* <h1 className="text-[28px] font-semibold text-gray-800 mb-[4px]">Task Management</h1> */}
            <div className="space-x-[20px]">
              <span className="font-medium font-header text-[14px]">
                <FontAwesomeIcon icon={faCircle} size="2xs" className="text-green-500 w-[8px] mr-[20px]"/>
                Completed
              </span>

              <span className="font-medium font-header text-[14px]">
                <FontAwesomeIcon icon={faCircle} size="2xs" className="text-sky-500 w-[8px] mr-[20px]"/>
                Ongoing
              </span>

              <span className="font-medium font-header text-[14px]">
                <FontAwesomeIcon icon={faCircle} size="2xs" className="text-pink-500 w-[8px] mr-[20px]"/>
                Failed
              </span>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-[20px] mb-[60px]">
            <div className="w-full border-[1px] rounded-lg">
              <header className="p-[20px] space-y-[20px]">
                <h1 className=" text-gray-500">Completed Tasks</h1>
                <div className="flex justify-between items-end">
                  <p className="font-header font-bold text-[42px] text-gray-800 leading-none">1,409</p>
                  <p className="text-green-500  font-header flex gap-x-[10px]">
                    23%
                    <FontAwesomeIcon icon={faChartSimple} className="mt-[2px]"/>
                  </p>
                </div>
              </header>
            </div>

            <div className="w-full border-[1px] rounded-lg">
              <header className="p-[20px] space-y-[20px]">
                <h1 className=" text-gray-500">Ongoing Tasks</h1>
                <div className="flex justify-between items-end">
                  <p className="font-header font-bold text-[42px] text-gray-800 leading-none">569</p>
                  <p className="text-sky-500  font-header flex gap-x-[10px]">
                    23%
                    <FontAwesomeIcon icon={faChartSimple} className="mt-[2px]"/>
                  </p>
                </div>
              </header>
            </div>

            <div className="w-full border-[1px] rounded-lg">
              <header className="p-[20px] space-y-[20px]">
                <h1 className=" text-gray-500">Failed Tasks</h1>
                <div className="flex justify-between items-end">
                  <p className="font-header font-bold text-[42px] text-gray-800 leading-none">102</p>
                  <p className="text-pink-500  font-header flex gap-x-[10px]">
                    23%
                    <FontAwesomeIcon icon={faChartSimple} className="mt-[2px]"/>
                  </p>
                </div>
              </header>
            </div>
          </div>
        </div>
        {/*  */}
        <h1 className="text-[28px] font-semibold text-gray-800 mb-[20px]">Employee Management</h1>
        <div className="grid grid-cols-3 gap-[20px] mb-[60px]">
          <div className="w-full border-[1px] rounded-lg">
            <header className="p-[20px] space-y-[20px]">
              <h1 className=" text-gray-500">Total employees</h1>
              <div className="flex justify-between items-end">
                <p className="font-header font-bold text-[42px] text-gray-800 leading-none">1,409</p>
                <p className="text-sky-400  font-header flex gap-x-[10px]">
                  23%
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                </p>
              </div>
            </header>
            <div className="bg-gray-700 rounded-b-lg p-[20px] text-white text-[15px]">
              13 applications need <br/> review
            </div>
          </div>

          <div className="w-full border-[1px] rounded-lg">
            <header className="p-[20px] space-y-[20px]">
              <h1 className=" text-gray-500">Total overtime</h1>
              <div className="flex justify-between items-end">
                <p className="font-header font-bold text-[42px] text-gray-800 leading-none">569</p>
                <p className="text-sky-400  font-header flex gap-x-[10px]">
                  23%
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                </p>
              </div>
            </header>
            <div className="bg-gray-700 rounded-b-lg p-[20px] text-white text-[15px]">
              13 applications need <br/> review
            </div>
          </div>

          <div className="w-full border-[1px] rounded-lg">
            <header className="p-[20px] space-y-[20px]">
              <h1 className=" text-gray-500">Total leave</h1>
              <div className="flex justify-between items-end">
                <p className="font-header font-bold text-[42px] text-gray-800 leading-none">102</p>
                <p className="text-pink-400  font-header flex gap-x-[10px]">
                  23%
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                </p>
              </div>
            </header>
            <div className="bg-gray-700 rounded-b-lg p-[20px] text-white text-[15px]">
              13 applications need <br/> review
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Admin;