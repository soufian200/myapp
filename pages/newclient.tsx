import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import Alert from "../components/Alert";
import Main from "../components/Main";
const NewClient: NextPage = () => {
    const [name, setName] = useState('')
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')

    const [addClientLoading, setAddClientLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = { name }
        if (!formData.name) return

        setAddClientLoading(true)
        setMsg('')
        setErr('')

        try {
            const res = await axios.post(`${location.origin}/api/client/add`, formData)
            console.log(res.data)
            setMsg(res.data.msg)
            setName('')
        } catch (e) {

            setErr('failed to save client. please try again')
        }
        setAddClientLoading(false)
    }

    return <Main>
        <div className='flex flex-col  items-center justify-center'>

            <div className=" w-[500px]">
                <div className="mb-3 ">
                    <h1 className="text-4xl">Add New Client</h1>
                </div>
                <div className='bg-white shadow p-5'>
                    <form onSubmit={handleSubmit} >
                        {msg && <Alert msg={msg} setMsg={setMsg} />}
                        {err && <Alert msg={err} setMsg={setErr} err={!!err} />}
                        <div className="mb-2">
                            <label htmlFor="name" className="mb-2 block" >Client Name:</label>
                            <input type="text" name="name" id="name" placeholder="Enter Client Name" value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-[45px] w-full mb-3 rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2"
                            />
                        </div>
                        <input type="submit"
                            value={addClientLoading ? "Saving..." : "Save"}
                            className={`w-full ${addClientLoading ? "bg-[#b7d8ff] hover:bg-[#b7d8ff] text-black pointer-events-none" : "bg-[#3690ff] hover:bg-blue-600 pointer-events-auto"} py-3  px-2 h-[45px] rounded-[4px] cursor-pointer text-white `} />
                    </form>

                </div>
            </div>
        </div>

    </Main>
}
export default NewClient