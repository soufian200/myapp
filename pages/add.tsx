import type { NextPage } from 'next'
import Main from '../components/Main'
import Select from 'react-select'
import { useState } from 'react'


const Add: NextPage = () => {
    const options = [
        { value: 'id1', label: 'client1' },
        { value: 'id2', label: 'client2' },
        { value: 'id3', label: 'cleint3' }
    ]

    const options1 = [
        { value: 'cheque', label: 'cheque' },
        { value: 'traite', label: 'traite' },
    ]
    const options2 = [
        { value: 'encour', label: 'encour' },
        { value: 'paye', label: 'paye' },
        { value: 'encaisse', label: 'encaisse' },
        { value: 'impaye', label: 'impaye' },
    ]
    // const [status,setStatus] = useState(options2[0])

    const [formData, setFormData] = useState({
        client: '',
        date: '',
        dueDate: '',
        status: options2[0],
        price: '',
        type: ''
    })

const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(formData)
}

    const customStyles = {
        control: (base: any) => ({
            ...base,
            height: 45,
        })
    }

    return (
        <Main title='Add'>
            <div className=''>
                <form className='w-[600px]' onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <label className='mb-2 block'>Client:</label>
                        <Select instanceId="options" options={options} value={formData.client} onChange={e=>setFormData({...formData, client:e})} className="mb-2 " placeholder="Client" styles={customStyles} />
                    </div>
                    <div className='mb-5'>
                        <label className='mb-2 block'>Date:</label>
                        <input placeholder='Date ' type="date" value={formData.date} onChange={e=>setFormData({...formData, date:e.target.value})} className='w-full h-[45px] rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2' />
                    </div>
                    <div className='mb-5'>
                        <label className='mb-2 block'>Due Date:</label>
                        <input placeholder='Date Echaice' type="date" value={formData.dueDate} onChange={e=>setFormData({...formData, dueDate:e.target.value})} className='w-full h-[45px] rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2' />
                    </div>
                    <div className='mb-5'>
                        <label className='mb-2 block'>Price / Montant:</label>
                        <input placeholder='Price/Montant' type="number" value={formData.price} onChange={e=>setFormData({...formData, price:e.target.value})} className='w-full h-[45px] rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2' />
                    </div>
                    <div className='mb-5'>
                        <label className='mb-2 block'>Type Cheque:</label>
                        <Select instanceId="options1" isSearchable={false} options={options1} value={formData.type} onChange={e=>setFormData({...formData, type:e})} className="mb-2 " placeholder="Type Cheque" styles={customStyles} />
                    </div>
                    {/* <div className='mb-5'>
                        <label className='mb-2 block'>Status / Etat:</label>
                        <Select instanceId="options2" isSearchable={false} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e })} options={options2} className="mb-2 " placeholder="Status / Etat" styles={customStyles} />
                    </div> */}
                    <input type="submit" value="Save" className='w-full bg-[#3690ff] py-3  px-2 h-[45px] rounded-[4px] cursor-pointer text-white hover:bg-blue-600' />
                </form>
            </div>
        </Main>
    )
}

export default Add
