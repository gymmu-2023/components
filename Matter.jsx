import * as matter from "matter-js"
import { useEffect, useRef } from "react"

export default function Matter() {
  const matterElement = useRef(null)

  // module aliases
  const Engine = matter.Engine,
    Render = matter.Render,
    Runner = matter.Runner,
    Bodies = matter.Bodies,
    Composite = matter.Composite

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
