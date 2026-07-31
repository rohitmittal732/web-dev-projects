import React from 'react'
import { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showPage,setShowPage]=useState(false);
  const [students,setStudents]=useState([]);
  function fetchStudents() {
  fetch("http://localhost:5000/students")
    .then((res) => res.json())
    .then((data) => {
      setStudents(data);
    })
    .catch((err) => console.log(err));
}
   function handleSubmit(e){
       e.preventDefault();
       const docs={};
       
        const emailInput=document.getElementById("email");
        const nameInput=document.getElementById("name");
        const marksInput=document.getElementById("marks");
        docs.email=emailInput.value;
        docs.name=nameInput.value;
        docs.marks=marksInput.value;
        
        fetch('http://localhost:5000/students',{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:
             JSON.stringify(
                docs
             )
    })
    .then((res)=>res.json())
        .then((data)=>{
          console.log(data);
          setShowForm(false);
           fetchStudents();
        })
       }

  
  useEffect(()=>{
       fetch('http://localhost:5000/students')
       .then((res)=>{
        return res.json();
       })
       .then((data)=>{
        console.log(data),
        setStudents(data)
       }
        
       )
       .catch((err)=>{
        console.log(err);
       })
     },[])
     
  return (
    <>
     
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Student Management</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    
     <table className="table table-success table-striped-columns">
        <thead>

          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">marks</th>
            
          </tr>
        </thead>
        <tbody>
          {
            students.map((item,index)=>(
      
        <tr key={index}>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.marks}</td>
      
         </tr>
     ))
          }
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>John</td>
            <td>Doe</td>
            <td>@social</td>
          </tr> */}
        </tbody>
      </table>
      <div className="btns">
        <button type="button" className="btn btn-danger" onClick={()=>setShowForm(true)}>Add</button>
<button type="button" className="btn btn-warning" onClick={()=>setShowPage(true)}>Edit</button>
<button type="button" className="btn btn-info" onClick={()=>setShowPage(true)}>Delete</button>
      </div>
      {
        showForm && (
          <div className="container mt-4">
      <h2 className="mb-3">Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" />
        </div>

        <div className="mb-3">
          <label htmlFor="marks" className="form-label">Marks</label>
          <input type="number" className="form-control" id="marks" name="marks" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
        )
      }
    </>
  )
}

export default App
