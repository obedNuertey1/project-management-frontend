import { FaUser } from "react-icons/fa";
import React from 'react';
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientsMutation";
import { GET_CLIENTS } from "../queries/clientsQuery";

export default function AddClientModal() {
    const [addClient] = useMutation(ADD_CLIENT);

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");


    const onSubmit = (e:any)=>{
        e.preventDefault();
        if(email === '' || phone === "" || name === ""){
            return alert('Please fill in all fields');
        }
        addClient({variables: {
            name,
            email,
            phone
        },
        update(cache
            , 
            {data: {addClient}}
        ){
            const {clients}:any = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient]
                }
            })
        }
    })
        setName(""); setEmail(""); setPhone("");
    }
  return (
    <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
            <div className="d-flex align-items-center justify-content-center">
                <FaUser className="icon" />
                <div>Add Client</div>
            </div>
        </button>
        <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input type='text' className="form-control" id="email" value={email} 
                            onChange={
                                (e)=>{
                                    setEmail(e.target.value)
                                }
                            }
                        />
                        <label className="form-label" htmlFor="phone">Phone:</label>
                        <input type='text' className="form-control" id="phone" value={phone} 
                            onChange={
                                (e)=>{
                                    setPhone(e.target.value)
                                }
                            }
                        />
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                </form>
            </div>
            {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
            </div>
        </div>
        </div>
    </>
  )
}
