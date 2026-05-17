import React, {useState, useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import customFetch from '../utils';
function UpdateFinish (){
    const{id}=useParams()
    const [finishType,setFinishType]=useState()
const [description,setDescription]=useState()
const navigate=useNavigate()

useEffect(()=>{

    customFetch.get('/fightFinish/' + id)
    .then(result=>{
    setFinishType(result.data.finishType)
    setDescription(result.data.description)


    })
    .catch(err=>
},[])

const Update=(e)=>{
    e.preventDefault();
    customFetch.patch('/fightFinish/' + id, {finishType,description})
    .then(result=>{
        navigate('/')
    })
    .catch(err=>
}

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update Finish</h2>
                    <div className='mb-2'>
                        <label htmlFor="">FinishType</label>
                        <input type="text" placeholder="Enter FinishType" className="form-control" 
                        value={finishType}  onChange={(e)=>setFinishType(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder="Enter Description" className="form-control" 
                        value={description}  onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Update</button>
                    
                </form>
            </div>
            </div>
    )
}
export default UpdateFinish;
