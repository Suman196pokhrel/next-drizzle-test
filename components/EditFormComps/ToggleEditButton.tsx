import { MdClose } from "react-icons/md"
import { Button } from "../ui/button"
import { FiEdit2 } from "react-icons/fi"

interface ToggleEditButtonProps {
    isEditing: boolean
    isSubmitting: boolean
    toggleEdit: () => void
}


const ToggleEditButton = ({
    isEditing,
    isSubmitting,
    toggleEdit
}: ToggleEditButtonProps) => {
    return (
        <div
            className=""
            onClick={toggleEdit}
        >
            {isEditing ? (
                <Button
                    className="flex items-center gap-3 text-xs h-8 w-20"
                    variant={"outline"}
                    disabled={isSubmitting}

                >
                    <MdClose />

                    Cancel
                </Button>
            ) : (
                <Button
                    className="flex items-center gap-3 text-gray-700 text-xs h-8 w-20"
                    variant={"outline"}
                    disabled={isSubmitting}
                >
                    <FiEdit2 />
                    <p>Edit</p>
                </Button>
            )}
        </div>
    )
}
export default ToggleEditButton