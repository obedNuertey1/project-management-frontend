import {useQuery} from "@apollo/client";
import {GET_CLIENTS} from "../queries/clientsQuery";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

function Clients() {
    const {data, loading, error} = useQuery(GET_CLIENTS);
    if(error) return <div className="danger">An error occurred</div>;
    if(loading) return <Spinner/>;
  return (
    <table className='table table-hover mt-3'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {data.clients.map((client:any)=>(
                <ClientRow key={client.id} client={client} />
            ))}
        </tbody>
    </table>
  )
}

export default Clients