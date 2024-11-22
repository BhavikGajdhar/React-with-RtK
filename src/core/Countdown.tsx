import { useEffect, useState } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const eventDate = new Date("2024-12-31T20:00:00").getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div>
      <h2>Countdown to New Year's Event</h2>
      <p className="time-left">
        {timeLeft.days} <span>Days</span> {timeLeft.hours} <span>Hours</span>
      </p>
    </div>
  );
};

export default Countdown;
