import { useEffect, useState } from "react"

function padWithZeros(bin) {
    let padding = ""
    for (let i = 0; i < 8 - bin.length; i++) {
        padding += "0"
    }
    return padding + bin
}

function strToBin(str) {
    return str.split("").map((char) => {
        const tmp = char.charCodeAt(0).toString(2)
        return padWithZeros(tmp)
    }).join(" ")
}

export default function XORCell() {
    const [input, setInput] = useState("abc")
    const [inputBin, setInputBin] = useState(strToBin(input))
    const [key, setKey] = useState("012")
    const [keyBin, setKeyBin] = useState(strToBin(key))

    const [output, setOutput] = useState("")
    const [outputBin, setOutputBin] = useState(strToBin(output))

    useEffect(() => {
        calculate(inputBin, keyBin)
    }, [])


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
        const inArr = inputBin.split(" ")
        const keyArr = keyBin.split(" ")
        const outArr = inArr.map((x, i) => {
            if (i < keyArr.length) {
                let xor = parseInt(x, 2) ^ parseInt(keyArr[i], 2)
                xor = xor.toString(2)
                return padWithZeros(xor)
            }
        })
        setOutputBin(outArr.join(" "))
        setOutput(binToStr(outArr.join(" ")))
    }

    const binToStr = (bin) => {
        const arr = bin.split(" ")
        const res = arr.map((x) => {
            const ascii = parseInt(x, 2)
            const char = String.fromCharCode(ascii)
            return char
        })
        return res.join("")

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
                    disabled={true}
                    onChange={() => { }}
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
