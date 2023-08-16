export default function Chapter({children, hash}) {
  window.location.hash = `${hash}`

  return (
    <>
      {children}
    </>
  )
  
}