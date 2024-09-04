import { FaTrash } from "react-icons/fa"
import { DELETE_CLIENT } from "../mutations/clientsMutation"
import { useMutation } from "@apollo/client"
import { GET_CLIENTS } from "../queries/clientsQuery";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({client}:any) {
    const [deleteClient]:any = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}], //Refreshes the page with refetched data cons(decreases performance)
        // update(cache, { data: { deleteClient } }) {
        //     const { clients }: any = cache.readQuery({ query: GET_CLIENTS });
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {
        //             clients: clients.filter((client: any) => (client.id !== deleteClient.id)),
        //         },
        //     });
        //     return;
        // },
    });

  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button onClick={deleteClient} className="btn btn-danger btn-sm">
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
