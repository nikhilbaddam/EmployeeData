import React, { useContext } from 'react';
import { StoreContext } from '../storeContext'; // Import the context

const Home = () => {
  const { username } = useContext(StoreContext); // Get the username from context

  return (
    <div className="bg-blue-300 text-white h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">
        Welcome {username ? username : 'Guest'}!
      </h1>
      <p className="text-2xl">
        We're glad to have you here!
      </p>
    </div>
  </div>
  );
}

export default Home;
