import MatterScene from "../MatterScene"
import { Video } from "../Remotion"

export default function Outro() {
  return (
    <Video>
      <MatterScene
        world={`    p
b           b
b           b
b           b
b           b
b           b
b           b
b          gb
b     bbbbbbb
b           b
b   BB      b
bbbbbbbbbbbbb
`}
        player={{
          velocity: { x: 10, y: 0 },
          resitution: 0,
        }}
      />
    </Video>
  )
}
