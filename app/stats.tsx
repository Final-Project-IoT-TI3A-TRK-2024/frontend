"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {CloudOff, Droplet, HardDriveUpload, Thermometer, Waves, Wheat} from "lucide-react";
import {LiveChart} from "@/app/chart";
import {useEffect, useState} from "react";
import { io } from "socket.io-client";
import {Button} from "@/components/ui/button";
import Predict from "@/app/predict";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const socket = io("http://192.168.0.171:5000");

type TemperatureData = {
  timestamp: number;
  temperature: number;
}

type HumidityData = {
  timestamp: number;
  humidity: number;
}

type SoilMoistureData = {
  timestamp: number;
  soil_moisture: number;
}

type SensorData = {
  timestamp: number;
  temperature: number;
  humidity: number;
  soil_moisture: number;
}

export default function Stats(){
  const [temperature, setTemperature] = useState([{timestamp: 0, temperature: 0}]);
  const [humidity, setHumidity] = useState([{timestamp: 0, humidity: 0}]);
  const [soilMoisture, setSoilMoisture] = useState([{timestamp: 0, soil_moisture: 0}]);
  const [connected, setConnected] = useState(false);
  const [soilSensorStatus, setSoilSensorStatus] = useState(false);

  useEffect(() => {
    socket.on('data', (data) => {
      const json_data = JSON.parse(data.data);
      const temperatures: TemperatureData[] = [];
      const humidities: HumidityData[] = [];
      const soilMoistures: SoilMoistureData[] = [];

      json_data.forEach((item: SensorData) => {
        temperatures.push({timestamp: item.timestamp, temperature: item.temperature});
        humidities.push({timestamp: item.timestamp, humidity: item.humidity});
        soilMoistures.push({timestamp: item.timestamp, soil_moisture: item.soil_moisture});
      });

      setHumidity(humidities);
      setTemperature(temperatures);
      setSoilMoisture(soilMoistures);
      setConnected(true);

      // range soil moisture 800 - 1000 is indicate that the sensor is not placed in the soil correctly
      if (json_data[0].soil_moisture >= 750 && json_data[0].soil_moisture <= 1000) {
        setSoilSensorStatus(false);
      }else{
        setSoilSensorStatus(true);
      }
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('connect_error', () => {
      setConnected(false);
    });

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Wheat className="align-middle"/>
            <h3 className="align-middle font-semibold text-2xl">Crop Irrigation Scheduling System</h3>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center text-sm gap-2">
            <div className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className={`inline-block w-2 h-2 bg-[#${connected ? "09CE6B" : "F87171"}] rounded-full animate-ping duration-[5000]`}/>
              <span>{connected ? "Live data stream" : "Data stream is currently unavailable"}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connected ? null : (
          <div className={"mb-4"}>
            <Alert variant={'destructive'}>
            <CloudOff className="h-4 w-4"/>
            <AlertTitle>Socket Disconnected</AlertTitle>
            <AlertDescription>
              Socket is not connected, please check your socket connection.
            </AlertDescription>
            </Alert>
          </div>
        )}
        {!soilSensorStatus ? (
          <div className={"mb-4"}>
            <Alert variant={'destructive'}>
            <CloudOff className="h-4 w-4"/>
            <AlertTitle>Soil Sensor Error</AlertTitle>
            <AlertDescription>
              Soil sensor is not placed in the soil correctly or the soil is too dry!
            </AlertDescription>
            </Alert>
          </div>
        ) : null}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <LiveChart label="Temperature" icon={Thermometer} color={"red"} data={temperature} key_name="temperature"/>
          </div>
          <div>
            <LiveChart label="Humidity" icon={Droplet} color={"blue"} data={humidity} key_name="humidity"/>
          </div>
          <div>
            <LiveChart label="Soil Moisture" icon={Waves} color={"brown"} data={soilMoisture} key_name="soil_moisture"/>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4 items-center justify-between flex-col sm:flex-row">
          <Predict/>
          <Button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            rel="noopener noreferrer"
          ><HardDriveUpload/> Collect Dataset
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}