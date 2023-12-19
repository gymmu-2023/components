import katex from "katex"
import { useEffect, useRef } from "react"
import "katex/dist/katex.css"

export default function Math({ children }) {
  const katexElement = useRef(null)

  useEffect(() => {
    katex.render(children, katexElement.current, {
      throwOnError: false,
    })
  }, [katexElement])
  return <span ref={katexElement}>{children}</span>
}

export function DisplayMath({ children }) {
  const katexElement = useRef(null)

  useEffect(() => {
    console.log(children)
    katex.render(children, katexElement.current, {
      displayMode: true,
      throwOnError: false,
    })
  }, [katexElement])

  return (
    <div ref={katexElement} style={{ textAlign: "center" }}>
      {children}
    </div>
  )
}
