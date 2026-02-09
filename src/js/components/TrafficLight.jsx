import React, { useEffect, useState } from "react";
function TrafficLight() {
const [activeColor,setActiveColor] = useState("red");
const [auto, setAuto] = useState(false);
const [showPurple, setShowPurple] = useState(false);


useEffect(() => {
  if (!auto) return;

  const interval = setInterval(() => {
    setActiveColor(prev => {
      const colors = ["red", "yellow", "green"];
      if (showPurple) colors.push("purple");

      const index = colors.indexOf(prev);
      const nextIndex = (index + 1) % colors.length;
      return colors[nextIndex];
    });
  }, 2000);

  return () => clearInterval(interval);
}, [auto, showPurple]);

return (
    <div className="traffic-light">
        <div className="traffic-pole"></div>
        <div className="light-box">
           {["red", "yellow", "green"].map(color => (
    <div
       key={color}
       onClick={() => setActiveColor(color)}
       className={`light ${color}-light ${activeColor === color ? "active" : ""}`}
       />
     ))}
          {showPurple && (
             <div onClick={() => setActiveColor("purple")} 
            className={`light purple-light ${activeColor === "purple" ? "active" : ""}`}>              
            </div>
          )}
        </div>
        <div className="button-group">
        <button className={`btn ${auto ? "btn-danger" : "btn-success"}`} 
        onClick={() => setAuto(!auto)}> 
        {auto ? "Stop" : "Automatic"}
        </button>
        <button className="btn btn-warning" onClick={() => setShowPurple(prev => !prev)}>
       {showPurple ? "Remove Purple" : "Add Purple"} 
       </button>
       </div>
     </div>
)
}
export default TrafficLight;