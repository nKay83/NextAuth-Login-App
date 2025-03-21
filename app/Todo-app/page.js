'use client';
import { useState } from "react";

// import LogoutButton from "../components/LogoutButton"

function TodoApp(){
    const [job,setJob] = useState('')
    const [jobs,setJobs] = useState(() => {
        const storegeJobs = JSON.parse(localStorage.getItem('jobs'))
        return storegeJobs ?? []
    })

    const handleSumit = () => {
        setJobs(prev => {
            const newJobs = [...prev,job]

            const jsonJobs = JSON.stringify(newJobs)
            localStorage.setItem('jobs',jsonJobs)

            return newJobs
        })
        setJob('')
    }

    return (
        <div className='mx-auto grid grid-rows-none items-center justify-items-center max-w-96 min-h-1 p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <input value={job}  onChange={e => setJob(e.target.value)} ></input>
            <button onClick={handleSumit}>Add</button>
            <ul >
            {jobs.map((job,index)=> (
                <li key={index}>{job}</li>
            ))}
            </ul>
            
        </div>
    );
}
export default TodoApp