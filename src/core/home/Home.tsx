import Countdown from "../Countdown";
import "./Home.css"; // Link the shared CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="card">
        <Countdown />
      </div>
      <div className="card event-card">
        <h3>Event Description:</h3>
        <p>
          Celebrate the New Year with us at #404 Nilamber Primero, Vasna -
          Bhayli Main Rd, near Nilamber Circle, Vadodara, Gujarat 390021
        </p>
        <p>Date: 31st December 2024</p>
        <p>Time: 08:00 p.m. IST</p>
      </div>
    </div>
  );
};

export default Home;
