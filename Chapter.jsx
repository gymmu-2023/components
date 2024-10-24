import { useEffect } from "react"
import Prism from "./prism"
import "./prism.css"

export default function Chapter({ children, hash }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return <div className="outlet">{children}</div>
}
