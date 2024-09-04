import { Link, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

export default function Project() {
  const {id} = useParams<string>();
  const {loading, error, data} = useQuery(GET_PROJECT, {
    variables: {id}
  });
  console.log(data.project.projectId)
  if(loading) return <Spinner/>;
  if(error) return <p style={{color: "red"}}>Something Went Wrong</p>;

  return (
    <>
      {
        data && (
          <div className="mx-auto card p-5 w-75">
            <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
              Back
            </Link>

            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>

            <h5 className="mt-3">Project Status</h5>
            <p className="lead">{data.project.status}</p>

            {data.project.client && <ClientInfo client={data.project.client} />}
            <EditProjectForm project={data.project} />
            <DeleteProjectButton projectId={data.project.projectId} />
          </div>
        )
      }
    </>
  )
}


// export default function Project() {
//   return (
//     <div>Project</div>
//   )
// }
