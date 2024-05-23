
interface DueDateFormProps {
    dueDate: string
}


const DueDateForm = ({
    dueDate
}: DueDateFormProps) => {
    return (
        <div className="w-1/3 ">
            <p className=" text-slate-500 text-xs">{dueDate}</p>
        </div>
    )
}
export default DueDateForm