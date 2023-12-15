import { Player } from "@remotion/player"
import { AbsoluteFill } from "remotion"

export function Video({ children }) {
  return <AbsoluteFill>{children}</AbsoluteFill>
}

function Intro() {
  return (
    <Video>
      <h1
        style={{ color: "red", textAlign: "center", border: "1px solid red" }}>
        Hello
      </h1>
    </Video>
  )
}

export default function RPlayer({ videoComponent }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Player
          style={{ width: "640px" }}
          component={videoComponent || Intro}
          durationInFrames={2 * 30}
          compositionWidth={1280}
          compositionHeight={720}
          fps={30}
          autoPlay={true}
          controls
          loop={true}
          playbackRate={1.0}
          showPlaybackRateControl={true}></Player>
      </div>
    </>
  )
}
