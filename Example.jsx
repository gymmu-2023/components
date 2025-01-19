import "./components.css"

export default function Example({
  children,
  title = "Beispiel",
  classes = "",
}) {
  return (
    <div className={`highlight ${classes}`}>
      <h3>{`${title}`}</h3>
      {children}
    </div>
  )
}
