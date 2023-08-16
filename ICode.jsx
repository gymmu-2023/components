import {renderToString} from "react-dom/server"
export default function ICode({children}) {
  
  return (
      <pre>{renderToString(children, {strict: false})}</pre>
  )
}