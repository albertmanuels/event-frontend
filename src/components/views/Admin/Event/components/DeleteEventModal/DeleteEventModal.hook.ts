import { ToasterContext } from "@/context/ToasterContext"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { DeleteEventModalProps } from "./DeleteEventModal.types"
import eventServices from "@/services/event.service"


const useDeleteEventModal = (props: DeleteEventModalProps) => {
  const {refetchEvents, onClose} = props
  const {setToaster} = useContext(ToasterContext)

  const deleteEvent = async (id:string) => {
    const res = await eventServices.deleteEvent(id)
    return res
  }

  const {
    mutate: mutateDeleteEvent, 
    isPending: isPendingMutateDeleteEvent, 
    isSuccess: isSuccessMutateDeleteEvent
  } = useMutation({
    mutationFn: deleteEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message
      })
    }, 
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete event success"
      })
      onClose()
      refetchEvents()
    }
  })

  return {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent
  }
}

export default useDeleteEventModal