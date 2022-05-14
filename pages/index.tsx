import axios from 'axios'
import moment from 'moment'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Main from '../components/Main'
import Select from 'react-select'
import { AiOutlineCheck, AiOutlineClose, AiOutlineCloseCircle, AiOutlineDelete } from 'react-icons/ai'
import Alert from '../components/Alert'
import updateStatus from './api/bill/update-status'
var _ = require('lodash');

const Home: NextPage = () => {



  const formatDate = (date: string) => moment(date).format("YYYY-MM-DD");


  const [bills, setBills] = useState([])
  const [billsLoading, setBillsLoading] = useState(true)
  const [originBills, setOriginBills] = useState([])
  const [clients, setClients] = useState<{ loading: boolean, data: any }>({ loading: false, data: [] })
  const [billTypes, setBillTypes] = useState<{ loading: boolean, data: any }>({ loading: false, data: [] })
  const [filteredData, setFilteredData] = useState<any>({
    client: { value: '', label: 'Client' },
    etat: { value: '', label: 'Etat' },
    type: { value: '', label: 'Règlement' },
    dateRange: { from: '', to: '' },
    price: { min: '', max: '' }
  })
  const [msg, setMsg] = useState('')
  const [deleteBillLoading, setDeleteBillLoading] = useState(false)
  const [idToChange, setIdToChange] = useState('')
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false)

  const getClients = async () => {
    if (clients.data.length > 0) return;
    try {
      setClients({ ...clients, loading: true })

      const res = await axios.get(`${location.origin}/api/client/getAll`)

      const options = res.data.clients.map((client: any, index: number) => ({ value: client._id, label: client.name }))

      setClients({ ...clients, loading: false, data: [{ value: '', label: 'Client' }, ...clients.data, ...options] })

    } catch (e) {
      console.log(e)
    }
  }

  const getBillTypes = async () => {
    if (billTypes.data.length > 0) return;
    try {
      setBillTypes({ ...billTypes, loading: true })

      const res = await axios.get(`${location.origin}/api/bill-types/getAll`)

      const options = res.data.results.map((billTypes: any, index: number) => ({ value: billTypes._id, label: billTypes.label }))

      setBillTypes({ ...billTypes, loading: false, data: [{ value: '', label: "Règlement" }, ...billTypes.data, ...options] })

    } catch (e) {
      console.log(e)
    }
  }

  const statusOptions = [
    { value: '', label: "Etat", },
    { value: "Encours", label: "Encours", },
    { value: "Paye", label: "Paye", },
    { value: "Impayé", label: "Impayé", },
    { value: "Encaisser", label: "Encaisser", },
  ]

  useEffect(() => {

    const loadBills = async () => {
      if (bills.length > 0) return;
      try {
        setBills([...bills])
        const res = await axios.get(`${location.origin}/api/bill/getAll`)
        const { results } = res.data;
        setBills(results)
        setBillsLoading(false)

      } catch (e) {
        console.log(e)
      }
    }

    loadBills();

  }, [])




  useEffect(() => {


    let r;
    let d;
    let obj = {}
    if (filteredData.client.value != "") {
      obj = { ...obj, client: { "_id": filteredData.client.value, } }
    }
    if (filteredData.type.value != "") {
      obj = { ...obj, billType: { "_id": filteredData.type.value, } }

    }
    if (originBills.length > 0) {
      d = originBills
    } else {

      setOriginBills(bills)
      d = bills
    }
    r = _.filter(d, obj);

    if (filteredData.dateRange.from != '') {
      r = _.filter(r, (i: any) => moment(filteredData.dateRange.from).isBefore(formatDate(i.dueDate)) || moment(filteredData.dateRange.from).isSame(formatDate(i.dueDate)));
    }
    if (filteredData.dateRange.to != '') {
      r = _.filter(r, (i: any) => moment(filteredData.dateRange.to).isAfter(formatDate(i.dueDate)) || moment(filteredData.dateRange.to).isSame(formatDate(i.dueDate)));
    }
    if (filteredData.price.min != '') {
      r = _.filter(r, (i: any) => i.price >= Number(filteredData.price.min));
    }
    if (filteredData.price.max != '') {
      r = _.filter(r, (i: any) => i.price <= Number(filteredData.price.max));
    }
    if (filteredData.etat.value != '') {
      r = _.filter(r, (i: any) => i.status.toLowerCase() === filteredData.etat.value.toLowerCase());
    }
    setBills(r)




  }, [filteredData])



  const handleDelete = async (id: string) => {
    setIdToChange(id)
    setDeleteBillLoading(true)
    setMsg('')
    try {
      const res = await axios.post(`${location.origin}/api/bill/delete`, { id })
      setMsg(res.data.msg)
      const filteredBills = bills.filter((i: any) => i._id != id)
      setBills(filteredBills)

    } catch (e) {
      console.log(e)
    }
    setIdToChange('')
    setDeleteBillLoading(false)
  }

  const handleUpdateStatus = async (id: string, type: string, dueDate: string) => {
    setIdToChange(id)
    setUpdateStatusLoading(true)
    setMsg('')
    try {
      const res = await axios.post(`${location.origin}/api/bill/update-status`, { id, type, dueDate })
      setMsg(res.data.msg)
      let updatedBills: any = bills.map((i: any) => i._id == id ? { ...i, status: type === "Cheque" ? "Encaisser " : "Paye" } : i)

      setBills(updatedBills)

    } catch (e) {
      console.log(e)
    }
    setIdToChange('')
    setUpdateStatusLoading(false)

  }

  return (
    <Main >
      <div>
        <div className="mb-3  ">
          <h1 className="text-4xl">All</h1>
        </div>
        <div className='my-2 h-[38px]  flex items-center'>
          <div className='w-[110px] mr-3'>
            <Select instanceId="options" onMenuOpen={getClients} options={clients.data} isLoading={clients.loading} value={filteredData.client}
              onChange={e => {
                setFilteredData({ ...filteredData, client: e })
              }} placeholder="Client" />
          </div>
          <div className='w-[130px] mr-3'>
            <Select instanceId="options1" isSearchable={false} options={statusOptions} value={filteredData.etat}
              onChange={e => {
                setFilteredData({ ...filteredData, etat: e })
              }} placeholder="Etat" />
          </div>
          <div className='w-[150px] mr-3'>
            <Select instanceId="options2" onMenuOpen={getBillTypes} isSearchable={false} options={billTypes.data} isLoading={billTypes.loading} value={filteredData.type}
              onChange={e => {
                setFilteredData({ ...filteredData, type: e })
              }} placeholder="Règlement Type" />
          </div>
          <div>
            <label className='text-gray-500'>From: </label>
            <input placeholder='Date Echaice' type="date"
              value={filteredData.dateRange.from}
              onChange={e => setFilteredData({ ...filteredData, dateRange: { ...filteredData.dateRange, from: e.target.value } })}
              className='h-[38px] mr-3 rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2' />
          </div>
          <div>
            <label className='text-gray-500'>To: </label>
            <input placeholder='Date Echaice' type="date"
              value={filteredData.dateRange.to}
              onChange={e => setFilteredData({ ...filteredData, dateRange: { ...filteredData.dateRange, to: e.target.value } })}
              className='h-[38px] mr-3 rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  border px-2' />
          </div>

          <div className='flex items-center'>
            <label className='text-gray-500'>Montant: </label>
            <div className='flex '>
              <input placeholder='Min' type="number" value={filteredData.price.min} onChange={e => setFilteredData({ ...filteredData, price: { ...filteredData.price, min: e.target.value } })} className='h-[38px] w-[110px] rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  ml-2 border px-2' />
              <input placeholder='Max' type="number" value={filteredData.price.max} onChange={e => setFilteredData({ ...filteredData, price: { ...filteredData.price, max: e.target.value } })} className='h-[38px] w-[110px]  rounded-[4px] border-[#cccccc] outline-1 outline-blue-500  ml-2 border px-2' />
            </div>
          </div>
        </div>
        {msg && <Alert msg={msg} setMsg={setMsg} />}
        <div className="bg-white shadow p-5">
          <div className="w-full">
            <table className='table-auto	w-full'>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    Montant (MAD)
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    Etat
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    date d{"'"}échéance
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    Règlement
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    CreatedAt
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    -
                  </th>
                </tr>
              </thead>
              {bills.length > 0 && !billsLoading && <tbody className="bg-white">
                {
                  bills.map((bill: any, index) => {

                    return <tr key={index} className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 capitalize">
                          {bill.client.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{bill.price}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                        {bill.status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(bill.dueDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {bill.billType.label}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(bill.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className='flex items-center' >
                          <div onClick={() => handleDelete(bill._id)} className={` ${deleteBillLoading ? "pointer-events-none" : "pointer-events-auto"} w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-red-100 text-red-500 flex justify-center items-center`}>
                            {deleteBillLoading && bill._id === idToChange ? <h1>...</h1> : <AiOutlineDelete size={20} />}
                          </div>
                          {bill.status === "encours" && <div
                            title={`Mark as ${bill.billType.label === "Cheque" ? "Encaisser " : "Paye"}`}
                            onClick={() => handleUpdateStatus(bill._id, bill.billType.label, bill.dueDate)}
                            className={`ml-2 ${updateStatusLoading ? "pointer-events-none" : "pointer-events-auto"} w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-green-100 text-green-500 flex justify-center items-center`}>
                            {updateStatusLoading && bill._id === idToChange ? <h1>...</h1> : <AiOutlineCheck size={20} />}
                          </div>}
                        </div>
                      </td>
                    </tr>
                  })
                }
              </tbody>}
            </table>
            {billsLoading && <div className='flex justify-center items-center py-10  w-full'>
              <p className='text-gray-500' >Loading...</p>
            </div>}
            {!billsLoading && bills.length == 0 && <div className='flex justify-center items-center py-10  w-full'>
              <p className='text-gray-500' >No Bills Here</p>
            </div>}
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Home
