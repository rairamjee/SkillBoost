"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function Retention() {
  interface Retention {
    id: number;
    trainingId: number;
    userId: number;
    isRetained: boolean;
  }

  const [allRetention, setAllRetention] = useState<Retention[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/retention");
        setAllRetention(response.data); // Updating the retention list
      } catch (err) {
        setError("Failed to fetch details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process data for the line chart
  const processRetentionData = (data: Retention[]) => {
    const retentionRates: Record<number, { retained: number; total: number }> = {};

    data.forEach(({ trainingId, isRetained }) => {
      if (!retentionRates[trainingId]) {
        retentionRates[trainingId] = { retained: 0, total: 0 };
      }

      retentionRates[trainingId].total += 1;
      if (isRetained) {
        retentionRates[trainingId].retained += 1;
      }
    });

    // Calculate retention percentages
    const labels = Object.keys(retentionRates).map(Number);
    const retentionValues = labels.map((id) => {
      const { retained, total } = retentionRates[id];
      return (retained / total) * 100; // Convert to percentage
    });

    return { labels, retentionValues };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { labels, retentionValues } = processRetentionData(allRetention);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Retention Rate (%)",
        data: retentionValues,
        fill: false,
        backgroundColor: "#2F3E46",
        borderColor: "#2F3E46",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Retention Rate by Training ID</h2>
      <Line data={data} />
    </div>
  );
}

export default Retention;
