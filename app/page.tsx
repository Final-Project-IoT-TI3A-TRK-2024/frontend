import Image from "next/image";
import {Dot, Heart} from "lucide-react";
import Stats from "@/app/stats";

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
export default function Home() {
  return (
    <div className="grid p-8 pb-20 gap-10 font-[family-name:var(--font-geist-sans)]">
      <div className="items-center justify-items-center">
        <Image
          src="/images/polines.png"
          alt="Polines Logo"
          width={180}
          height={38}
          priority
        />
      </div>
      <main className="flex flex-col gap-2">
        <Stats/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button className="flex items-center gap-2 hover:underline hover:underline-offset-4" variant="link">
              Teknologi Rekayasa Komputer<Dot/>TI-3A
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Who are we?</h4>
                <p className="text-sm">
                  The IoT Agriculture Team is a group of students from the Politeknik Negeri Semarang who are passionate about agriculture and technology.
                </p>
                <div className="flex items-center pt-2">
                  <Heart className="mr-2 h-4 w-4 opacity-70" fill={"red"}/>{" "}
                  <span className="text-xs text-muted-foreground">
                    Made with love.
              </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </footer>
    </div>
  );
}
