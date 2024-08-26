import { useState } from "react"
import Editor from "@monaco-editor/react"

import "./components.css"

export default function FiddleSVG({ svg }) {
  const [source, setSource] = useState(svg || "")

  const handleSVGChange = (e) => {
    setSource(e)
  }

  return (
    <>
      <div className="fiddleContainer">
        <div>
          <div>
            <h5 className="sm">SVG</h5>
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              defaultLanguage="xml"
              theme="vs-dark"
              height="300px"
              automaticLayout="true"
              defaultValue={source}
              onChange={handleSVGChange}
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
