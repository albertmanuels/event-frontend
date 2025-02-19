import { ToasterContext } from "@/context/ToasterContext"
import categoryServices from "@/services/category.service"
import { ICategory } from "@/types/Category"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { AddCategoryModalProps } from "./AddCategoryModal.types"
import useMediaHandling from "@/hooks/useMediaHandling"

const schema = yup.object().shape({
  name: yup.string().required("Please input name of category"),
  description: yup.string().required("Please input description"),
  icon: yup.mixed<FileList | string>().required("Please input icon")
})

const useAddCategoryModal = (props: AddCategoryModalProps) => {
  const {onClose, refetchCategory} = props
  const {setToaster} = useContext(ToasterContext)
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
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

  const preview = watch("icon")
  const fileUrl = getValues("icon")

  const handleUploadIcon = (files: FileList, onChange: (files: FileList | undefined) => void) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if(fileUrl) {
        setValue("icon", fileUrl)
      }
    })
  }

  const handleDeleteIcon = (
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

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload)

    return res
  }

  const {
    mutate: mutateAddCategory, 
    isPending: isPendingMutateAddCategory, 
    isSuccess: isSuccessMutateAddCategory
  } = useMutation({
    mutationFn: addCategory,
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
      refetchCategory()
    }
  })

  const handleAddCategory = (data: ICategory) => {
    mutateAddCategory(data)
  }

  return {
    preview,
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isPendingMutateUploadFile,
    handleUploadIcon,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose
  }
}

export default useAddCategoryModal