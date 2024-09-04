import { FaList } from "react-icons/fa";
import React from 'react';
import { 
    useMutation, 
    useQuery
 } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientsQuery";
import Spinner from "./Spinner";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function AddProjectModal() {
    const {data, error, loading} = useQuery(GET_CLIENTS);
    console.log(data);
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [clientId, setClientId] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("new");
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name:name, description:description, clientId:clientId, status:status},
            update(cache, {data: {addProject}}){
                const {projects}:any = cache.readQuery({
                    query: GET_PROJECTS
                });
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: {
                        projects: [...projects, addProject]
                    }
                })
            },
            onError: (error)=>{
                console.log({error});
            }
    });
    
    const onSubmit = async (e:any)=>{
        e.preventDefault();
        try{
            if(description === '' || status === "" || name === ""){
                return alert('Please fill in all fields');
            }
            await addProject();
        }catch(error){
            console.log({error})
        }
        setName(""); setDescription(""); setStatus("new"); setClientId("");
    }
  return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center justify-content-center">
                <FaList className="icon" />
                <div>New Project</div>
            </div>
        </button>
        <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="addProjectModalLabel">Add Client</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {loading && <Spinner />}
            {error && <p style={{color: "red"}}>An Error Occured</p>}
            {/* {data &&  */}
            {data && 
                <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="name">Name:</label>
                        <input type='text' className="form-control" id="name" value={name} 
                            onChange={
                                (e)=>{
                                    setName(e.target.value)
                                }
                            }
                        />
                        <label className="form-label" htmlFor="description">Description:</label>
                        <textarea  className="form-control" id="description" value={description} 
                            onChange={
                                (e)=>{
                                    setDescription(e.target.value)
                                }
                            }
                        ></textarea>
                        <label className="form-label" htmlFor="status">Status:</label>
                        <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)} className="form-select">
                            <option value="new">Not Started</option>
                            <option value="progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                    <label className="form-label" htmlFor="clientId">ClientID:</label>
                    <select name="clientId" id="clientId" value={clientId} onChange={(e)=>setClientId(e.target.value)} className="form-select">
                            <option value="">Select Client</option>
                            {data.clients.map((elem:any)=>(
                                <option key={elem.id} value={elem.id}>{elem.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                </form>
            }
            {/* // } */}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}
