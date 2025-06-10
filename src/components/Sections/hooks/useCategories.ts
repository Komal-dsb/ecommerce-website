import { useState, useEffect } from "react"
import { supabase } from "@/supabaseClient"


type category = {
  id: string,
  name: string
}[]
function useCategories(): { categories: category | null, loading: boolean } {

  const [categories, setCategories] = useState<category | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCategories = async () => {

    setLoading(true)
    const { data: category, error } = await supabase.from('category').select('*')
    if (error) {
      console.log(error.message)
    }
    if (category) {
      setCategories(category)
    }
    setLoading(false)

  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories, loading }

}

export default useCategories