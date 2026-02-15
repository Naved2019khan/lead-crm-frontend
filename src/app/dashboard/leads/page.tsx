import LeadListing from '@/components/listing/LeadListing';
import { getAllLeads } from '@/services/api/crm';
import React from 'react';


const LeadPage = async () => {
    const leads = (await getAllLeads()).leads;
    return(
        <div className='px-4 mt-8 mx-4'>
            <LeadListing leads={leads} />
        </div>
    )
}

export default LeadPage
