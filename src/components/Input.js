
export default function Input(props) {
  return (
    <div className={props?.divClassName}>
        <input name={props?.name} value={props?.value} type={props?.type} onChange={props?.onChange} className={props?.inputClassName} placeholder={props?.placeholder} />
    </div>
  )
}
