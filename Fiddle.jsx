import { useState, useRef } from "react"
import MonacoEditor from "react-monaco-editor"

import "./components.css"

export default function Fiddle({ fiddleType }) {
  const [type, setType] = useState(fiddleType)
  const [source, setSource] = useState("")
  const outputRef = useRef(null)

  const handleCodeChange = (e) => {
    console.log(e)
    setSource(e)
    if (outputRef) {
      //outputRef.current.textContent = e
    }
  }

  return (
    <>
      <div className="fiddleContainer">
        <MonacoEditor
          height="300px"
          value={source}
          onChange={handleCodeChange}
        />
        <div className="output" ref={outputRef}>
          {source}
        </div>
      </div>
    </>
  )
}
