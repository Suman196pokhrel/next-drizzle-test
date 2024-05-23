
interface DescriptionFormProps {
    description: string
}


const DescriptionForm = ({
    description
}: DescriptionFormProps) => {
    return (
        <div className=" text-slate-600 text-sm p-2 bg-gray-100 rounded-lg">
            {description}
        </div>
    )
}
export default DescriptionForm