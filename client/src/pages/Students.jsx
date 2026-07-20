import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { getDepartments } from '../utils/departmentApi';


const initialStudent = {
    name : "",
    email : "",
    age : "",
    department : ""
}

const Students = () => {
    const [formData , setFormData] = useState(initialStudent);
    const [Students , setStudents] = useState([]);
    const [departments , setDepartments] = useState([]);
    const [search , setSearch] = useState("");
    const [debouncedSearch , setDebouncedSearch] = useState("");
    const [sortBy,setSortBy] = useState("name-asc");
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1)
    const lastDiv = useRef(null);
    const [loading,setLoading] = useState(false);
    const [hasMore,setHasMore] = useState(true);
    const limit = 5;
    
    // let sortedStudents = Students.sort((a,b)=>{
    //     if(sortBy === "name-asc") return a.name.localeCompare(b.name);
    //     if(sortBy === "name-desc") return b.name.localeCompare(a.name);
    //     if(sortBy === "age-asc") return a.age - b.age;
    //     if(sortBy === "age-desc") return b.age - a.age;
    // });
    
    const loadDepartments = async()=>{
        try {
            const data = await getDepartments(search);
            console.log(data.data);
            setDepartments(data.data);
            
        } catch (error) {
            console.log(error);
        }
    };
    
    const loadStudents = async()=>{
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/students?search=${search}&page=${page}&limit=${limit}&sort=${sortBy}`);
            const data = await res.json();
            console.log(data);
            if(data.success){
                setStudents((prev)=>[...prev,...data.students]);
                setTotalPages(data.totalPages);
                setHasMore(page <= data.totalPages);
            }    
            else{
                toast.error(data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedSearch(search);
        },1000);

        return ()=>clearTimeout(timer);
    }
    ,[search]);


    useEffect(()=>{
        loadStudents();
    },[page,sortBy,debouncedSearch]);


    useEffect(()=>{
        loadDepartments();
    },[]);
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch("http://localhost:3000/api/students/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            if(data.success){
                toast.success(data.message);
                loadStudents();
            }
            else{
                toast.error(data.message);
            }
            setFormData(initialStudent);
            
        } catch (error) {
            console.log(error);
            toast.error(data.message);
        }
    }

    // intersectionObserver

    useEffect(()=>{
        if(!hasMore) return;

        const observer = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && !loading){
                const nextPage = page+1;
                setPage(nextPage);
                
            }
        },{
            threshold:1
        });

        if(lastDiv.current){
            observer.observe(lastDiv.current);
        }
        
        return ()=>{
            observer.unobserve(lastDiv.current);
        }

    },[loading, page, totalPages]);


  return (
    <div>
      <h1>Students</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
        <br />
        <label htmlFor="email">Email : </label>
        <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            />
        <br />
        <label htmlFor="age">Age : </label>
        <input 
            type="number" 
            name="age" 
            id="age" 
            value={formData.age} 
            onChange={(e)=>setFormData({...formData,age:e.target.value})}
            />
        <br />
        <label htmlFor="department">Department : </label>
        <select
            onChange={(e)=>setFormData({...formData,department:e.target.value})}
        >
            <option value="">-- Select Department --</option>
            {
                departments.map((d)=>(
                    <option value={d._id}>{d.department_name}</option>                    
                ))
            }
        </select>
        <br />
        <button type='submit'>Submit</button>
      </form>
      <hr />
      <br />
      <input
        type="text"
        placeholder='Search Students...'
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
      />
      <button onClick={()=>{loadStudents()}}>Search</button>
      <hr />
      <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
        <option value="name-asc">Sort : Name (A-Z)</option>
        <option value="name-desc">Sort : Name (Z-A)</option>
        <option value="age-asc">Sort : AGE (low to high)</option>
        <option value="age-desc">Sort : AGE (high to low)</option>
      </select>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Department</th>
            </tr>
        </thead>
        <tbody>
            {
                Students.map((s)=>(
                    <tr>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.age}</td>
                        <td>{s.department.department_name}</td>
                    </tr>
                ))
            }
            {loading && <tr><td colSpan={4} style={{textAlign:'center'}}>loading...</td></tr>}
            {!hasMore && <tr><td colSpan={4} style={{textAlign:'center'}}>No More Students to load</td></tr>}
        </tbody>
            
      </table>
      
      <div ref={lastDiv} style={{height:"1px"}} ></div>
    </div>
  )
}

export default Students
