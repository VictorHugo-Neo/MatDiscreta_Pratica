export default function Sidebar({ planejamento, semanaAtiva, mudarSemana }) {
  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 p-4 flex-col hidden md:flex">
      <h2 className="text-xl font-bold text-blue-400 mb-6 border-b border-gray-800 pb-4">
        Laboratório Numérico
      </h2>
      <nav className="flex-1 overflow-y-auto space-y-2">
        {planejamento.map((semana) => (
          <button
            key={semana.id}
            onClick={() => mudarSemana(semana)}
            className={`w-full text-left px-4 py-3 rounded transition-colors cursor-pointer ${
              semanaAtiva.id === semana.id 
                ? 'bg-blue-600 text-white font-bold shadow' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            {semana.titulo.split(':')[0]}
          </button>
        ))}
      </nav>
    </aside>
  );
}