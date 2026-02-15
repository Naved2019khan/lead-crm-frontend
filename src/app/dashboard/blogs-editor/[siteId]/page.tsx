import React from 'react'
import BlogEditor from '@/components/section/blogs/BlogEditor'
import { blogServerAPI } from '@/services/api/blog-api-server'
import { NavigationButton } from '@/components/button/NavigationButton'


const Page = async ({ searchParams }: { searchParams: Promise<{ id?: string }> }) => {
  const params = await searchParams;
  const identifier = params.id;
  let initialData = undefined;

  if (identifier) {
    try {
      const response = await blogServerAPI.getOne(identifier);
      initialData = response.data;
    } catch (error) {
      console.error("Error fetching blog for editor:", error);
    }
  }

  return (<>
    <NavigationButton label='Blog Listing' backLink='/dashboard/blogs-listing' />
    <BlogEditor initialData={initialData} />
  </>)

}

export default Page