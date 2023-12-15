import { useEffect, useState } from "react"
import { useRef } from "react"
import { useCurrentFrame, useVideoConfig } from "remotion"
import {
  Engine,
  Render,
  Bodies,
  Composite,
  Body,
  Vector,
  Query,
} from "matter-js"

const tileSize = 64
const engine = Engine.create()
let render = null
let player = null
let goal = null

function createWorld(engine) {
  const worldString = `     p
b           b
b           b
b           b
b           b
b           b
b           b
b          gb
b        bbbb
b           b
b           b
bbbbbbbbbbbbb
`
    .split("\n")
    .forEach((line, y) => {
      line.split("").forEach((char, x) => {
        if (char === "p") {
          player = Bodies.rectangle(
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize,
            {
              restitution: 0.7,
              render: { fillStyle: "darkblue" },
              collisionFilter: { mask: 0x0001 },
            },
          )
          Composite.add(engine.world, player)
        } else if (char === "b") {
          const block = Bodies.rectangle(
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize,
            {
              isStatic: true,
              render: { fillStyle: "red" },
              collisionFilter: { category: 0x0001 },
            },
          )
          Composite.add(engine.world, block)
        } else if (char === "g") {
          goal = Bodies.rectangle(
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize,
            {
              isStatic: true,
              render: { fillStyle: "yellow" },
              collisionFilter: { category: 0x0002 },
            },
          )
          Composite.add(engine.world, goal)
        }
      })
    })
}
createWorld(engine)

export default function MatterScene() {
  const canvas = useRef(null)
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  useEffect(() => {
    if (render) return
    render = Render.create({
      element: canvas.current,
      engine: engine,
      options: {
        wireframes: false,
        height: 720,
        width: 1280,
        hasBounds: true,
      },
    })
  }, [canvas])

  useEffect(() => {
    const goalCollision = Query.collides(player, [goal])
    if (goalCollision.length > 0) {
      console.log("Goal!", goalCollision)
    }
    Engine.update(engine, (1 / fps) * 1000)
    engine.world.bodies.forEach((b) => {
      if (!b.positions) {
        b.positions = new Array()
      }
      if (frame >= b.positions.length) {
        b.positions.push({ ...b.position })
      } else {
        Body.setPosition(b, b.positions[frame])
      }
    })
    Render.world(render, engine)
    Render.lookAt(render, player, Vector.create(500, 500))
  }, [frame])

  useEffect(() => {
    if (frame === 0) {
      engine.world.bodies.forEach((b) => {
        Body.setAngle(b, 0)
        Body.setAngularVelocity(b, 0)
        Body.setVelocity(b, Vector.create(0, 0))
        b.positions = new Array()
      })
    }
  }, [frame])

  return <div ref={canvas} id="kaboom"></div>
}
