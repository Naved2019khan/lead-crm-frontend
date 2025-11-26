export  function Alert({ type = "error", message }) {
  const base = "w-full px-4 py-3 rounded-lg font-medium text-sm mt-2 border-l-4";

  const styles = {
    error: "bg-red-50 text-red-700 border-red-600",
    success: "bg-green-50 text-green-700 border-green-600",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-600",
    info: "bg-blue-50 text-blue-700 border-blue-600",
  };

  return <div className={`${base} ${styles[type]}`}>{message}</div>;
}
