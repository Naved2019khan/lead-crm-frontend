// app/actions.ts (or defined directly in the Server Component)
'use server';
import { revalidatePath } from 'next/cache';

export async function updateSiteAction() {
  // 1. Logic to save data to the database

  // 2. Tell Next.js to invalidate the cache for the page that displays the data
  // '/' is often the route for the data you just updated
  // Revalidate paths that use the leads data
  revalidatePath('/');
  revalidatePath('/dashboard/leads');
}