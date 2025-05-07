import React from "react"

const URLComponent = ({ url }) => {
  const urlObj = new URL(url)

  const parts = [
    {
      label: "Protocol",
      value: urlObj.protocol.replace(":", ""),
      separator: "://",
    },
    { label: "Username", value: urlObj.username, separator: ":" },
    { label: "Password", value: urlObj.password, separator: "@" },
    {
      label: "Host",
      value: urlObj.hostname,
      separator: urlObj.port ? ":" : "/",
    },
    { label: "Port", value: urlObj.port, separator: "/" },
    {
      label: "Pathname",
      value: urlObj.pathname.replace("/", ""),
      separator: "",
    },
    { label: "Search", value: urlObj.search, separator: "" },
    { label: "Hash", value: urlObj.hash, separator: "" },
  ]

  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "teal",
    "magenta",
    "brown",
    "cyan",
    "lime",
  ]
  return (
    <div
      style={{
        display: "flex",
        gap: "0",
        width: "100%",
        fontSize: "1.5rem",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <span
            style={{
              position: "relative",
              cursor: "pointer",
              color: colors[index],
              transition: "font-weight 0.2s",
              display: "inline-block",
              width: "max-content",
              minWidth: "max-content",
            }}
            onMouseEnter={(e) => {
              e.target.style.fontWeight = "bold"
              e.target.style.fontSize = "1.7rem"
              const tooltip = document.createElement("div")
              tooltip.textContent = part.label
              tooltip.style.position = "absolute"
              tooltip.style.backgroundColor = "black"
              tooltip.style.color = "white"
              tooltip.style.padding = "5px"
              tooltip.style.borderRadius = "3px"
              tooltip.style.top = "30px"
              tooltip.style.left = "50%"
              tooltip.style.transform = "translateX(-50%)"
              tooltip.style.zIndex = "1000"
              e.target.appendChild(tooltip)
            }}
            onMouseLeave={(e) => {
              e.target.style.fontWeight = "normal"
              e.target.style.fontSize = "1.5rem"
              const tooltip = e.target.querySelector("div")
              if (tooltip) {
                e.target.removeChild(tooltip)
              }
            }}>
            {part.value}
          </span>
          {index < parts.length - 1 && part.value && (
            <span style={{ color: "white", userSelect: "none" }}>
              {part.separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default URLComponent
