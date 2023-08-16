import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import "./components.css"

export default function Example({children, title = "Beispiel"}) {

  const elem = useRef(null)
  const [index, setIndex] = useState(1)

  useEffect(() => {
    document.querySelectorAll(".example").forEach((item, i) => {
      if (item === elem.current) setIndex(i+1)
    })
  }, [])

  return (
    <div className="example" ref={elem}>
      <h3>{`${index}. ${title}`}</h3>
      {children}
    </div>
  )
}