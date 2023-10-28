import {renderToString} from "react-dom/server"
import "./components.css"

import hljs from "highlight.js"
import { useEffect, useRef } from "react"

export default function Code({content, language}) {

  const code = useRef(null)
  useEffect(() => {
    hljs.highlightElement(code.current)
  }, [])
  
  return (
      <pre>
        <code ref={code} className={`language-${language}`}>
          {content}
        </code>
      </pre>
  )
}