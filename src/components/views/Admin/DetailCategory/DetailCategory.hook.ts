import { ToasterContext } from "@/context/ToasterContext"
import categoryServices from "@/services/category.service"
import { ICategory } from "@/types/Category"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useContext } from "react"

const useDetailCategory = () => {
  const {query} = useRouter()
  const {setToaster} = useContext(ToasterContext)

  const getCategoryById = async (id: string) => {
    const {data} = await categoryServices.getCategoryById(id)

    return data.data
  }

  const {data: dataCategory, isLoading: isCategoryLoading, refetch: refetchCategory} = useQuery({
    queryKey: ['Category'],
    queryFn: async () => {
      if(query.id) {
        return await getCategoryById(`${query.id}`)
      }
    }
  })

  const updateCategory = async (payload: ICategory) => {
    const {data} = await categoryServices.updateCategory(`${query.id}`, payload)
    return data.data
  }

  const {
    mutate: mutateUpdateCategory, 
    isPending: isPendingMutateUpdateCategory, 
    isSuccess: isSuccessMutateUpdateCategory
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message:  error.message
      })
    },
    onSuccess: () => {
      refetchCategory()
      setToaster({
        type: "success",
        message: "Success update category"
      })
    }
  })

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data)

  return {
    dataCategory,
    isCategoryLoading,
    isPendingMutateUpdateCategory,
    handleUpdateCategory,
    isSuccessMutateUpdateCategory
  }
}

export default useDetailCategory