import { RiDeleteBin6Line } from "react-icons/ri";

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
                        <input className="border-2 mt-4 px-3" value={JSON.parse(el.input)} onChange={(e)=>updateTest(index, fieldType.input, e.target.value)} placeholder="Function Call"/>
                        <input className="border-2 mt-4 px-3" value={JSON.parse(el.output)} onChange={(e)=>updateTest(index, fieldType.output, e.target.value)} placeholder="Expected Output"/>
                    </div>
                )
            })}
            <button className="bg-primary text-white text-xl my-4 font-bold py-2 px-4 rounded focus:ring focus:ring-primary" onClick={()=>addNewTest()}>Add More</button>
        </div>
    )
}

export default InputOutputList;