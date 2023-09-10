import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faCircleNotch, faRotate, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ButtonProps {
  text: string,
  type?: string,
  icon?: string,
  loading?: boolean,
  onClick?(): void;
}

export default function Button({text, type = 'full', icon = '', loading = false, onClick}: ButtonProps) {
  const typeCss = {
    full: 'bg-blue-600 text-white',
    outline: 'bg-transparent text-black border-[1px]'
  }
  const buttonCss = `
  w-full flex justify-center px-[10px] py-[10px] rounded-lg font-medium font-header
  ${typeCss[type as keyof typeof typeCss] ?? ''}
  `
  const iconCss = () => {
    switch(icon) {
      case "google": return <FontAwesomeIcon icon={faGoogle} />
      default: return ""
    }
  }

  return (
    <button type="button" className={buttonCss} onClick={onClick}>
      <span className="mr-[10px]">
        {iconCss()}
      </span>
      {text}
      <div className="ml-[10px] animate-spin">
        {
          loading && (
            <FontAwesomeIcon icon={faRotate} />
          )
        }
      </div>
      </button>
  )
}