import * as matter from "matter-js"
import { useEffect, useRef } from "react"

export default function Matter() {
  const matterElement = useRef(null)

  // module aliases
  const Engine = matter.Engine,
    Render = matter.Render,
    Runner = matter.Runner,
    Bodies = matter.Bodies,
    Composite = matter.Composite,
    MouseConstraint = matter.MouseConstraint,
    Mouse = matter.Mouse

  // create an engine
  const engine = Engine.create()

  useEffect(() => {
    // create a renderer
    const render = Render.create({
      element: matterElement.current,
      engine: engine,
    })

    // create two boxes and a ground
    const boxA = Bodies.rectangle(400, 200, 80, 80)
    const boxB = Bodies.rectangle(450, 50, 80, 80)
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground])
    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          // allow bodies on mouse to rotate
          angularStiffness: 0,
          render: {
            visible: false,
          },
        },
      })

    Composite.add(engine.world, mouseConstraint)

    // add new body on rightclick
    render.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault()
      // Add a bouncy ball
      const body = Bodies.circle(event.offsetX, event.offsetY, 50, {
        restitution: 0.99,
        render: {
          fillStyle: "red",
        },
      })
      Composite.add(engine.world, body)
    })

    // add new static body on middleclick
    render.canvas.addEventListener("mousedown", (event) => {
      if (event.button === 1) {
        const body = Bodies.rectangle(event.offsetX, event.offsetY, 50, 50, {
          isStatic: true,
        })
        Composite.add(engine.world, body)
      }
    })

    // keep the mouse in sync with rendering
    render.mouse = mouse

    // run the renderer
    Render.run(render)

    // create runner
    const runner = Runner.create()

    // run the engine
    Runner.run(runner, engine)
  }, [])

  return (
    <>
      <div ref={matterElement}></div>
    </>
  )
}
