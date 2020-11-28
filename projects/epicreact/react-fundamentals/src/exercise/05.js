// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

// function boxStyle({backgroundColor}) {
//   return {'fontStyle': 'italic', 'backgroundColor': backgroundColor}
// }
//
// function SmallBox() {
//   const styles = boxStyle({backgroundColor: 'lightblue'})
//   return <div className="box box--small" style={styles}>small lightblue box</div>
// }
//
// function MediumBox() {
//   const styles = boxStyle({backgroundColor: 'pink'})
//   return <div className="box box--medium" style={styles}>medium pink box</div>
// }
//
// function LargeBox() {
//   const styles = boxStyle({backgroundColor: 'orange'})
//   return <div className="box box--large" style={styles}>large orange box</div>
// }
//
// function App() {
//   return (
//     <div>
//       <SmallBox />
//       <MediumBox />
//       <LargeBox />
//     </div>
//   )
// }

// Extra Credit 1
// I actually thought this solution wanted something more like Extra Credit 2.
// So I actually completed the full nice version which takes size and bg color
// as props. I came back around and did this after I realised I had I misread
// it,.
// function Box({className, style, children}) {
//   const styles = {...style, 'fontStyle': 'italic'}
//   return (
//     <div className={`box ${className}`} style={styles}>
//       {children}
//     </div>
//   )
// }
//
// function App() {
//   return <div>
//     <Box className="box--small" style={{backgroundColor: 'lightblue'}}>
//       small lightblue box
//     </Box>
//     <Box className="box--medium" style={{backgroundColor: 'pink'}}>
//       medium orange box
//     </Box>
//     <Box className="box--large" style={{backgroundColor: 'orange'}}>
//       large orange box
//     </Box>
//   </div>
// }

// Extra Credit 2
function Box({size, color}) {
  if (!['small', 'medium', 'large'].includes(size)) {
    throw new Error(`Invalid size ${size}`);
  }

  const style = {'fontStyle': 'italic', 'backgroundColor': color}
  const className = `box box--${size}`
  return (
    <div className={className} style={style}>
      {`${size} ${color} box`}
    </div>
  )
}

function App() {
  return (
    <div>
      <Box size="small" color="lightblue"/>
      <Box size="medium" color="pink"/>
      <Box size="large" color="orange"/>
    </div>
  )
}

export default App
