import { IconDefinition, faAngleDown, faArrowRightFromBracket, faCalendarCheck, faCircleUser, faHouseCircleCheck, faM, faPeoplePulling, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [active, setActive] = useState('Dashboard');
  const activeColor = {color: "rgb(59 130 246)"};
  const activeNotColor = {color: "rgb(156 163 175)"};
  const borderActive = 'px-[20px] py-[10px] border-r-primary-100 border-r-[3px] cursor-pointer';
  const borderNotActive = 'px-[20px] py-[10px] cursor-pointer'
  const textActive = 'flex gap-x-[20px] font-medium items-center font-header text-primary-100'
  const textNotActive = 'flex gap-x-[20px] items-center font-header text-grey-400';

  const iconClass = 'w-[40px]';
  const routes = ['Dashboard', 'Employees', 'Tasks']
  const icons = (route: string) => {
    switch(route) {
      case "Dashboard": return faHouseCircleCheck;
      case "Employees": return faPeoplePulling;
      case "Tasks": return faCalendarCheck;
    }
  }
  return (
    <aside className="fixed top-0 left-0 w-[220px] bg-gray-50 h-full py-[40px] space-y-[80px]">
      <header className="px-[20px]">
        <strong className='font-semibold text-[22px] leading-none flex items-center'>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" 
          className="rounded-full w-[40px] mr-[10px]" 
          alt="Profile.png"/>
          David
        <FontAwesomeIcon icon={faAngleDown} size="xs" className="translate-y-[1px] ml-[10px]"/>
        </strong>
      </header>
      <div className="space-y-[30px]">
        {
          routes.map((route) => (
            <ul className={active == route ? borderActive : borderNotActive} onClick={()=> setActive(route)}>
              <li className={active == route ? textActive : textNotActive}>
                
                <FontAwesomeIcon icon={icons(route) as IconDefinition} style={active == route ? activeColor: activeNotColor} size="xl" className={iconClass}/>
                <Link to={`/admin/${route.toLowerCase()}`} relative="path">{route}</Link>
              </li>
            </ul>
          ))
        }
      {/* sign out button */}
        <ul className={`${borderNotActive} pt-[200px]`}>
          <li className={textNotActive}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} style={activeNotColor} size="2xl" className={iconClass}/>
            <Link to="/">Log out</Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}