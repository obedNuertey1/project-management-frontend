import React from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { useNavigate } from 'react-router-dom';

export default function EditProjectForm({project}:any) {
    const [name, setName] = React.useState<string>(project.name);
    const [description, setDescription] = React.useState<string>(project.description);
    const [status, setStatus] = React.useState<string>("new"); 
    const router = useNavigate();
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            projectId: project.projectId,
            name,
            description,
            status
        },
        update(cache, {data: {updateProject}}){
            const {projects}:any = cache.readQuery({query: GET_PROJECTS});
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.map((elem:any)=>{
                        if(elem.projectId === updateProject.projectId){
                            elem.name = updateProject.name;
                            elem.description = updateProject.description;
                            elem.status = updateProject.status;
                        }
                        return elem;
                    })
                }
            })
        }
    })
    
    const onSubmit = (e:any)=>{
        e.preventDefault();
        updateProject();
        router('/');
    }
  return (
    <div className="mt-5">
        <h3>Update Project Details</h3>
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
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
