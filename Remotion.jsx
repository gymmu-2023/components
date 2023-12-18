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

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion"

export function MorphingTitleSequence() {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()

  // Calculate progress ranging from 0 to 1
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  // Determine the text content based on the progress
  const text = progress < 0.5 ? "Hello World" : "Hi There"

  // Style interpolation for the morph effect
  const fontSize = interpolate(progress, [0, 0.5, 1], [40, 60, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  return (
    <Video>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}>
        <h2
          style={{
            color: "red",
            textAlign: "center",
            fontSize: `${fontSize}px`,
            opacity: 1 - progress,
          }}>
          {text}
        </h2>
      </div>
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
          durationInFrames={5 * 30} // Duration is now 5 seconds at 30 fps
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
