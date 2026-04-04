import {useState} from 'react'
import Editor from "@monaco-editor/react"

function App(){
  const [carregando, setCarregando] = useState(true)

  const [codigo, setCodigo] = useState("# Digite seu código Python aqui..")
  const [saida, setSaida] = useState(">O resultado do cálculo aparecerá aqui...")

  const executarCodigo = () => {
    setSaida(`>Executando código...\n${codigo}\n>Resultado: 42`)

  }
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

          <div className = "h-64 rounded border border-gray-600 mb-4 overflow-hidden">
            <Editor
              height='100%'
              defaultLanguage='python'
              theme='vs-dark'
              value={codigo}
              onChange={(value) => setCodigo(value || '')}
              options={{
                minimap: { enabled: false},
                fontSize: 16,
                padding: {top: 16}
              }}
            />
          </div>
          <button
            onClick={executarCodigo}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Executar Código
          </button>
        </div>

        <div className = "bg-black p-4 rounded-lg border border-gray-700 h-48 overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap">
          {saida}
        </div>
      
      </div>
    </div>
  )
}
export default App