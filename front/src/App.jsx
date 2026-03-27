import {useState} from 'react'

function App(){
  const [carregando, setCarregando] = useState(true)

  return (
    <div className = "min-h-screen bg-gray-900 text-gray-100 font-sans p-8">
      <div className = "max-w-4xl mx-auto space-y-6">
        <header className = "text-center">
          <h1 className = "text-3xl font-bold text-blue-400">Laboratório de Cálculo Numérico</h1>
          <p className = "text-gray-400 mt-2">Semana 3: Comandos Básicos e Implementação</p>
        </header>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">

          <div className="mb-4 text-sm font-medium">
            Status do Motor Python: {" "}
            <span className = "text-yellow-400">Aguardando conexão...</span>

          </div>
          
        </div>
      </div>
    </div>
  )
}
export default App 