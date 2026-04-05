import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function App() {
  const [carregando, setCarregando] = useState(true);
  const [pyodide, setPyodide] = useState(null);
  
  const [codigo, setCodigo] = useState('# Digite o seu código Python aqui...\na = 5\nb = 3\nprint("A soma é:", a + b)');
  const [saida, setSaida] = useState('> O resultado do cálculo aparecerá aqui...');

  useEffect(() => {
    async function iniciarPyodide() {
      try {
  
        const instancia = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        setPyodide(instancia);
        setCarregando(false);
      } catch (erro) {
        setSaida('> Erro ao carregar o motor Python. Verifique a consola.');
        console.error(erro);
      }
    }
    iniciarPyodide();
  }, []);

  const executarCodigo = async () => {
    if (!pyodide) return;
    
    setSaida('> A executar...\n');

    try {
  
      pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
      `);

      await pyodide.runPythonAsync(codigo);

      const resultado = pyodide.runPython("sys.stdout.getvalue()");
      
      setSaida(`> Resultado:\n${resultado}`);
    } catch (erro) {
      setSaida(`> Erro de execução:\n${erro.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="text-center">
          <h1 className="text-3xl font-bold text-blue-400">Laboratório de Cálculo Numérico</h1>
          <p className="text-gray-400 mt-2">Semana 3: Comandos Básicos e Implementação</p>
        </header>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="mb-4 text-sm font-medium">
            Status do Motor Python: {" "}
            {carregando ? (
              <span className="text-yellow-400">A iniciar o motor e as dependências...</span>
            ) : (
              <span className="text-green-400">Online e pronto a usar!</span>
            )}
          </div>

          <div className="h-64 rounded border border-gray-600 mb-4 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={codigo}
              onChange={(value) => setCodigo(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                padding: { top: 16 }
              }}
            />
          </div>
          
          <button 
            onClick={executarCodigo}
            disabled={carregando}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {carregando ? 'A aguardar motor...' : 'Executar Código'}
          </button>
        </div>

        <div className="bg-black p-4 rounded-lg border border-gray-700 h-48 overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap">
          {saida}
        </div>
      
      </div>
    </div>
  );
}

export default App;