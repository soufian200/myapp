import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Alert from "../components/Alert";
import Main from "../components/Main";


const Clients = () => {

    const [clients, setClients] = useState([])
    const [loadingClients, setLoadingClients] = useState(false)
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')

    const [deleteClientLoading, setDeleteClientLoading] = useState(false)

    useEffect(() => {
        const loadClients = async () => {
            if (clients.length > 0) return;
            try {
                setLoadingClients(true)
                const res = await axios.get(`${location.origin}/api/client/getAll`)
                const { clients } = res.data;
                // console.log(clients)
                setClients(clients)


            } catch (e) {
                console.log(e)
                setErr('failed to Load Clients. please reload your page')
            }
            setLoadingClients(false)
        }
        loadClients()
    }, [])


    const handleDeleteClient = async (id: string, name: string) => {
        console.log(id)

        setDeleteClientLoading(true)
        setMsg('')
        try {
            const res = await axios.post(`${location.origin}/api/client/delete`, { id, name })
            setMsg(res.data.msg)
            const filteredBills = clients.filter((i: any) => i._id != id)
            setClients(filteredBills)
        } catch (e: any) {
            setErr(e.response.status < 500 ? e.response.data.msg : 'Failed to save client. Please try again')
        }
        setDeleteClientLoading(false)
    }
    return <Main >
        <div className="flex justify-center">
            <div className="w-[600px]">
                <div className="mb-3  ">
                    <h1 className="text-4xl">Clients</h1>
                </div>
                <div className="bg-white shadow p-5">
                    {msg && <Alert msg={msg} setMsg={setMsg} />}
                    {err && <Alert msg={err} setMsg={setErr} err={!!err} />}
                    <table className='table-auto w-full'>
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm text-gray-500">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-sm text-gray-500">
                                    Client
                                </th>
                                <th className="px-3 py-3 text-left text-sm text-gray-500">
                                    -
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {
                                clients.map((client: any, index) => {
                                    return <tr key={index} className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 capitalize">{client.name}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div onClick={() => handleDeleteClient(client._id, client.name)} className={` ${deleteClientLoading ? "pointer-events-none" : "pointer-events-auto"} w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-gray-300 flex justify-center items-center`}>
                                                {!deleteClientLoading ? <AiOutlineDelete size={20} /> : <h1>...</h1>}
                                            </div>
                                        </td>

                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    {loadingClients && <div className='flex justify-center items-center py-10  w-full'>
                        <p className='text-gray-500' >Loading...</p>
                    </div>}
                    {!loadingClients && clients.length == 0 && <div className='flex justify-center items-center py-10  w-full'>
                        <p className='text-gray-500' >No Clients Here</p>
                    </div>}
                </div>
            </div>
        </div>
    </Main >
}
export default Clients;