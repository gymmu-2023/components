import React, { useRef, useEffect, useCallback, useState } from "react"
import MonacoEditor from "react-monaco-editor"

export default function NotebookCell() {
  const [script, setScript] = useState("const ball = { x: 100, y: 100 }")

  const canvasRef = useRef(null)
  const editorRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    const ball = { x: 100, y: 100, radius: 10 }

    // Additional canvas setup and drawing code can go here
    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
    context.fillStyle = "white"
    context.fill()
    context.closePath()
  }, [canvasRef.current])

  const handlePlayClick = () => {
    // Logic to handle play button click
    //eval(script)

    console.log("execute script")

    eval(`

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    console.log(canvas, context)

    ${script}

    console.log(ball)

    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI)
    context.fillStyle = "white"
    context.fill()
    context.closePath()

    console.log("execute script done")

    `)

    console.log(ball)
  }

  const handleEditorChange = (value) => {
    setScript(value)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <MonacoEditor
        ref={editorRef}
        language="javascript"
        value={script}
        height="300"
        theme="vs-dark"
        onChange={handleEditorChange}
      />

      <button onClick={() => handlePlayClick()}>Play</button>
      <canvas
        ref={canvasRef}
        width="300px"
        height="300px"
        style={{ border: "1px solid black" }}></canvas>
    </div>
  )
}
