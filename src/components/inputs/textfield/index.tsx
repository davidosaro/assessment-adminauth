
interface TextProps {
  text: string,
}

export default function TextField({text}: TextProps) {
  const inputCss = 'w-full border-[1px] outline-none rounded-lg px-[10px] py-[10px] font-secondary'
  return (
    <input 
      type='text' 
      placeholder={text} 
      className={inputCss}
    />
  )
}