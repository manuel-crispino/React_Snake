import React from "react";

interface Props
{
    Ref: React.RefObject<HTMLDivElement | null>;
    x: number;
    y: number;
    color: string;
    zIndex: number;
}

 const Element: React.FC<Props> = ({Ref, x, y, color,zIndex})=>{

    return (
           <div ref={Ref}
           style={{
        position: "absolute",
        left: x + "px",
        top: y + "px",
        width:"20px",
        height: "20px",
        zIndex: zIndex,
        backgroundColor: color,
    }}></div>
    )
}
export default Element;