import { useEffect, useState } from "react"

export default function ServerClientDiagram() {
  const [packetPos, setPacketPos] = useState(0) // 0 to 1, progress along path
  const [highlight, setHighlight] = useState(null) // "server", "client", or null
  const [packetY, setPacketY] = useState(60)

  useEffect(() => {
    let animationFrame
    let startTime

    function animate(time) {
      if (!startTime) startTime = time
      const elapsed = time - startTime

      // Total cycle: 10s wait + 2s server highlight + 10s wait + 2s client highlight + repeat
      const cycleDuration = 24000
      const t = elapsed % cycleDuration

      if (t < 1000) {
        // Packet moves from client to server (0 to 1)
        setPacketPos(t / 1000)
        setHighlight(null)
        setPacketY(60)
      } else if (t < 3000) {
        // Highlight server
        setPacketPos(1)
        setHighlight("server")
        setPacketY(60)
      } else if (t < 4000) {
        // Packet moves from server to client (1 to 0)
        setPacketPos(1 - (t - 3000) / 1000)
        setHighlight(null)
        setPacketY(80)
      } else if (t < 6000) {
        // Highlight client
        setPacketPos(0)
        setHighlight("client")
        setPacketY(80)
      } else {
        // Wait before next cycle
        setPacketPos(0)
        setHighlight(null)
        setPacketY(60)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  // Calculate packet position coordinates along the request/response path
  // Request line: from (120,70) to (220,70)
  // Response line: from (220,90) to (120,90)
  // Packet moves along these lines forward and backward

  // For simplicity, packet moves horizontally between x=120 and x=220
  const packetX = 120 + (220 - 120) * packetPos

  // Highlight styles
  const serverHighlight =
    highlight === "server" ? { filter: "drop-shadow(0 0 6px #50E3C2)" } : {}
  const clientHighlight =
    highlight === "client" ? { filter: "drop-shadow(0 0 6px #4A90E2)" } : {}

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
      <svg
        width="320"
        height="180"
        viewBox="0 0 320 180"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Server Client Model Diagram">
        <g style={clientHighlight}>
          {/* Laptop base */}
          <rect
            x="20"
            y="90"
            width="100"
            height="30"
            fill="#4A90E2"
            rx="8"
            ry="8"
          />
          {/* Laptop keyboard */}
          <rect
            x="25"
            y="95"
            width="90"
            height="20"
            fill="#2C6CC4"
            rx="4"
            ry="4"
          />
          {/* Laptop screen */}
          <rect
            x="30"
            y="40"
            width="80"
            height="50"
            fill="#2C6CC4"
            rx="6"
            ry="6"
          />
          <text
            x="70"
            y="30"
            fill="white"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Arial"
            textAnchor="middle"
            alignmentBaseline="middle">
            Client
          </text>
        </g>
        <g style={serverHighlight}>
          {/* Server tower base */}
          <rect
            x="220"
            y="40"
            width="60"
            height="80"
            fill="#50E3C2"
            rx="8"
            ry="8"
          />
          {/* Server tower details */}
          <rect
            x="230"
            y="50"
            width="40"
            height="10"
            fill="#3CBFAE"
            rx="2"
            ry="2"
          />
          <rect
            x="230"
            y="65"
            width="40"
            height="10"
            fill="#3CBFAE"
            rx="2"
            ry="2"
          />
          <rect
            x="230"
            y="80"
            width="40"
            height="10"
            fill="#3CBFAE"
            rx="2"
            ry="2"
          />
          <text
            x="250"
            y="30"
            fill="white"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Arial"
            textAnchor="middle"
            alignmentBaseline="middle">
            Server
          </text>
        </g>
        {/* Packet */}
        <rect
          x={packetX - 10}
          y={packetY}
          width="20"
          height="20"
          fill="#FF6F61"
          rx="4"
          ry="4"
        />
        <line
          x1="120"
          y1="70"
          x2="220"
          y2="70"
          stroke="#999"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="170"
          y="55"
          fill="#999"
          fontSize="14"
          fontFamily="Arial"
          textAnchor="middle">
          Request
        </text>
        <line
          x1="220"
          y1="90"
          x2="120"
          y2="90"
          stroke="#999"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="170"
          y="110"
          fill="#999"
          fontSize="14"
          fontFamily="Arial"
          textAnchor="middle">
          Response
        </text>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
