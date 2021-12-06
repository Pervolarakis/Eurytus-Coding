import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

interface IdeProps {
    language: string,
    template: string
}

const Ide = ({language, template}: IdeProps) => {
    const [code, setCode] = useState(template)
    useEffect(()=>{
        console.log(code)
    },[code])
    return(
        <Editor
            language={language}
            theme = "vs-dark"
            value={code}
            onChange={(e)=>setCode(e!)}
            height="83%"
        />
    )
}

export default Ide;