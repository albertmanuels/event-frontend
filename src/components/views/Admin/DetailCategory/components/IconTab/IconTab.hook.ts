import useMediaHandling from "@/hooks/useMediaHandling"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { IconTabProps } from "./IconTab.types"

const schemaUpdateIcon = yup.object().shape({
  icon: yup.mixed<FileList | string>().required("Please input category")
})

const useIconTab = (props: IconTabProps) => {
  const {isSuccessUpdate} = props

  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile
  } = useMediaHandling()

    const {
      control: controlUpdateIcon,
      handleSubmit: handleSubmitUpdateIcon,
      formState: {
        errors: errorsUpdateIcon
      },
      reset: resetUpdateIcon,
      watch: watchUpdateIcon,
      getValues: getValuesUpdateIcon,
      setValue: setValueUpdateIcon
    } = useForm({
      resolver: yupResolver(schemaUpdateIcon)
    })

    useEffect(() => {
      if(isSuccessUpdate) {
        resetUpdateIcon()
      }
    }, [isSuccessUpdate])

  const preview = watchUpdateIcon("icon")

  const handleUploadIcon = (files: FileList, onChange: (files: FileList | undefined) => void) => {
    if(files.length !== 0) {
      onChange(files)
      mutateUploadFile({
        file: files[0], 
        callback: (fileUrl: string) => setValueUpdateIcon("icon", fileUrl)
      })
    }
  }

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void
  ) => {
    const fileUrl = getValuesUpdateIcon("icon")
    
    if(typeof fileUrl === "string") {
      mutateDeleteFile({fileUrl,callback: () =>onChange(undefined)  })
    }
  }

  

  return  {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    handleUploadIcon,
    handleSubmitUpdateIcon,
    controlUpdateIcon,
    errorsUpdateIcon,
    preview,
  }
}

export default useIconTab