import React from 'react'
import  Image  from "next/image";
import Link from "next/link";


const image = ["/static/nature01.jpg", "/static/nature02.webp", "/static/nature03.jpg", "/static/nature02.webp", "/static/nature01.jpg"]


const NewBlog = (props: Props) => {
  return (
    <div className='w-full  grid grid-cols-4 gap-4 mt-6'>

        {Array.from({ length: 5 }).map((_, index) => {
           if (index === 0) {
            return (<AddBlog key={index} />)

           }

           return (
            <BlogCard image={image[index]} key={index} />
        )})}

        
    </div>
  )
}

export default NewBlog

function AddBlog() {
    return (
        
            <Link href="/crm-dashboard/add-blogs" className='w-full group flex bg-white hover:bg-gray-50 items-center justify-center rounded-2xl  my-2'>

            
            <div className="w-full group-hover:scale-105 grid place-items-center text-gray-400 h-[90%] transation duration-500 rounded-2xl border-2 border-dashed m-4  " >
                <div>

                <h2 className="text-4xl">
                Add Blog
                </h2>
                <p className='text-center text-sm'>Create New Blog</p>

                </div>
            </div>


        </Link>


    )
}


function BlogCard({image}: {image: string}) {
    return (
        <div className='w-full  group flex bg-white  rounded-2xl  my-2'>

            <div className="w-[40%] ] relative">
            <Image src={image} alt='blog' fill className='w-full rounded-l-2xl group-hover:scale-105 group-hover:rounded-r-2xl transition duration-500 h-full object-cover ' />
            </div>
            
            <div className="w-[60%] p-4 flex flex-col gap-2">

            <div>
            <p className='text-2xl font-semibold font-serif'>Blog Title</p>
            <p className='text-sm text-gray-700 line-clamp-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit tempore, iusto itaque veniam suscipit perspiciatis dolor animi ad eum, quaerat non facilis at quae odio culpa. Voluptates a ut deleniti?</p>

            </div>
            <div className="flex justify-between items-center mt-auto">
                <p className='text-sm   font-semibold'>10 Aug 2025</p>
                <p className='text-sm  bg-black rounded text-white px-2 py-1'>Tag</p>
            </div>
        </div>
            </div>
    )
    
}