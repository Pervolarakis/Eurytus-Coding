import javaIcon from '../../../Assets/javaIcon.svg';
import jsIcon from '../../../Assets/jsIcon.svg';
import codeBrackets from '../../../Assets/codeBrackets.svg'
import ChallengeListItem from './ChallengeListItem';
import { useEffect, useState } from 'react';
import {axios} from '../../../Api/eurytusInstance';
import { toast } from 'react-toastify';

const ListAll = () => {

    interface challenge {
        name: string,
        difficulty: number,
        id: string,
        description: string,
        language: string
    }

    const [challenges, setChallenges] = useState<challenge[]>();

    useEffect(()=>{
        axios.get('/challenges/')
        .then((res)=>setChallenges(res.data.data))
        .catch(err=>toast.error(err.response?.data.error||'There was an error fetching challenges!'))
    },[])

    return(
        <div className="responsive-container">
            <h1 className="mt-6 font-bold text-2xl">Challenges</h1>
            <div className="flex w-full justify-between mt-6 flex-col md:flex-row gap-4">
                <div className="h-44 w-full md:w-4/12 bg-gradient-to-r from-classes-class1-left to-classes-class1-right flex flex-row rounded-2xl shadow-xl px-8 py-4">
                    <img className="w-1/4" src={codeBrackets} alt="code brackets" />
                    <div className="flex items-center w-3/4">
                        <p className="font-bold text-white text-4xl pl-8 md:text-2xl md:px-4 xl:text-4xl xl:pl-8">Browse all Challenges!</p>
                    </div>
                </div>
                <div className="h-44 w-full md:w-4/12  bg-gradient-to-r from-classes-class2-left to-classes-class2-right flex flex-row rounded-2xl shadow-xl px-8 py-4">
                    <img className="w-1/4" src={javaIcon} alt="code brackets" />
                    <div className="flex items-center w-3/4">
                        <h1 className="font-bold text-white text-4xl pl-8 md:text-2xl md:px-4 xl:text-4xl xl:pl-8">Learn Java!</h1>
                    </div>
                </div>
                <div className="h-44 w-full md:w-4/12 bg-gradient-to-r from-classes-class3-left to-classes-class3-right flex flex-row rounded-2xl shadow-xl px-8 py-4">
                    <img className="w-1/4" src={jsIcon} alt="code brackets" />
                    <div className="flex items-center w-3/4">
                        <h1 className="font-bold text-white text-4xl pl-8 md:text-2xl md:px-4 xl:text-4xl xl:pl-8">Learn JavaScript!</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full mt-6 flex-col md:flex-row">
                <div className="flex items-center">
                    <h1 className="font-bold">Available Languages: </h1>
                    <select className="ml-4 rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700" name="cars" id="cars">
                        <option value=""></option>
                        <option value="Java">Java</option>
                        <option value="Javascript">Javascript</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <h1 className="font-bold">Difficulty:</h1>
                    <select className="ml-4 rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700" name="cars" id="cars">
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="w-full mt-6 flex flex-col gap-3">
                {(challenges)?
                challenges.map((el, index)=>{
                    return <ChallengeListItem name={el.name} description={el.description} difficulty={el.difficulty} language={el.language} id={el.id} key={el.id}/>
                }):<p>heeeee</p>}
            </div>
        </div>
    )
}

export default ListAll;