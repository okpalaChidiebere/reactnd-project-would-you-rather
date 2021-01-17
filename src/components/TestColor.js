import React from "react"
import Color from "color-thief-react"

const Loading = () => <div className="triangle" style={{borderColor: `#ffffff00 #ffffff00 #ffffff00 #ffffff00`}}></div>
function TestColor({imgSrc}) {
    return (
        <Color src={imgSrc} crossOrigin="anonymous" format="hex">
            {({ data, loading }) => {
                if (loading) return <Loading />
                return (
                   <div className="triangle" style={{borderColor: `${data} #ffffff00 #ffffff00 ${data}`}}></div>
                )
            }}
        </Color>
    )
}

export default TestColor