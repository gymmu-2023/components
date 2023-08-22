import {renderToString} from "react-dom/server"
import "./components.css"
export default function LCode({content}) {
  
  return (
      <pre style={{
        whiteSpace: 'pre-wrap'
      }}>
    <code>
        {content}
    </code>
      </pre>
  )
}