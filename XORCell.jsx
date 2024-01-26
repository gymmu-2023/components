import React, { useRef, useEffect, useState } from "react"
import MonacoEditor from "react-monaco-editor"
import { hexy } from "hexy"

function strToBin(str) {
    return str.split("").map((char) => {
        const tmp = char.charCodeAt(0).toString(2)
        let padding = ""
        for( let i=0; i < 8-tmp.length; i++) {
            padding += "0"
        }
        return padding + tmp
    }).join(" ")
}

export default function XORCell() {
    const [input, setInput] = useState("abc")
    const [inputBin, setInputBin] = useState(strToBin(input))
    const [key, setKey] = useState("key")
    const [keyBin, setKeyBin] = useState(strToBin(key))

    const [output, setOutput] = useState("")
    const [outputBin, setOutputBin] = useState(strToBin(output))


    const handleInputChange = ({ target }) => {
        const bin = strToBin(target.value)
        setInputBin((_) => {
            calculate(bin, keyBin)
            setInput(target.value)
            return bin
        })
    }

    const handleKeyChange = ({ target }) => {
        const bin = strToBin(target.value)
        setKeyBin((_) => {
            calculate(inputBin, bin)
            setKey(target.value)
            return bin
        })
    }

    const calculate = (inputBin, keyBin) => {
        const inp = parseInt(inputBin.replace(/ /, ""), 2)
        const key = parseInt(keyBin.replace(/ /, ""), 2)
        console.log(inp.toString(2), key.toString(2))
        const xor = (inp ^ key).toString(2)
        const lenDiff = input.length - xor.length
        let padding = ""
        for (let i = 0; i < lenDiff; i++) {
            padding += "0"
        }
        const arr = padding + xor
        const res = []
        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && i % 8 === 0) {
                res.push(" ")
            }
            res.push(arr[i])
        }
        setOutputBin(res.join(""))
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "1em"
                }}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    style={{
                        border: "1px solid black",
                        width: "20em",
                        height: "2em",
                        marginRight: "1em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}
                />

                <pre
                    style={{
                        border: "1px solid black",
                        width: "30em",
                        height: "2em",
                        marginRight: "1em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}>
                    {inputBin}
                </pre>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "1em"
                }}>
                <input
                    type="text"
                    value={key}
                    onChange={handleKeyChange}
                    style={{
                        border: "1px solid black",
                        width: "20em",
                        height: "2em",
                        marginRight: "1em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}
                />

                <pre
                    style={{
                        border: "1px solid black",
                        width: "30em",
                        height: "2em",
                        marginRight: "1em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}>
                    {keyBin}
                </pre>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "1em"
                }}>
                <input
                    type="text"
                    value={output}
                    style={{
                        border: "1px solid black",
                        width: "20em",
                        height: "2em",
                        marginRight: "1em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}
                />

                <pre
                    style={{
                        border: "1px solid black",
                        width: "30em",
                        height: "2em",
                        marginRight: "1em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}>
                    {outputBin}
                </pre>
            </div>


        </div>
    )
}
