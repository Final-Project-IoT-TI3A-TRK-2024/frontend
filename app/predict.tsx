import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {TrendingUpDown} from "lucide-react";
const random_float = (min: number, max: number, fraction: number) => {
  return (Math.random() * (max - min) + min).toFixed(fraction);
}

const random_integer = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const generate_dummy_data = () => {
  return {
    model: "model",
    N: random_integer(60, 90),
    P: random_integer(30, 90),
    K: random_integer(15, 85),
    temperature: random_float(15, 35, 4),
    humidity: random_float(15, 80, 4),
    ph: random_float(4, 8, 5),
    rainfall: random_float(100, 300, 4)
  }
}

export default function Predict() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            rel="noopener noreferrer"
            onClick={() => console.log("Predict")}
          >
            <TrendingUpDown/>
            Predict
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          Hasil prediksi
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}