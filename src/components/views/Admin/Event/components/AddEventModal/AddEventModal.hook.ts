import { ToasterContext } from "@/context/ToasterContext"
import { IEvent, IEventForm} from "@/types/Event"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { AddEventModalProps } from "./AddEventModal.types"
import useMediaHandling from "@/hooks/useMediaHandling"
import { DateValue } from "@nextui-org/react"
import eventServices from "@/services/event.service"
import categoryServices from "@/services/category.service"
import useDebounce from "@/hooks/useDebounce"
import { DELAY } from "@/constants/list.constants"
import { toDateStandard } from "@/utils/date"
import { getLocalTimeZone, now } from "@internationalized/date"


const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate:  yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  region: yup.string().required("Please select region"),
})

const useAddEventModal = (props: AddEventModalProps) => {
  const {onClose, refetchEvents} = props
  const {setToaster} = useContext(ToasterContext)
  const debounce = useDebounce()
  const [searchRegency, setSearchRegency] = useState("")
  

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile
  } = useMediaHandling()

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: {
      errors
    },
    reset,
    watch,
    getValues,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  })

  const preview = watch("banner")
  const fileUrl = getValues("banner")

  useEffect(() => {
    setValue('startDate', now(getLocalTimeZone()))
    setValue('endDate', now(getLocalTimeZone()))
  }, [])

  const handleUploadBanner = (files: FileList, onChange: (files: FileList | undefined) => void) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if(fileUrl) {
        setValue("banner", fileUrl)
      }
    })
  }

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void
  ) => {
    handleDeleteFile(fileUrl as string, () => onChange(undefined))
  }

  const handleOnClose = ( onClose: () => void ) => {
    handleDeleteFile(fileUrl as string, () => {
      reset()
      onClose()
    })
  }

  const {
    data: dataCategory, 
  } = useQuery({
    queryKey: ['Categories'],
    queryFn: () => categoryServices.getCategories()
  })

  const {data: dataRegion} = useQuery({
    queryKey: ['region', searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== ""
  }) 

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY)
  }

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload)

    return res
  }

  const {
    mutate: mutateAddEvent, 
    isPending: isPendingMutateAddEvent, 
    isSuccess: isSuccessMutateAddEvent
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message:  error.message
      })
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add category"
      })
      reset()
      onClose()
      refetchEvents()
    }
  })

  const handleAddEvent = (data: IEventForm) => {

    const payload = {
      ...data,
      isFeatured:  Boolean(data.isFeatured),
      isPublished: Boolean(data.isPublished),
      isOnline: Boolean(data.isOnline),
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)]
      },
      banner: data.banner,

    }

    mutateAddEvent(payload)
  }

  return {
    preview,
    control,
    errors,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    isSuccessMutateAddEvent,
    handleUploadBanner,
    handleDeleteBanner,
    handleOnClose,
    dataCategory,
    handleSearchRegion,
    dataRegion,
    searchRegency
  }
}

export default useAddEventModal