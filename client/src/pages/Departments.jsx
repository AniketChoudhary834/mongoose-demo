import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addDepartment, deleteDepartment, getDepartments } from '../utils/departmentApi';

const initialDepartment = {department_name:"",code:""};
const Departments = () => {
    const [formData , setFormData] = useState(initialDepartment);
    const [departments , setDepartments] = useState([]);
    const [loading , setLoading] = useState(true);
    const [search , setSearch] = useState("");

    const loadDepartments = async()=>{
        try {
            const data = await getDepartments(search);
            console.log(data.data);
            setDepartments(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        loadDepartments();
    },[]);
    


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const data = await addDepartment(formData);
            if(data.success){
                toast.success(data.message);
                setFormData(initialDepartment)
                setDepartments([...departments,{...formData,students:[]}])
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    
    
    async function handleDelete(id){
        try {
            const data = await deleteDepartment(id);
            if(data.success){
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
            loadDepartments();
        }
        catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

  return (
    <div>
      <h1>Departments</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="department_name">Department Name : </label>
        <input 
            type="text" 
            name="department_name" 
            id="department_name" 
            value={formData.department_name} 
            onChange={(e)=>setFormData({...formData,department_name:e.target.value})}
            />
        <br />
        <label htmlFor="code">Department Code : </label>
        <input 
            type="text"
            name="code"
            id="code"
            value={formData.code} 
            onChange={(e)=>setFormData({...formData,code:e.target.value})}

        />
    <br />
        <button type='submit'>Submit</button>
      </form>
      <hr />
      <br />
      <input
        type="text"
        placeholder='Search Departments...'
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
      />
      <button onClick={()=>{loadDepartments()}}>Search</button>
      <hr />
      <table>
        <thead>
            <tr>
                <th>Department Name</th>
                <th>Code</th>
                <th>Enrolled Students</th>
            </tr>
        </thead>
        <tbody>
            {loading ? (
                <tr>Loading...</tr>
            ) :
            (   departments.length === 0 ? <tr><td>No Such Departments Exists</td></tr>: 
                departments.map((d)=>(
                    <tr>
                        <td><Link to={`/departments/${d._id}`} className='links'>{d.department_name}</Link></td>
                        <td>{d.code}</td>
                        <td>{d.students.length}</td>
                        <td>
                            <button onClick={()=>handleDelete(d._id)}>Delete</button>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
            
      </table>
    </div>
  )
}

export default Departments
