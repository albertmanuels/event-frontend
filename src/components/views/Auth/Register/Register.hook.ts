import { useContext, useState } from 'react'
import * as yup from "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { IRegister } from '@/types/Auth'
import authServices from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ToasterContext } from '@/context/ToasterContext'

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your fullname"),
  username: yup.string().required("Please input your username"),
  email: yup.string().email("Email format not valid").required("Please input your email"),
  password: yup.string().min(8, "Minimum at least 8 characters").required("Please input your password"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), ""], "Password not matched").required("Please input your password confirmation")
})

const useRegister = () => {
  const router = useRouter()
  const {setToaster} = useContext(ToasterContext)
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false
  })

  const {
    control,
    handleSubmit,
    formState: {
      errors
    },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode:"onChange",
    reValidateMode:"onChange"
  })

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload)
    return result
  }

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error) =>  {
      setToaster({
        type: "error",
        message: error.message
      })
    },
    onSuccess: ()  => {
      setToaster({
        type: "success",
        message: "Register success"
      })
      router.push("/auth/register/success")
      reset()
    }
  })

  const handleRegister = (data: IRegister) => mutateRegister(data)

  function handleVisiblePassword(key: "password" | "confirmPassword") {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key]
    })
  }

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  }
}

export default useRegister