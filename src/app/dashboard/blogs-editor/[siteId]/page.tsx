import React from 'react'
import BlogEditor from '@/components/section/blogs/BlogEditor'
import { blogAPI } from '@/services/api/blog-api'
import { NavigationButton } from '@/components/button/NavigationButton'


const Page = async({searchParams}) => {
  const identifier = (await searchParams).id
  let initialData = {}
  if(searchParams){
    const response = await blogAPI.getOne(identifier)
    initialData = response.data
  }

  return (<>
  <NavigationButton label='Blog Listing' backLink='/dashboard/blogs-listing' />
  <BlogEditor initialData={initialData} />
  </>)
  
}

export default Page