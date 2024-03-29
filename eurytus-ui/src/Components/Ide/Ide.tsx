import Editor from "@monaco-editor/react";

interface IdeProps {
    language: string,
    value: string,
    changeValue: (val: string)=>void,
    
}

const Ide = ({language, value, changeValue}: IdeProps) => {
    return(
        <Editor
            language={language}
            theme = "vs-dark"
            value={value}
            onChange={(e)=>changeValue(e!)}
            height="100%"
        />
    )
}

export default Ide;