import Image from "next/image";
import { Sixtyfour  } from "next/font/google";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./images/Icon.png";

const sixtyfour = Sixtyfour({
  subsets: ["latin"],
  weight: "400", 
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className={`${sixtyfour.className} text-xl font-semibold text-primary`}>FileCloud</span>
        </div>
        <div className="w-1/3 bg-surface rounded-lg shadow-lg flex items-center px-3 py-3 "> 
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-transparent outline-none text-primary placeholder:text-primary"
          />
          <FontAwesomeIcon icon={faSearch}  className="text-secondary mr-2 w-5 h-5 hover:text-primary"  />
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-surface rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
          <h2 className="text-primary text-2xl font-bold mb-4">¡Bienvenido a FileCloud!</h2>
          <p className="text-secondary mb-6 text-center">Este es un texto de ejemplo para probar tu paleta de colores personalizada en Tailwind CSS.</p>
          <div className="flex gap-4 w-full">
            <button className="flex-1 bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors">Botón primario</button>
            <button className="flex-1 bg-accent text-primary py-2 px-4 rounded hover:bg-secondary transition-colors">Botón secundario</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 