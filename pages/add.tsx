import type { NextPage } from 'next'
import Main from '../components/Main'
import Select from 'react-select'
import { useState } from 'react'
import axios from 'axios'

import { AiFillCheckCircle } from 'react-icons/ai';

const Add: NextPage = () => {

    const [clients, setClients] = useState<{ loading: boolean, data: any }>({ loading: false, data: [] })
    const [billTypes, setBillTypes] = useState<{ loading: boolean, data: any }>({ loading: false, data: [] })
    const [formData, setFormData] = useState<any>({
        client: '',
        dueDate: '',
        price: '',
        type: ''
        // status: options2[0],
    })
    const [msg, setMsg] = useState('')
    const [addBillLoading, setAddBillLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.client != '' && formData.dueDate != '' && formData.price != '' && formData.type != '') {
            setAddBillLoading(true)
            setMsg('')
            console.log(formData)
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bill/add`, formData)
                console.log(res.data)
                setMsg(res.data.msg)
                setFormData({
                    client: '',
                    dueDate: '',
                    price: '',
                    type: ''
                })
            } catch (e) {
                console.log(e)
            }
            setAddBillLoading(false)
        }
    }

    const customStyles = {
        control: (base: any) => ({
            ...base,
            height: 45,
        })
    }

    const getClients = async () => {
        if (clients.data.length > 0) return;
        try {
            setClients({ ...clients, loading: true })

            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client/getAll`)

            const options = res.data.clients.map((client: any, index: number) => ({ value: client._id, label: client.name }))

            setClients({ ...clients, loading: false, data: [...clients.data, ...options] })

        } catch (e) {
            console.log(e)
        }
    }


    const getBillTypes = async () => {
        if (billTypes.data.length > 0) return;
        try {
            setBillTypes({ ...billTypes, loading: true })

            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bill-types/getAll`)

            const options = res.data.results.map((billTypes: any, index: number) => ({ value: billTypes._id, label: billTypes.label }))

            setBillTypes({ ...billTypes, loading: false, data: [...billTypes.data, ...options] })

        } catch (e) {
            console.log(e)
        }
    }



    return (
        <Main title='Add'>
            <div className='flex flex-col  items-center justify-center'>

                <div className="mb-3 w-[600px] ">
                    <h1 className="text-4xl">Add</h1>
                </div>
                <div className='bg-white w-[600px] shadow p-5'>
                    <form className='' onSubmit={handleSubmit}>
                        {
                            msg && <div className='bg-green-100 flex items-center border border-green-400 text-green-600 p-3 mb-3 rounded'>
                                <AiFillCheckCircle size={25} />
                                <p className='ml-2 capitalize'>{msg}</p>
                            </div>
                        }
                        <div className='mb-5'>
                            <label className='mb-2 block'>Client:</label>
                            <Select instanceId="options" onMenuOpen={getClients} options={clients.data} isLoading={clients.loading} value={formData.client} onChange={e => setFormData({ ...formData, client: e })} className="mb-2 " placeholder="Client" styles={customStyles} />
                        </div>
                        <div className='mb-5'>
                            <label className='mb-2 block'>Due Date:</label>
                            <input placeholder='Date Echaice' type="date" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} className='w-full h-[45px] rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2' />
                        </div>
                        <div className='mb-5'>
                            <label className='mb-2 block'>Price / Montant (MAD):</label>
                            <input placeholder='Price/Montant' type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Math.max(1, Number(e.target.value)) })} className='w-full h-[45px] rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2' />
                        </div>
                        <div className='mb-5'>
                            <label className='mb-2 block'>Type Cheque:</label>
                            <Select instanceId="options1" onMenuOpen={getBillTypes} isSearchable={false} options={billTypes.data} isLoading={billTypes.loading} value={formData.type} onChange={e => setFormData({ ...formData, type: e })} className="mb-2 " placeholder="Type Cheque" styles={customStyles} />
                        </div>
                        {/* <div className='mb-5'>
                        <label className='mb-2 block'>Status / Etat:</label>
                        <Select instanceId="options2" isSearchable={false} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e })} options={options2} className="mb-2 " placeholder="Status / Etat" styles={customStyles} />
                    </div> */}

                        <input type="submit" value={addBillLoading ? "Saving..." : "Save"} className={`w-full ${addBillLoading ? "bg-[#b7d8ff] hover:bg-[#b7d8ff] text-black pointer-events-none" : "bg-[#3690ff] hover:bg-blue-600 pointer-events-auto"} py-3  px-2 h-[45px] rounded-[4px] cursor-pointer text-white `} />
                    </form>
                </div>
            </div>
        </Main>
    )
}

export default Add
