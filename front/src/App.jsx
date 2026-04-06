import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';


const PLANEJAMENTO = [
  {
    id: 3,
    titulo: "Semana 3: Comandos básicos e implementação",
    teoria: "Bem-vindos! O objetivo desta semana é entender como o computador processa operações matemáticas básicas.",
    desafio: "Declare duas variáveis, a e b, e imprima a soma delas usando o comando print().",
    codigoPadrao: "# Digite seu código Python aqui...\na = 5\nb = 3\nprint('A soma é:', a + b)"
  },
  {
    id: 4,
    titulo: "Semana 4: Introdução ao cálculo numérico",
    teoria: "O cálculo numérico é fundamental para resolver problemas matemáticos que não possuem solução exata simples.",
    desafio: "Crie uma função em Python para calcular o valor de f(x) = x^2 - 4. Depois, teste a função passando o valor x = 2.",
    codigoPadrao: "def f(x):\n    # Escreva sua lógica aqui\n    pass\n\nprint('O resultado de f(2) é:', f(2))"
  },
  {
    id: 5,
    titulo: "Semana 5: Análise numérica e aplicações",
    teoria: "A análise numérica nos ajuda a entender o comportamento das funções.",
    desafio: "Crie um loop (for ou while) que imprima os valores de x de 1 a 5 e seus respectivos quadrados.",
    codigoPadrao: "print('Valores de x e seus quadrados:')\n# Crie seu loop aqui..."
  }
];


function App() {
  const [carregando, setCarregando] = useState(true);
  const [pyodide, setPyodide] = useState(null);

  const [semanaAtiva, setSemanaAtiva] = useState(PLANEJAMENTO[0]);

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

  const mudarSemana = (semana) => {
    setSemanaAtiva(semana);
    setCodigo(semana.codigoPadrao);
    setSaida('> O resultado do cálculo aparecerá aqui...');
  };

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
      <aside className="w-64 bg-gray-950 border-r border-gray-800 p-4 flex flex-col hidden md:flex">
        <h2 className="text-xl font-bold text-blue-400 mb-6 border-b border-gray-800 pb-4">
          Laboratório Numérico
        </h2>
        <nav className="flex-1 overflow-y-auto space-y-2">
          {PLANEJAMENTO.map((semana) => (
            <button
              key={semana.id}
              onClick={() => mudarSemana(semana)}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${semanaAtiva.id === semana.id
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
            >
              Semana {semana.id}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">

          <header className="border-b border-gray-800 pb-4">
            <h1 className="text-3xl font-bold text-gray-100">{semanaAtiva.titulo}</h1>
          </header>

          {/* Grid: Instruções na esquerda, Editor na direita */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Coluna de Instruções */}
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

            {/* Coluna do Editor e Terminal */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                <div className="h-80 rounded border border-gray-600 mb-4 overflow-hidden">
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
                  {carregando ? 'Aguardando motor...' : 'Executar Código'}
                </button>
              </div>

              {/* Terminal */}
              <div className="bg-black p-4 rounded-lg border border-gray-700 h-48 overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap">
                {saida}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;