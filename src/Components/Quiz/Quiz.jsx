import React, { useRef, useState } from 'react'
import { data } from '../Data/Data'

function Quiz() {
    let [index, setIndex] = useState(0)
    let [question, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [res, setRes] = useState(false)

    let textRef1 = useRef(null)
    let textRef2 = useRef(null)
    let textRef3 = useRef(null)
    let textRef4 = useRef(null)

    let text_array = [textRef1, textRef2, textRef3, textRef4]

    let checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct")
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong")
                setLock(true)
                text_array[question.ans - 1].current.classList.add("correct")
            }
        }

    }

    let next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setRes(true)
                return 0
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            text_array.map((text) => {
                text.current.classList.remove("wrong")
                text.current.classList.remove("correct")
                return null
            })
        }
    }
    const reset = ()=>{
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setRes(false)
    }
    return (
        <div className="bg-[white] w-[500px] h-[450px] flex flex-col rounded-[20px] p-5 relative box">
            <h1 className="m-2 text-[30px]">Quiz App</h1>
            <hr className="m-2" />
            {res ? <><h2 className="text-center mt-[100px]">You Scored {score} out of {data.length}</h2>
                <button onClick={reset} className="bg-[#9583b8] hover:bg-purple w-[200px] flex justify-center items-center m-4 mb-[30px] absolute bottom-0 right-[130px] p-2 rounded-[10px] cursor-pointer">Reset</button></> :
                <>
                    <h2 className="m-2 text-[20px]">{index + 1}. {question.question}</h2>
                    <ul className="mb-5">
                        <li ref={textRef1} onClick={(e) => { checkAns(e, 1) }} className="bg-[#b7a3de] flex justify-center items-center p-2 rounded-[10px] hover:bg-[#a793cfbc] cursor-pointer m-2">{question.text1}</li>
                        <li ref={textRef2} onClick={(e) => { checkAns(e, 2) }} className="bg-[#b7a3de] flex justify-center items-center p-2 rounded-[10px] hover:bg-[#a793cfbc] cursor-pointer m-2">{question.text2}</li>
                        <li ref={textRef3} onClick={(e) => { checkAns(e, 3) }} className="bg-[#b7a3de] flex justify-center items-center p-2 rounded-[10px] hover:bg-[#a793cfbc] cursor-pointer m-2">{question.text3}</li>
                        <li ref={textRef4} onClick={(e) => { checkAns(e, 4) }} className="bg-[#b7a3de] flex justify-center items-center p-2 rounded-[10px] hover:bg-[#a793cfbc] cursor-pointer m-2">{question.text4}</li>
                    </ul>
                    <button onClick={next} className="bg-[#9583b8] hover:bg-purple w-[200px] flex justify-center items-center m-4 mb-[30px] absolute bottom-0 right-[130px] p-2 rounded-[10px] cursor-pointer">Next</button>
                    <div className="absolute top-[395px] right-[150px] m-2 p-5">{index + 1} of {data.length} questions</div>
                </>}
                

        </div>
    )
}

export default Quiz