import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { InfoTabProps } from "./InfoTab.types"


const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
})

const useInfoTab = (props: InfoTabProps) => {
  const {dataCategory, isSuccessUpdate} = props

  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: {
      errors: errorsUpdateInfo
    },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo)
  })

  useEffect(() => {
    setValueUpdateInfo("name", `${dataCategory?.name}`)
    setValueUpdateInfo("description", `${dataCategory?.description}`)
  }, [dataCategory])

  useEffect(() => {
    if(isSuccessUpdate) {
      resetUpdateInfo()
    }
  }, [])

  return {
    controlUpdateInfo, 
    errorsUpdateInfo, 
    handleSubmitUpdateInfo 
  }
}

export default useInfoTab