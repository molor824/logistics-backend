import { useEffect, useState } from "react";

function datePadding(date: any) {
  return String(date).padStart(2, "0");
}
export default function CurrentDate() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="opacity-75 text-white">
      {date.getFullYear()}/{datePadding(date.getMonth())}/
      {datePadding(date.getDate())} {datePadding(date.getHours())}:
      {datePadding(date.getMinutes())}:{datePadding(date.getSeconds())}
    </div>
  );
}
