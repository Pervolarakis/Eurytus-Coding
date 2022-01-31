import { createRef } from "react";

const Tooltip = ({ children, tooltipText }:{children: JSX.Element, tooltipText: string}) => {
    
    const tipRef = createRef<HTMLDivElement>();
    
    const handleMouseEnter = () => {
        if(tipRef.current){
            tipRef.current.style.opacity = '1';
            tipRef.current.style.marginTop = "-45px";
            tipRef.current.style.display= 'flex'
        }
    }
    
    const handleMouseLeave = () => {
        if(tipRef.current){
            tipRef.current.style.opacity = '0';
            tipRef.current.style.display= 'none'
            // tipRef.current.style.marginLeft = "20px";
        }
    }
    return (
        <div
            className="w-full"
        >
            <div
                className="hidden absolute whitespace-no-wrap bg-black text-white px-4 py-2 rounded  items-center transition-all duration-150"
                ref={tipRef}
            >
                <div
                    className="bg-black h-3 w-3 absolute"
                    style={{ bottom: "-6px", transform: "rotate(45deg)" }}
                />
                    {tooltipText}
                
            </div>
            <div
                className="w-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
            {children}
            </div>
        </div>
    );
}

export default Tooltip;