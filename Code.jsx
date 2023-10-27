import {renderToString} from "react-dom/server"
import "./components.css"

import hljs from "highlight.js"
import { useEffect, useRef } from "react"

export default function Code({children}) {

  const code = useRef(null)
  useEffect(() => {
    console.log(code.current)
    hljs.highlightElement(code.current)

  }, [])
  
  return (
      <pre>
        <code ref={code} className="language-html">
          {renderToString(children)}
        </code>
      </pre>
  )
}