export default function Img({ src, alt, imgStyle = {}, containerStyle = {} }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...containerStyle,
      }}>
      <img style={{ ...imgStyle }} src={src} alt={alt} />
    </div>
  )
}
