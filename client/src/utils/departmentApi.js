import { backendUrl } from "./url";

export async function getDepartments(search){
    const res = await fetch(`http://localhost:3000/api/departments?search=${search}`);
    if(!res.ok) throw new Error("Department Fetch Failed")
    return res.json();
}

export async function addDepartment(formData){
    const res = await fetch(`${backendUrl}/api/departments/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    });
    if(!res.ok) throw new Error("Department creation Failed")
    return res.json();
}

export async function deleteDepartment(id){
    const res = await fetch(`${backendUrl}/api/departments/${id}`,{
        method:"DELETE"
    })
    if(!res.ok) throw new Error("Department deletion Failed")
    return res.json();
}