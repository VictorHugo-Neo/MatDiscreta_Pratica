export default function Instrucoes({ semanaAtiva, carregando }) {
  return (
    <div className="lg:col-span-1 space-y-4 bg-gray-800 p-6 rounded-lg border border-gray-700 h-fit">
      <div>
        <h3 className="text-lg font-bold text-blue-400 mb-2">Conceito</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{semanaAtiva.teoria}</p>
      </div>
      
      <div className="bg-gray-900 p-4 rounded border border-gray-700">
        <h3 className="text-md font-bold text-yellow-400 mb-2">Desafio Prático</h3>
        <p className="text-gray-300 text-sm">{semanaAtiva.desafio}</p>
      </div>

      <div className="pt-4 border-t border-gray-700 text-xs text-gray-500">
        Motor Python: {carregando ? <span className="text-yellow-400">Iniciando...</span> : <span className="text-green-400">Online</span>}
      </div>
    </div>
  );
}