import { ToasterContext } from "@/context/ToasterContext"
import categoryServices from "@/services/category.service"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { DeleteEventModalProps } from "./DeleteEventModal"

const useDeleteEventModal = (props: DeleteEventModalProps) => {
  const {refetchCategory, onClose} = props
  const {setToaster} = useContext(ToasterContext)

  const deleteCategory = async (id:string) => {
    const res = await categoryServices.deleteCategory(id)
    return res
  }

  const {mutate: mutateDeleteCategory, isPending: isPendingMutateDeleteCategory, isSuccess: isSuccessMutateDeleteCategory} = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message
      })
    }, 
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete category success"
      })
      onClose()
      refetchCategory()
    }
  })

  return {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory
  }
}

export default useDeleteEventModal