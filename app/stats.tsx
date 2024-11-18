import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Droplet, HardDriveUpload, Thermometer, TrendingUpDown, Waves} from "lucide-react";

export default function Stats(){
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="font-semibold text-2xl">Crop Recommendation System</h3>
        </CardTitle>
        <CardDescription>
          <div className="max-w-6xl w-full mx-auto">
            <div className="flex items-center text-sm gap-2">
              <div className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#09CE6B] rounded-full animate-ping duration-[5000]"/>
                Live Data Stream
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Thermometer/>
            <strong>Temperature</strong>
            <p>25°C</p>
          </div>
          <div>
            <Droplet/>
            <strong>
              Humidity
            </strong>
            <p>50%</p>
          </div>
          <div>
            <Waves/>
            <strong>Soil</strong>
            <p>45</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4 items-center justify-between flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TrendingUpDown/>
            Predict
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          ><HardDriveUpload/> Collect Dataset
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}