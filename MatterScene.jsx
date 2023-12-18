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

function Player(x, y, props) {
  return Bodies.rectangle(x * tileSize, y * tileSize, tileSize, tileSize, {
    restitution: 20,
    mass: 2,
    ...props,
    render: { fillStyle: "darkblue" },
    collisionFilter: { mask: 0x0001 },
  })
}

function BouncyBlock(x, y) {
  return Bodies.rectangle(x * tileSize, y * tileSize, tileSize, tileSize, {
    restitution: 2,
    render: { fillStyle: "green" },
    collisionFilter: { category: 0x0001 },
  })
}

function Block(x, y) {
  return Bodies.rectangle(x * tileSize, y * tileSize, tileSize, tileSize, {
    isStatic: true,
    render: { fillStyle: "red" },
    collisionFilter: { category: 0x0001 },
  })
}

function Goal(x, y) {
  return Bodies.rectangle(x * tileSize, y * tileSize, tileSize, tileSize, {
    isStatic: true,
    render: { fillStyle: "yellow" },
    collisionFilter: { category: 0x0002 },
  })
}

/**
 * Creates the world based on the given parameters.
 *
 * @param {Engine} engine - The physics engine.
 * @param {string} world - The world layout string.
 * @param {Object} playerProps - The properties of the player.
 */
function createWorld(engine, world, playerProps) {
  world.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "p") {
        // Create and add a player to the world
        player = Player(x, y, playerProps)
        Composite.add(engine.world, player)
      } else if (char === "b") {
        // Create and add a block to the world
        Composite.add(engine.world, Block(x, y))
      } else if (char === "B") {
        // Create and add a bouncy block to the world
        Composite.add(engine.world, BouncyBlock(x, y))
      } else if (char === "g") {
        // Create and add a goal to the world
        goal = Goal(x, y)
        Composite.add(engine.world, goal)
      }
    })
  })
}

/**
 * Initializes and controls a Matter.js scene for rendering animations.
 *
 * @return {JSX.Element} The canvas element for rendering the scene.
 */
export default function MatterScene({ world, playerProps }) {
  // Get a reference to the canvas element
  const canvas = useRef(null)

  // Get the current frame number
  const frame = useCurrentFrame()

  // Get the frames per second (fps) from the video configuration
  const { fps } = useVideoConfig()

  useEffect(() => {
    createWorld(engine, world, playerProps)
  }, [])

  useEffect(() => {
    // Check if render exists, if not skip the rest of the effect
    if (render) return

    // Create a rendering context with the specified options
    render = Render.create({
      element: canvas.current,
      engine: engine,
      options: {
        wireframes: false, // Disable wireframes
        height: 720, // Set the height of the canvas
        width: 1280, // Set the width of the canvas
        hasBounds: true, // Enable bounded rendering
      },
    })
  }, [canvas])

  // Use effect hook to run the code block when 'frame' changes
  useEffect(() => {
    // Check for collision between 'player' and 'goal'
    const goalCollision = Query.collides(player, [goal])

    // If collision occurs, log "Goal!" and the collision details
    if (goalCollision.length > 0) {
      console.log("Goal!", goalCollision)
    }

    // Update the 'engine' using the specified frame rate
    Engine.update(engine, (1 / fps) * 1000)

    // Loop through all bodies in the 'engine.world'
    engine.world.bodies.forEach((b) => {
      // If 'b' doesn't have a 'positions' property, create an empty array
      if (!b.positions) {
        b.positions = new Array()
      }

      // If 'frame' is greater than or equal to the length of 'b.positions',
      // push a new position object into 'b.positions'
      // Otherwise, set the position of 'b' to the saved position at 'frame'
      if (frame >= b.positions.length) {
        b.positions.push({ ...b.position })
      } else {
        Body.setPosition(b, b.positions[frame])
      }
    })

    // Render the world using the 'render' object
    Render.world(render, engine)

    // Set the camera to look at the 'player' with a fixed position of (500, 500)
    Render.lookAt(render, player, Vector.create(500, 500))
  }, [frame])

  // Reset the state of the bodies in the physics engine
  useEffect(() => {
    if (frame === 0) {
      engine.world.bodies.forEach((b) => {
        // Reset the angle of the body to 0
        Body.setAngle(b, 0)

        // Reset the angular velocity of the body to 0
        Body.setAngularVelocity(b, 0)

        // Reset the linear velocity of the body to (0, 0)
        Body.setVelocity(b, Vector.create(0, 0))

        // Clear the array of positions for the body
        b.positions = new Array()
      })
    }
  }, [frame])

  return <div ref={canvas} id="kaboom"></div>
}
