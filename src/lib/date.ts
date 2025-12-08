export const formatDate = (dateString: string) => {
// Format a date string from "YYYY-MM-DD" to "YYYY-MM-DD"
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const dateForPicker = (iso: string) => {
// const iso = "2025-11-18T09:39:52.686Z";

const onlyDate = iso.split("T")[0]; 
 return onlyDate; // 2025-11-18
}