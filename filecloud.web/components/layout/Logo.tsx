import { Sixtyfour  } from "next/font/google";
import Image from "next/image";

const sixtyfour = Sixtyfour({   
  subsets: ["latin"],
  weight: "400", 
});

export default function Logo() {
    return (
       <div className="flex items-center space-x-2">
        <Image
            src="/Icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className={`${sixtyfour.className} text-xl font-semibold text-primary`}>FileCloud</span>
       </div>
    );
}   