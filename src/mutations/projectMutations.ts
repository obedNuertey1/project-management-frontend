import {gql} from '@apollo/client';

const ADD_PROJECT = gql`
    mutation addProject(
        $name: String! 
        $description: String! 
        $status: ProjectStatus!
        $clientId: ID!
        ){
        addProject(
            name: $name 
            description: $description 
            status: $status 
            clientId: $clientId
            ){
            id
            name
            description
            status
            client{
                id
                name
                email
                phone
            }
        }
    }
`;

const DELETE_PROJECT = gql`
    deleteProject($projectId: ID!){
        deleteProject(projectId: $projectId){
            id
            name
            description
            status
            clientId
            client{
                id
                name
                email
                phone
            }
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation updateProject(
        $name: String!, 
        $description: String!, 
        $status: ProjectUpdateStatus!,
        $projectId: ID!
        ){
        updateProject(
            projectId: $projectId,
            name: $name, 
            description: $description, 
            status: $status, 
            clientId: $clientId
            ){
            id
            name
            description
            status
            client{
                id
                name
                email
                phone
            }
        }
    }
`;

export {ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT};