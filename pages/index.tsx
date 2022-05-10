import axios from 'axios'
import moment from 'moment'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Main from '../components/Main'
import Select from 'react-select'
import { AiOutlineClose, AiOutlineCloseCircle, AiOutlineDelete } from 'react-icons/ai'
var _ = require('lodash');

const Home: NextPage = () => {



  const formatDate = (date: string) => moment(date).format("YYYY-MM-DD");

  const getBillStatus = (dueDate: string, billType: string) => {

    if (moment().isBefore(dueDate)) {
      return "Encour"
    }
    else if (moment().isAfter(dueDate)) {
      return billType === "Traite" ? "Impayé" : "Encour"
    }

  }

  const [bills, setBills] = useState([])
  const [billsLoading, setBillsLoading] = useState(true)
  const [originBills, setOriginBills] = useState([])
  const [clients, setClients] = useState<{ loading: boolean, data: any }>({ loading: false, data: [] })
  const [billTypes, setBillTypes] = useState<{ loading: boolean, data: any }>({ loading: false, data: [] })
  const [filteredData, setFilteredData] = useState<any>({
    client: { value: '', label: 'Client' },
    type: { value: '', label: 'Règlements Type' },
    dateRange: { from: '', to: '' },
    price: { min: '', max: '' }
  })
  const [msg, setMsg] = useState('')
  const [deleteBillLoading, setDeleteBillLoading] = useState(false)
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

      setBillTypes({ ...billTypes, loading: false, data: [{ value: '', label: "Règlements Type" }, ...billTypes.data, ...options] })

    } catch (e) {
      console.log(e)
    }
  }

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
    setBills(r)




  }, [filteredData])


  return (
    <Main >
      <div>
        <div className="mb-3 w-[600px] ">
          <h1 className="text-4xl">All</h1>
        </div>
        <div className='my-2 h-[38px]  flex items-center'>
          <div className='w-[110px] mr-3'>
            <Select instanceId="options" onMenuOpen={getClients} options={clients.data} isLoading={clients.loading} value={filteredData.client}
              onChange={e => {
                setFilteredData({ ...filteredData, client: e })
              }}
              className="" placeholder="Client" />
          </div>
          <div className='w-[150px] mr-3'>
            <Select instanceId="options1" onMenuOpen={getBillTypes} isSearchable={false} options={billTypes.data} isLoading={billTypes.loading} value={filteredData.type}
              onChange={e => {
                setFilteredData({ ...filteredData, type: e })
              }} className=" " placeholder="Règlements Type" />
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
        {
          msg && <div className='bg-red-100 flex items-center justify-between border border-red-400 text-red-600 p-3 mb-3 rounded'>
            <div className='flex items-center'>
              <AiOutlineCloseCircle size={25} />
              <p className='ml-2 capitalize'>{msg}</p>
            </div>
            <div onClick={() => setMsg('')} className='w-[30px] h-[30px] hover:bg-red-200 rounded cursor-pointer flex justify-center items-center'>
              <AiOutlineClose size={18} />
            </div>
          </div>
        }
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
                    date d'échéance
                  </th>
                  <th className="px-6 py-3 text-left text-sm text-gray-500">
                    Règlements Type
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
                        <div className="text-sm text-gray-500">
                          {bill.client.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{bill.price}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {
                          getBillStatus(bill.dueDate, bill.billType.label)
                        }
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
                        <div onClick={async () => {
                          const billId = bill._id
                          console.log(billId)
                          setDeleteBillLoading(true)
                          setMsg('')
                          try {
                            const res = await axios.post(`${location.origin}/api/bill/delete`, { id: billId })

                            setMsg(res.data.msg)

                            const filteredBills = bills.filter((i: any) => i._id != billId)
                            setBills(filteredBills)

                          } catch (e) {
                            console.log(e)
                          }
                          setDeleteBillLoading(false)
                        }} className={` ${deleteBillLoading ? "pointer-events-none" : "pointer-events-auto"} w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-gray-300 flex justify-center items-center`}>
                          {!deleteBillLoading ? <AiOutlineDelete size={20} /> : <h1>...</h1>}
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
