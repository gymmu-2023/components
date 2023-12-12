import { useEffect, useRef } from "react"
import Reveal from "reveal.js"
import "reveal.js/dist/reveal.css"
import "reveal.js/dist/theme/night.css"

export function Slide({ children }) {
  return <section>{children}</section>
}
export function Fragment({ children }) {
  return <p className="fragment">{children}</p>
}
export function Basement({ children }) {
  return <section>{children}</section>
}

export default function Presentation({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const deck = new Reveal(ref.current, {
      embedded: true,
      plugins: [],
    })
    deck.initialize()
  }, [])
  return (
    <>
      <div
        ref={ref}
        className="reveal"
        style={{
          height: "50vh",
        }}>
        <div className="slides">{children}</div>
      </div>
    </>
  )
}
