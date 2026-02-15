import { getFlightSites } from '@/services/api/product-api'
import CaptureLead from './CaptureLead'
import { getAllCapture } from '@/services/api/captue-api'
import { ProductGrid } from '../grid/ProductGrid'


export const CaptureLeadWrapper = async () => {
    const response = await getAllCapture()
  return (
    <CaptureLead allCapture={response?.data}/>
  )
}
export const FlightSiteWrapper = async () => {
    const response = await getFlightSites()
    console.log(response,":::")
  return (
    <ProductGrid sites={response?.data}/>
  )
}
