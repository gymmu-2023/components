import React from "react"

export default function NetworkDiagram() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
      <svg
        width="600"
        height="400"
        viewBox="0 0 600 400"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Network Diagram with Internet Cloud, Routers, Servers, Modems, and Clients">
        {/* Cloud representing the Internet */}
        <g id="internet-cloud" transform="translate(90, 100)">
          <path
            d="M10 80
               Q5 60 30 40
               Q60 20 110 20
               Q160 10 210 20
               Q260 10 310 40
               Q360 50 390 80
               Q420 110 410 140
               Q400 170 350 180
               Q300 190 250 180
               Q200 190 150 180
               Q100 190 60 170
               Q20 160 15 130
               Q10 110 10 80Z"
            fill="#a0c4ff"
            stroke="#457b9d"
            strokeWidth="3"
          />
        </g>
        <text
          x="280"
          y="80"
          fontSize="24"
          fontWeight="bold"
          fontFamily="Arial"
          fill="#3d6587"
          textAnchor="middle"
          alignmentBaseline="middle">
          Internet
        </text>
        {/* Connection from Client 1 to Modem 1 */}
        <line
          x1={150 + 25}
          y1={310 + 15}
          x2={40 + 170 + 20}
          y2={20 + 270 + 15}
          stroke="#2c6cc4"
          strokeWidth="2"
        />
        {/* Added connections from servers to closest routers */}
        {/* School Network Server to Router 3 */}
        <line
          x1={50 + 20}
          y1={50 + 30}
          x2={200 + 80}
          y2={120 + 40}
          stroke="#264653"
          strokeWidth="2"
        />
        {/* Github Server to Router 2 */}
        <line
          x1={470 + 20}
          y1={50 + 30}
          x2={200 + 120}
          y2={120 + 80}
          stroke="#4a3f6f"
          strokeWidth="2"
        />
        {/* Google Server to Router 3 */}
        <line
          x1={50 + 20}
          y1={280 + 30}
          x2={200 + 40}
          y2={120 + 80}
          stroke="#d4b93f"
          strokeWidth="2"
        />
        {/* DNS Server to Router 2 */}
        <line
          x1={470 + 20}
          y1={280 + 30}
          x2={200 + 120}
          y2={120 + 80}
          stroke="#b04a3a"
          strokeWidth="2"
        />
        {/* Routers inside the cloud */}
        <g id="routers" transform="translate(200, 120)">
          {/* Connections between routers */}
          {/* Added connections between all routers */}
          <line
            x1={80}
            y1={40}
            x2={120}
            y2={80}
            stroke="#e76f51"
            strokeWidth="2"
          />
          <line
            x1={80}
            y1={40}
            x2={40}
            y2={80}
            stroke="#e76f51"
            strokeWidth="2"
          />
          <line
            x1={120}
            y1={80}
            x2={40}
            y2={80}
            stroke="#e76f51"
            strokeWidth="2"
          />
          {/* Router 1 */}
          <circle
            cx="80"
            cy="40"
            r="15"
            fill="#f4a261"
            stroke="#e76f51"
            strokeWidth="2"
          />
          <text
            x="80"
            y="40"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
            fill="#000"
            textAnchor="middle"
            alignmentBaseline="middle">
            R1
          </text>

          {/* Router 2 */}
          <circle
            cx="120"
            cy="80"
            r="15"
            fill="#f4a261"
            stroke="#e76f51"
            strokeWidth="2"
          />
          <text
            x="120"
            y="80"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
            fill="#000"
            textAnchor="middle"
            alignmentBaseline="middle">
            R2
          </text>

          {/* Router 3 */}
          <circle
            cx="40"
            cy="80"
            r="15"
            fill="#f4a261"
            stroke="#e76f51"
            strokeWidth="2"
          />
          <text
            x="40"
            y="80"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
            fill="#000"
            textAnchor="middle"
            alignmentBaseline="middle">
            R3
          </text>
        </g>
        {/* Servers outside the cloud */}
        {/* School Network Server */}
        <g id="school-server" transform="translate(50, 50)">
          <rect
            x="0"
            y="0"
            width="40"
            height="60"
            fill="#2a9d8f"
            stroke="#264653"
            strokeWidth="2"
            rx="8"
            ry="8"
          />
          <text
            x="20"
            y="70"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
            fill="#fff"
            textAnchor="middle">
            Schulnetz-Server
          </text>
        </g>
        {/* Github Server */}
        <g id="github-server" transform="translate(470, 50)">
          <rect
            x="0"
            y="0"
            width="40"
            height="60"
            fill="#6a4c93"
            stroke="#4a3f6f"
            strokeWidth="2"
            rx="8"
            ry="8"
          />
          <text
            x="20"
            y="70"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
            fill="#fff"
            textAnchor="middle">
            Github-Server
          </text>
        </g>
        {/* Google Server */}
        <g id="google-server" transform="translate(50, 280)">
          <rect
            x="0"
            y="0"
            width="40"
            height="60"
            fill="#f4d35e"
            stroke="#d4b93f"
            strokeWidth="2"
            rx="8"
            ry="8"
          />
          <text
            x="20"
            y="70"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
            fill="#fff"
            textAnchor="middle">
            Google-Server
          </text>
        </g>
        {/* Special DNS Server */}
        <g id="dns-server" transform="translate(470, 280)">
          <rect
            x="0"
            y="0"
            width="40"
            height="60"
            fill="#e76f51"
            stroke="#b04a3a"
            strokeWidth="2"
            rx="8"
            ry="8"
          />
          <text
            x="20"
            y="70"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
            fill="#fff"
            textAnchor="middle">
            DNS-Server
          </text>
        </g>
        {/* Modems connected to the cloud */}
        {/* Modem 1 */}
        <g id="modems" transform="translate(40, 20)">
          <g id="modem1" transform="translate(170, 270)">
            <rect
              x="0"
              y="0"
              width="40"
              height="30"
              fill="#264653"
              stroke="#1b2e3a"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="20"
              y="20"
              fontSize="12"
              fontWeight="bold"
              fontFamily="Arial"
              fill="#fff"
              textAnchor="middle"
              alignmentBaseline="middle">
              Modem
            </text>
          </g>
          {/* Modem 2 */}
          <g id="modem2" transform="translate(280, 270)">
            <rect
              x="0"
              y="0"
              width="40"
              height="30"
              fill="#264653"
              stroke="#1b2e3a"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="20"
              y="20"
              fontSize="12"
              fontWeight="bold"
              fontFamily="Arial"
              fill="#fff"
              textAnchor="middle"
              alignmentBaseline="middle">
              Modem
            </text>
          </g>
          {/* Clients connected to modems */}
          {/* Modem 1 clients (2 clients) */}
          {/* Client 1 */}
          <g id="client1" transform="translate(150, 310)">
            <rect
              x="0"
              y="0"
              width="50"
              height="30"
              fill="#4a90e2"
              stroke="#2c6cc4"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="25"
              y="20"
              fontSize="12"
              fontWeight="bold"
              fontFamily="Arial"
              fill="#fff"
              textAnchor="middle"
              alignmentBaseline="middle">
              Client 1
            </text>
          </g>
          {/* Client 2 */}
          <g id="client2" transform="translate(230, 310)">
            <rect
              x="0"
              y="0"
              width="50"
              height="30"
              fill="#4a90e2"
              stroke="#2c6cc4"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="25"
              y="20"
              fontSize="12"
              fontWeight="bold"
              fontFamily="Arial"
              fill="#fff"
              textAnchor="middle"
              alignmentBaseline="middle">
              Client 2
            </text>
          </g>
          {/* Modem 2 client (1 client) */}
          <g id="client3" transform="translate(320, 310)">
            <rect
              x="0"
              y="0"
              width="50"
              height="30"
              fill="#4a90e2"
              stroke="#2c6cc4"
              strokeWidth="2"
              rx="5"
              ry="5"
            />
            <text
              x="25"
              y="20"
              fontSize="12"
              fontWeight="bold"
              fontFamily="Arial"
              fill="#fff"
              textAnchor="middle"
              alignmentBaseline="middle">
              Client 3
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}
