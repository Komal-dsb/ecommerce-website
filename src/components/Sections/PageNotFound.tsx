import { useNavigate } from "react-router"
import { Button } from '@/components/ui/button'

function PageNotFound() {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center  bg-blue-50 items-center w-full h-[100vh]">
        <h1 className="text-blue-800 text-4xl font-bold">Page Not Found</h1>
        <Button className="bg-blue-700 text-white mt-8  hover:bg-blue-700"  onClick={ ()=> (navigate('/'))}>Back To Home  </Button>
    </div>
  )
}

export default PageNotFound