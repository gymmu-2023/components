import { useState, useEffect } from "react"
import MonacoEditor from "react-monaco-editor"

import "./components.css"

export default function Fiddle({ fiddleType }) {
  const [HTMLSource, setHTMLSource] = useState("<h1>Some Title</h1>")
  const [CSSSource, setCSSSource] = useState("")
  const [source, setSource] = useState("")

  useEffect(() => {
    setSource(`<style>${CSSSource}</style>${HTMLSource}`)
  }, [CSSSource, HTMLSource])

  const handleHTMLChange = (e) => {
    setHTMLSource(e)
  }

  const handleCSSChange = (e) => {
    setCSSSource(e)
  }

  return (
    <>
      <div className="fiddleContainer">
        <div>
          <div>
            <h5 className="sm">HTML</h5>
            <MonacoEditor
              theme="vs-dark"
              height="300px"
              value={HTMLSource}
              onChange={handleHTMLChange}
            />
          </div>
          <div>
            <h5 className="sm">CSS</h5>
            <MonacoEditor
              theme="vs-dark"
              height="300px"
              value={CSSSource}
              onChange={handleCSSChange}
            />
          </div>
        </div>
        <div className="output">
          <h5 className="sm">Webseite</h5>
          <div
            className="renderOutput"
            dangerouslySetInnerHTML={{ __html: source }}></div>
        </div>
      </div>
    </>
  )
}
