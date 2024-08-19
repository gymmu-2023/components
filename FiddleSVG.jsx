import { useState } from "react"
import MonacoEditor from "react-monaco-editor"

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
            <MonacoEditor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              language="xml"
              theme="vs-dark"
              height="300px"
              value={source}
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
