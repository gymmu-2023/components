import React, { useRef, useEffect } from "react"
import * as monaco from "monaco-editor"

export default function Monaco({ children, language }) {
  const editorRef = useRef(null)

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: children,
      language: language,
      theme: "vs-dark",
      automaticLayout: true,
    })

    return () => editor.dispose()
  }, [])

  return (
    <>
      <div ref={editorRef} style={{ height: "300px", width: "100%" }} />
    </>
  )
}
