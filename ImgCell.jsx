import React, { useRef, useEffect, useState } from "react"
import MonacoEditor from "react-monaco-editor"
import { hexy } from "hexy"

export default function ImgCell() {
    const [hex, setHex] = useState(" ° °   °°°°°AaA°")
    const outputRef = useRef(null)

    useEffect(() => {
        handleEditorChange(hex)
    }, [hex])

    const handleEditorChange = (value) => {

        const ctx = outputRef.current.getContext("2d")

        if (value.length === 0) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            return
        }


        // Die Anzahl der Pixel die dargestellt werden können
        const numPixels = Math.ceil(value.length / 4)

        const buffer = new Array(numPixels * 4).fill(0)
        for (let i = 3; i < buffer.length; i+=4) {
            buffer[i] = 255
        }
        for (let i = 0; i < value.length; i++) {
            buffer[i] = value.charCodeAt(i)
        }

        // Berechne aus der Länge der Eingabe, wie gross das Bild sein wird
        const width = Math.ceil(Math.sqrt(numPixels))

        outputRef.current.width = width
        outputRef.current.height = width

        const myImageData = ctx.createImageData(width, width);
        const data = myImageData.data

        // TODO: Jedes zeichen steht für einen Farbwert pro Pixel und
        // farbkanal. ich kann also mein Bild als Text ausdrücken.
        // Iteriere über die Anzahl an Zeichen, und erstelle damit ein Bild
        for (let i = 0; i < buffer.length; i++) {
            data[i] = buffer[i]
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.putImageData(myImageData, 0, 0)
        setHex(value)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {/* Controlpanel */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem"
            }}>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "1em"
                }}>
                <MonacoEditor
                    language="json"
                    value={hex}
                    height="300px"
                    theme="vs-dark"
                    onChange={handleEditorChange}
                // automaticLayout={true}
                />

                <canvas
                    ref={outputRef}
                    style={{
                        border: "1px solid black",
                        width: "200px",
                        height: "200px",
                        imageRendering: "pixelated"
                        
                        
                    }}>
                </canvas>
            </div>
        </div>
    )
}
