import "./components.css"
export default function Tag({children}) {
  
  return (
      <pre>{`<${children}>`}</pre>
  )
}