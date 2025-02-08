import { useContext, useState } from 'react'
import * as yup from "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { ILogin } from '@/types/Auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { ToasterContext } from '@/context/ToasterContext'

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your email or username"),
  password: yup.string().min(8, "Minimum at least 8 characters").required("Please input your password"),
})

const useLogin = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const {setToaster} = useContext(ToasterContext)

  const callbackUrl = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: {
      errors
    },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode:"onChange",
    reValidateMode:"onChange"
  })

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl
    })

    if(result?.error && result.status === 401) {
      throw new Error("Login Failed")
    }
  }

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: () =>  {
      setToaster({
        type: "error",
        message: "Your credential is wrong"
      })
    },
    onSuccess: ()  => {
      setToaster({
        type: "success",
        message: "Login success"
      })
      router.push(callbackUrl)
      reset()
    }
  })

  const handleLogin = (data: ILogin) => mutateLogin(data)

  function toggleVisibility() {
    setIsVisible(!isVisible)
  }

  return {
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    isVisible,
    errors,
  }
}

export default useLogin