export default function Terminal({ saida, setSaida }) {
  return (
    <div className="bg-black rounded-lg border border-gray-700 flex flex-col h-48 overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
        <span className="text-xs font-mono text-gray-400">Terminal Output</span>
        <button 
          onClick={() => setSaida('>_')}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
          title="Limpar Terminal"
        >
          Limpar (Clear)
        </button>
      </div>
      
      
      <div className="p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-y-auto flex-1">
        {saida}
      </div>
    </div>
  );
}