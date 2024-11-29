import { useState } from "react"

export default function LoopSimulator() {
  const [input, setInput] = useState("Einfach nur Text...")
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState(applyInputFilter(input))

  const updateIndex = (val) => {
    setIndex((old) => {
      const newValue = old + val
      if (newValue < 0) {
        //setResult(input.slice(0, 1))
        return 0
      } else if (newValue >= input.length) {
        //setResult(input.slice(0, input.length))
        return input.length - 1
      }
      //setResult(input.slice(0, newValue + 1))
      return newValue
    })
  }

  const isActive = (i) => {
    if (i === index) {
      return "active-letter"
    } else {
      return ""
    }
  }

  function applyInputFilter(input) {
    const list = input.split("")
    const filtered = list.map((val) => {
      if (val !== "a") return val
      else return "A"
    })
    return filtered.join("")
  }

  const updateInput = ({ target }) => {
    setInput(target.value)
    setResult(applyInputFilter(target.value))
  }

  return (
    <div className="letter-simulator-wrapper">
      <div className="letter-input-wrapper">
        <label htmlFor="letter-input">Eingabe:</label>
        <input
          type="text"
          id="letter-input"
          value={input}
          onChange={updateInput}
        />
      </div>
      <div className="letter-wrapper">
        Input:
        {input.split("").map((value, index) => (
          <div className="letter-with-index-wrapper" key={index}>
            <span className={`for-letter ${isActive(index)}`}>{value}</span>
            <span>i={index}</span>
          </div>
        ))}
      </div>
      <div className="letter-control-panel">
        <button onClick={() => updateIndex(-1)}>Previous</button>
        <span>i = {index} </span>
        <button onClick={() => updateIndex(1)}>Next</button>
      </div>
      <div className="letter-wrapper">
        Result:
        {result
          .split("")
          .slice(0, index + 1)
          .map((value, index) => (
            <span className={`for-letter ${isActive(index)}`} key={index}>
              {value}
            </span>
          ))}
      </div>
    </div>
  )
}
