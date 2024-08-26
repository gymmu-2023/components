import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"

import "./components.css"

export default function Fiddle({ html, css }) {
  const [HTMLSource, setHTMLSource] = useState(html || "")
  const [CSSSource, setCSSSource] = useState(css || "")
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
            <Editor
              theme="vs-dark"
              height="300px"
              defaultLanguage="html"
              defaultValue={HTMLSource}
              onChange={handleHTMLChange}
            />
          </div>
          <div>
            <h5 className="sm">CSS</h5>
            <Editor
              theme="vs-dark"
              height="300px"
              defaultLanguage="css"
              defaultValue={CSSSource}
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
