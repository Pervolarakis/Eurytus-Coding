import { useEffect, useState } from 'react';
import { PinInput } from 'react-input-pin-code';
import joinchallengewave from '../../Assets/joinchallengewave.svg'
import homepageIllustration from '../../Assets/homepage-illustration.svg'
import { useNavigate } from 'react-router-dom';

const JoinExam = () => {
    
    const [values, setValues] = useState(['', '', '', '', '', '', '', '','','','','','','','','','','','','','','','','']);
    const [isInvalid, setIsInvalid] = useState(true)
    let navigate = useNavigate();

    useEffect(()=>{
        if(values.join('').length == 24 && values.join('').match(/^[0-9a-fA-F]{24}$/)){
            setIsInvalid(false)
        }else{
            setIsInvalid(true)
        }
    },[values])

    const onJoinExamClick = () => {
        if(values.join('').length==24 && !isInvalid){
            navigate(`/solve/${values.join('')}`)
        }
    }

    return (
        <div className="w-full h-full flex justify-center">   
            <div className="sm:w-[520px] h-[465px] bg-white rounded shadow mt-16 flex flex-col items-center relative overflow-hidden">
                <div className='z-10 mt-44'>
                    <h1 className='text-white text-xl mb-4'>Please enter the 24 digit code</h1>
                    <div className='w-[432px]'>
                        <PinInput
                            values={values}
                            onChange={(value, index, values) => setValues(values)}
                            type={'text'}
                            size={"lg"}
                            autoFocus={true}
                            placeholder={""}
                            
                            validate={"abcdef1234567890ABCDEF"}
                            containerStyle={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}
                            inputStyle={{marginTop: '5px', color: 'white'}}
                            validBorderColor={"#1ab0c3"}
                        />
                    </div>
                    <button onClick={()=>onJoinExamClick()} className={`w-48 h-10 rounded mt-4 text-lg font-medium ${(values.join('').length<24)?'bg-gray-300':(isInvalid)?'bg-red-500 text-white':'bg-secondary_dark text-white'}`}>{(values.join('').length<24)?`${24-values.join('').length} digits left`:(isInvalid)?'Invalid code!':'Lets Go!'}</button>
                </div>
                <img className='absolute z-10 w-36' src={homepageIllustration} alt="coding illustration"/>
                <img className='absolute z-0 mt-14 w-full' src={joinchallengewave} alt="wave"/>
                <div className='w-full h-full absolute mt-32 sm:mt-36 bg-primary'></div>
            </div>
        </div>
    )
}

export default JoinExam;