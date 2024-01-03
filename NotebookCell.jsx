import React, { useRef, useEffect, useState } from "react"
import MonacoEditor from "react-monaco-editor"

export default function NotebookCell() {
  const [objects, setObjects] = useState({
    ball: {
      x: 100,
      y: 100,
      radius: 10,
      dx: 5,
      dy: 5,
    },
  })
  const [script, setScript] = useState(JSON.stringify(objects, null, 2))

  const canvasRef = useRef(null)
  const requestRef = useRef(null)

  const update = () => {
    Object.entries(objects).forEach(([key, entry]) => {
      entry.x += entry.dx
      entry.y += entry.dy

      if (entry.x + entry.radius > canvasRef.current.width) {
        entry.x = canvasRef.current.width - entry.radius
        entry.dx = -entry.dx
      }

      if (entry.x - entry.radius < 0) {
        entry.x = entry.radius
        entry.dx = -entry.dx
      }

      if (entry.y + entry.radius > canvasRef.current.height) {
        entry.y = canvasRef.current.height - entry.radius
        entry.dy = -entry.dy
      }

      if (entry.y - entry.radius < 0) {
        entry.y = entry.radius
        entry.dy = -entry.dy
      }
    })
    setObjects((old) => old)
  }

  const animationLoop = () => {
    update()
    draw()
    requestRef.current = requestAnimationFrame(animationLoop)
  }

  const draw = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)

    Object.entries(objects).forEach(([key, entry]) => {
      context.beginPath()
      context.arc(entry.x, entry.y, entry.radius || 10, 0, 2 * Math.PI)
      context.fillStyle = entry.color || "white"
      context.fill()
      context.closePath()
    })
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationLoop)
    return () => cancelAnimationFrame(requestRef.current)
  }, [canvasRef.current])

  const handlePlayClick = () => {
    cancelAnimationFrame(requestRef.current)

    setObjects((_) => {
      return JSON.parse(script)
    })

    requestRef.current = requestAnimationFrame(animationLoop)
  }

  const handleEditorChange = (value) => {
    setScript((_) => value)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <MonacoEditor
        language="javascript"
        value={script}
        height="300"
        theme="vs-dark"
        onChange={handleEditorChange}
        automaticLayout={true}
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
