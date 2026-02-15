import EmailSubsciptionListing from "@/components/listing/EmailSubsciptionListing"
import { Heading } from "lucide-react"
import { Suspense } from "react"


const EmailSubsciblePage = () => {
  return (
    <div>
      <Heading >
        Email Subscible Listing
      </Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <EmailSubsciptionListing />
      </Suspense>
    </div>
  )
}

export default EmailSubsciblePage
