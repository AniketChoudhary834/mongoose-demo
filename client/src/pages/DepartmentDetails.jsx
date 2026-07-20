import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';

const DepartmentDetails = () => {
    const {id} = useParams();
    const [department,setDepartment] = useState(null);

    const fetchDepartment = async()=>{
        try {
            const res = await fetch(`http://localhost:3000/api/departments/${id}`);
            const data = await res.json();
            if(data.success){
                setDepartment(data.data);
            }
            else{
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchDepartment();
    },[]);

    if(!department) return <p>Loading...</p>

  return (
    <div>
      <h1><u>Department details</u></h1>
      <h2>Name : {department.department_name}</h2>
      <h2>Code : {department.code}</h2>
      <h2>Total Students : {department.students.length}</h2>
      <hr />
      <hr />
      <h2>Enrolled Students : </h2>

      <table>
        <thead>
            <tr>
                <th>Student Name</th>
                <th>Age</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {department.students.length === 0 && <tr><td>No Students Enrolled yet</td></tr>}
            {department.students.map((s)=>(
                <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.age}</td>
                    <td>{s.email}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}

export default DepartmentDetails
