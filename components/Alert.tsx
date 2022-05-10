import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineClose } from "react-icons/ai"

const Alert = ({ err, msg, setMsg }: { err?: boolean, msg: string, setMsg: (val: string) => void }) => {
    return <div className={` flex items-center justify-between border ${err ? "border-red-400 text-red-600 bg-red-100" : "border-green-400 text-green-600 bg-green-100"} p-3 mb-3 rounded`}>
        <div className='flex items-center'>
            {err ? <AiFillCloseCircle size={25} /> : <AiFillCheckCircle size={25} />}
            <p className='ml-2 capitalize'>{msg}</p>
        </div>
        <div onClick={() => setMsg('')} className={`w-[30px] h-[30px] ${err ? "hover:bg-red-200" : "hover:bg-green-200"} rounded cursor-pointer flex justify-center items-center`}>
            <AiOutlineClose size={18} />
        </div>
    </div>
}
export default Alert