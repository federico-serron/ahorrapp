
import React, { useEffect, useState, useContext } from "react";
import Chart from "react-apexcharts";
import { Context } from "../store/appContext";

const RadialProgressChart = () => {
  const { actions } = useContext(Context);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const result = await actions.getGoalProgress();
        if (result && typeof result.percentage === "number") {
          setProgress(result.percentage);
        }
      } catch (error) {
        console.error("Error al obtener el progreso de la meta:", error);
      }
    };

    fetchProgress();
  }, []);

  const chartOptions = {
    chart: {
      type: "radialBar",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%"
        },
        dataLabels: {
          name: {
            fontSize: "16px"
          },
          value: {
            fontSize: "22px"
          },
          total: {
            show: true,
            label: "Progreso",
            formatter: () => `${progress || 0}%`
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#ABE5A1"],
        stops: [0, 100]
      }
    },
    colors: ["#00B8D9"],
    labels: ["Completado"]
  };

  const chartSeries = [progress || 0];

  return (
    <div className="shadow-sm" style={{ maxWidth: "260px", flexGrow: 1 }}>
      <Chart options={chartOptions} series={chartSeries} type="radialBar" height={300} />
    </div>
  );
};

export default RadialProgressChart;
