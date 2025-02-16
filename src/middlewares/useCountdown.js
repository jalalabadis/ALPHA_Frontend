import { useState, useEffect } from "react";

const useCountdown = (initialSeconds) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    setTimeLeft(initialSeconds); // 🔥 নতুন initialSeconds আসলে আপডেট হবে

    if (initialSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds]); // 🔥 Dependency হিসেবে initialSeconds দেয়া হয়েছে

  // সময়কে "0h:1m:59s" ফরম্যাটে রূপান্তর
  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return `${h}h:${m}m:${s}s`;
};

export default useCountdown;
