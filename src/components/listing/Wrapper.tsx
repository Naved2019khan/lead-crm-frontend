"use client";

import { useEffect, useState } from 'react';
// import { getFlightSites } from '@/services/api/product-api';
import CaptureLead from './CaptureLead';
import { getAllCapture } from '@/services/api/captue-api';
// import { ProductGrid } from '../grid/ProductGrid';

export const CaptureLeadWrapper = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCapture();
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching capture leads:", error);
      }
    };
    fetchData();
  }, []);

  return <CaptureLead allCapture={data} />;
};

// export const FlightSiteWrapper = () => {
//   const [sites, setSites] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getFlightSites();
//         setSites(response?.data);
//       } catch (error) {
//         console.error("Error fetching flight sites:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return <ProductGrid sites={sites} />;
// };
