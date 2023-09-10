
interface ButtonProps {
  text: string,
  type?: string,
}

export default function Button({text, type = 'full'}: ButtonProps) {
  const typeCss = {
    full: 'bg-blue-600 text-white',
    outline: 'bg-transparent text-black border-[1px]'
  }
  const buttonCss = `
  w-full px-[10px] py-[10px] rounded-lg font-medium font-header
  ${typeCss[type as keyof typeof typeCss] ?? ''}
  `
  return (
    <button className={buttonCss}>{text}</button>
  )
}