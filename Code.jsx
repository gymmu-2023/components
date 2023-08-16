import {renderToString} from "react-dom/server"
import "./components.css"
export default function Code({children}) {
  
  return (
    <code>
      <pre style={{
        whiteSpace: 'pre-line'
      }}>
        {renderToString(children)}
      </pre>
    </code>
  )
}