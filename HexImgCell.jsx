import React, { useRef, useEffect, useState } from "react"
import MonacoEditor from "react-monaco-editor"
import { hexy } from "hexy"

export default function HexImgCell() {
    const [hex, setHex] = useState("FF 00 00 FF")

    const outputRef = useRef(null)

    useEffect(() => {
        handleEditorChange(hex)
    }, [hex])

    const handleEditorChange = (value) => {

        const ctx = outputRef.current.getContext("2d")
        const filterValue = value.split("").filter(c => {
            const ascii = c.toUpperCase().charCodeAt(0)
            if ( ascii >= 48 && ascii <= 57) {
                return true
            } else if ( ascii >= 65 && ascii <= 70) {
                return true
            }
            return false
        })

        const filterStr = filterValue.map((c, i) => {
            if (i % 2 === 1) {
                return c.toUpperCase() + " "
            }
            return c.toUpperCase()
        }).join("")

        if (value.length === 0) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            return
        }

        const hexArr = filterStr.split(" ").filter(c => c !== "")


        // Die Anzahl der Pixel die dargestellt werden können
        const numPixels = Math.ceil(hexArr.length / 4)

        const buffer = new Array(numPixels * 4).fill(255)
        for (let i = 0; i < value.length; i++) {
            const num = parseInt(hexArr[i], 16) 
            buffer[i] = isNaN(num) ? 255 : num
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
        setHex( (_) => filterStr)
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
