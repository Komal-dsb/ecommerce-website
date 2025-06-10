import { useEffect, useState } from 'react'
import { supabase } from '@/supabaseClient'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CalendarDays } from 'lucide-react'

interface Order {
  name: string
  id: number
  created_at: string
  total_price:number
}

export function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    // fetch order details
    const fetchOrders = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setOrders(data || [])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [])

  return (
    <div className="max-w-2xl mx-auto  px-4">
      <h2 className="text-2xl text-zinc-900 text-center font-semibold py-10 mb-6">Your Orders</h2>

      {loading && (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error loading orders</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-muted-foreground  text-2xl text-center">No orders found.</p>
      )}

      <div className="space-y-2">
        {orders.map((order) => (
        
            <Card key={order.id} className="hover:shadow-md transition">
              <CardContent className="p-4 flex justify-between text-zinc-900 items-center">
                <div>
        
                  <h3 className="text-lg font-medium">Order Id - {order.id}</h3>
                   <h3 className="text-lg font-medium">Name - {order.name}</h3>
                     <h3 className="text-lg font-medium">Total Price - $ {order.total_price}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              
              </CardContent>
            </Card>
       
        ))}
      </div>
    </div>
  )
}
