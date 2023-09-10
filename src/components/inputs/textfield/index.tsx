import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { faCircleCheck, faCircleExclamation, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface TextProps {
  text: string,
  icon?: string,
  lefticon?: string,
  className?: string,
}

export default function TextField({text, icon ='', lefticon = "", className}: TextProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValidity, setInputValidity] = useState(null);

  const inputCss = `w-full border-[1px] outline-none rounded-lg px-[10px] py-[10px] font-secondary text-[15px] ${lefticon ? 'pl-[40px]' :'pr-[40px]'}`

  const toggleVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const clearField = () => {}

  const iconCss = (icon: string) => {
    switch(icon) {
      case "eye": return (
        <div onClick={toggleVisibility} className="cursor-pointer">
          {
            showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} size="lg" style={{color: "rgb(156 163 175)",}} bounce/>
            ) : (
              <FontAwesomeIcon icon={faEye} size="lg" style={{color: "rgb(156 163 175)",}} />
            )
          }
        </div>
      )
      case "failed": return (
        <div onClick={clearField}>
          <FontAwesomeIcon icon={faCircleExclamation} size="lg" style={{color: "rgb(244 63 94)",}}/>
        </div>
      )
      case "success": return (
        <div onClick={clearField}>
          <FontAwesomeIcon icon={faCircleCheck} size="lg" style={{color: "rgb(34 197 94)",}}/>
        </div>
      )
      case "search": return <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" style={{color: "rgb(156 163 175)",}}/>
      default: return ""
    }
  }

  return (
    <div className="relative">
      <input 
        type='text' 
        placeholder={text} 
        className={`${inputCss} ${className}`}
      />
      {
        !inputValidity && inputValidity != null && (
          <div className="text-left text-[12px] text-rose-500 font-medium font-header pt-[6px] ml-[4px]">Email cannot be blank</div>
        )
      }
      <div className="absolute top-[22%] left-[10px]">{iconCss(lefticon)}</div>
      <div className="absolute top-[20%] right-[10px]">{iconCss(inputValidity != null ? (inputValidity ? 'success' : 'failed') : icon)}</div>
    </div>
  )
}