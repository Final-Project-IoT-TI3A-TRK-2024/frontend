import Image from "next/image";
import {Dot} from "lucide-react";
import Stats from "@/app/stats";

export default function Home() {
  return (
    <div className="grid p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
        <Stats />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Teknologi Rekayasa Komputer<Dot />TI-3A
        </a>
      </footer>
    </div>
  );
}
