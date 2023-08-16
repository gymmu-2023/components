import {renderToString} from "react-dom/server"
import "./components.css"
export default function ICode({children}) {
  
  return (
      <pre>{renderToString(children, {strict: false})}</pre>
  )
}