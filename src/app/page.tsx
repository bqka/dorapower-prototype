'use client';

import React, { useEffect, useState } from 'react';
import DateGHIForm from "@/components/DateGHIForm";
import CesiumWrapper from "../components/CesiumWrapper";
import type { Position } from "../types/position";

// Simulate data fetching
const fetchData = async (): Promise<Position> => {
  return {
    lat: 28.749968,
    lng: 77.117682,
  };
};

const Home = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setPosition(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  if (!position) {
    return <div>No data available</div>; // Handle the case when no data is available
  }

  return (
    <main className="h-screen w-screen">
      <div className="flex flex-row h-full">
        <div className="w-[65%]">
          <CesiumWrapper positions={[position]} />
        </div>
        <div className="flex-grow bg-zinc-900">
          <DateGHIForm />
        </div>
      </div>
    </main>
  );
};

export default Home;
