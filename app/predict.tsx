import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import {Button} from "@/components/ui/button";
import {Flower2, TrendingUpDown} from "lucide-react";
import {useState} from "react";

const sendData = async (crop_type, temperature, humidity, soil_moisture) => {
  const response = await fetch(process.env.BACKEND_URL + "/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      crop_type,
      temperature,
      humidity,
      soil_moisture,
    }),
  })

  return response.json()
}

export default function Predict({data}) {
  const latest_data = data?.[0] || {
    temperature: 0,
    humidity: 0,
    soil_moisture: 0,
  }

  const [prediction, setPrediction] = useState(null)
  const [predicted, setPredicted] = useState(false)
  const [open, setOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");

  const cropOptions = [
    { value: "1", label: "Wheat" },
    { value: "2", label: "Groundnuts" },
    { value: "3", label: "Garden Flowers" },
    { value: "4", label: "Maize" },
    { value: "5", label: "Paddy" },
    { value: "6", label: "Potato" },
    { value: "7", label: "Pulse" },
    { value: "8", label: "Sugarcane" },
    { value: "9", label: "Coffee" },
  ];

  const predictData = async () => {
    const response = await sendData(1, latest_data.temperature, latest_data.humidity, latest_data.soil_moisture)
    setPrediction(response.prediction)
    setPredicted(true)
  }

  const handleDialogClose = () => {
    setPredicted(false);
    setPrediction(null);
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#023336] text-background gap-2 hover:bg-[#012A2C] dark:hover:bg-[#034A4F] focus:ring-2 focus:ring-offset-2 focus:ring-[#023336] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          rel="noopener noreferrer">
            <TrendingUpDown/>
            Predict
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Predict Irrigation</DialogTitle>
          <DialogDescription>
            Predict the irrigation state of the crop based on the current data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label className="block text-sm font-semibold">Select Crop Type</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2 text-sm"
            >
              <option value="" disabled>Select a crop</option>
              {cropOptions.map((crop) => (
                <option key={crop.value} value={crop.value}>
                  {crop.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Temperature</label>
            <input
              value={latest_data.temperature}
              type="number"
              className="w-full rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2 text-sm"
              placeholder="Temperature"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Humidity</label>
            <input
              value={latest_data.humidity}
              type="number"
              className="w-full rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2 text-sm"
              placeholder="Humidity"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Soil Moisture</label>
            {latest_data.soil_moisture > 750 && latest_data.soil_moisture <= 1000 ? (
              <div className="text-red-500 text-sm">Soil moisture is too high, sensor might be misplaced!</div>
            ) : null}
            <input
              value={latest_data.soil_moisture}
              type="number"
              className="w-full rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2 text-sm"
              placeholder="Soil Moisture"
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={predictData}>Predict</Button>
        </DialogFooter>
        <div className="flex items-center gap-4">
          {predicted && prediction ?
            <Alert>
              <Flower2 className="h-6 w-6"/>
              <AlertTitle><strong>Yes</strong></AlertTitle>
              <AlertDescription>
                The crop requires irrigation.
              </AlertDescription>
            </Alert>
            : null
          }

          {predicted && !prediction ?
            <Alert variant={'destructive'}>
              <Flower2 className="h-6 w-6"/>
              <AlertTitle><strong>No</strong></AlertTitle>
            <AlertDescription>
              The crop does not require irrigation.
            </AlertDescription>
          </Alert>
            : null
          }

        </div>
      </DialogContent>
    </Dialog>
  )
}