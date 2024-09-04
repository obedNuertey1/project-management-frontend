import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Projects(){
    const {loading, error, data} = useQuery(GET_PROJECTS);
    if(loading) return <Spinner />;
    if(error) return <p style={{color: "red"}}>Something Went Wrong</p>;
    return (
        <>
            {(data.projects.length > 0) ? (
                <div className="row mt-3">
                    {data.projects.map((project:any)=>(
                        // @ts-ignore
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <p>No Projects</p>
            )}
        </>
    );
}