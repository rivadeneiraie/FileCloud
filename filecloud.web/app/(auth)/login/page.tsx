
export default function Login() {

  return (
      <div className="grow flex items-center justify-center">
        <div className="bg-surface rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
          <h2 className="text-primary text-2xl font-bold mb-4">¡Bienvenido a FileCloud!</h2>
          <p className="mb-6 text-center">
              {`Este es un texto de ejemplo para probar tu paleta de colores personalizada en Tailwind CSS.`}
          </p>
          <div className="flex gap-4 w-full">
            <button 
                className="flex-1 bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors" 
            >
                Botón primario
            </button>
            <button className="flex-1 bg-accent text-primary py-2 px-4 rounded hover:bg-secondary transition-colors">Botón secundario</button>
          </div>
        </div>
      </div>
  );
}