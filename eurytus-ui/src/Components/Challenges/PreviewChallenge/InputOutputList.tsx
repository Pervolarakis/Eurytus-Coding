import { RiDeleteBin6Line, RiQuestionMark } from "react-icons/ri";
import Tooltip from "../../Tooltip/Tooltip";

interface challengeTest {
    input: string; 
    output: string
}

interface InputOutputListProps {
    testList: {"challenge": challengeTest[]}
    setTestList: (newTestList: {"challenge": challengeTest[]})=>void
}

const InputOutputList = ({testList, setTestList}: InputOutputListProps) => {
    
    const addNewTest = () => {
        const tempTestList = [...testList["challenge"]]
        tempTestList.push(
            {
                input: JSON.stringify(``),
                output: JSON.stringify(``)
            }
        )
        setTestList({"challenge": tempTestList})
    }

    const removeTest = (index: number) => {
        const tempTestList = [...testList["challenge"]]
        tempTestList.splice(index,1)
        setTestList({"challenge": tempTestList})
    }

    enum fieldType {
        input = "input",
        output = "output"
    }

    const updateTest = (index: number, field: fieldType, value: string) => {
        const tempTestList = [...testList["challenge"]]
        tempTestList[index][field] = JSON.stringify(value)
        setTestList({"challenge": tempTestList})
    }

    return (
        <div className="h-full w-full flex items-center flex-col">
            {testList["challenge"].map((el, index)=>{
                return(
                    <div className="w-10/12 h-40 bg-white rounded-md shadow p-5 flex flex-col mt-4" key={index}>
                        <div className="flex justify-between">
                            <h1 className="font-bold text-xl">Test {index+1}</h1>
                            <RiDeleteBin6Line
                                type='icon'
                                name='circle-checked'
                                color='black'
                                size='20'
                                onClick={()=>removeTest(index)}
                            />
                        </div>
                        <input title="Input should be invoking the tested function. For example in Java we can: new ClassName().methodName() or new ClassName(1,2).methodName() or new ClassName().methodName(4,5) or new ClassName('a',4,'b').methodName(4,5). Keep in mind that some primitive types need to be specified for example a float should be written 45.45f . In javaScript input can be just the function name like functionName('a',5,'b') " className="border-2 mt-4 px-3" value={JSON.parse(el.input)} onChange={(e)=>updateTest(index, fieldType.input, e.target.value)} placeholder="Function Call"/>
                        <input title='Expected output is the output expected to be returned from the invoked function. It can be something like 4 or something like "hey world" ' className="border-2 mt-4 px-3" value={JSON.parse(el.output)} onChange={(e)=>updateTest(index, fieldType.output, e.target.value)} placeholder="Expected Output"/>
                    </div>
                )
            })}
            <button className="bg-primary text-white text-xl my-4 font-bold py-2 px-4 rounded focus:ring focus:ring-primary" onClick={()=>addNewTest()}>Add More</button>
        </div>
    )
}

export default InputOutputList;