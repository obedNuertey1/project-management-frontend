import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";

export default function DeleteProjectButton({projectId}:any) {
    const router = useNavigate();
    
    console.log("works")
    const [deleteProject]:any = useMutation(DELETE_PROJECT, {
        variables: {projectId},
        onCompleted: ()=> router('/'),
        refetchQueries: [{query: GET_PROJECTS}],
        onError: (error)=>{
          console.log({error})
        }
    })

  return (
    <div className="d-flex mt-5 ms-auto">
        <button className="btn btn-danger m-2" onClick={deleteProject}>
            <FaTrash className="icon" /> Delete Project
        </button>
    </div>
  )
}
