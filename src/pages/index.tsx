import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from 'react';
import LineChart from "@/components/LineChart";


export default function Home() {

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    regenerateData();
  }, []);

  function regenerateData() {
    const chartData = [];
    for (let i = 0; i < 20; i++) {
      const value = Math.floor(Math.random() * i + 3);
      chartData.push({
        label: i,
        value,
        tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
      });
    }
    setData(chartData)
  }

  const data1 = [
    { date: new Date('2022-01-01'), value: 10 },
    { date: new Date('2022-02-01'), value: 20 },
    { date: new Date('2022-03-01'), value: 30 },
    { date: new Date('2022-04-01'), value: 25 },
    { date: new Date('2022-05-01'), value: 35 },
  ];

  return (
    <>
      <div>
      <button onClick={regenerateData}>Change Data</button>
      <LineChart data={data} width={800} height={500} />
      </div>
    </>
  );
}
