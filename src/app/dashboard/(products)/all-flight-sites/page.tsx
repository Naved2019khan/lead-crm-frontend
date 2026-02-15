import { Heading } from '@/components/ui/Heading';
import { FlightSiteWrapper } from '@/components/listing/Wrapper';
import { Suspense } from 'react';


function Page({ }) {

  return (
    <div className='mx-12 mt-4'>
      <Heading level="h2" align="left" subtitle='Flight Lead Section'>Flight Sites</Heading>
      <Suspense fallback={<div>Loading...</div>} >
        <FlightSiteWrapper />
      </Suspense>
    </div>
  )
}

export default Page
