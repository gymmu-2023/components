import "./components.css"

export default function Example({
  children,
  title = "Beispiel",
  classes = "",
  id = "",
}) {
  return (
    <div className={`highlight ${classes}`}>
      <h3 id={id}>{`${title}`}</h3>
      {children}
    </div>
  )
}
