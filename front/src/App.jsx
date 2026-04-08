import { useState } from 'react';
import { usePython } from './hooks/usePython';
import { PLANEJAMENTO } from './data/planejamento';

import Sidebar from './components/Sidebar';
import Instrucoes from './components/Instrucoes';
import EditorPython from './components/EditorPython';
import Terminal from './components/Terminal';

function App() {
  const [semanaAtiva, setSemanaAtiva] = useState(PLANEJAMENTO[0]);
  
  const { carregando, codigo, setCodigo, saida, setSaida, executarCodigo } = usePython(semanaAtiva.codigoPadrao);

  const mudarSemana = (semana) => {
    setSemanaAtiva(semana);
    setCodigo(semana.codigoPadrao);
    setSaida('> Aguardando execução...');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex">
      <Sidebar 
        planejamento={PLANEJAMENTO} 
        semanaAtiva={semanaAtiva} 
        mudarSemana={mudarSemana} 
      />

      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <header className="border-b border-gray-800 pb-4">
            <h1 className="text-3xl font-bold text-gray-100">{semanaAtiva.titulo}</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Instrucoes 
              semanaAtiva={semanaAtiva} 
              carregando={carregando} 
            />

            <div className="lg:col-span-2 space-y-4">
              <EditorPython 
                codigo={codigo} 
                setCodigo={setCodigo} 
                executarCodigo={executarCodigo} 
                carregando={carregando} 
              />
              
              <Terminal 
                saida={saida} 
                setSaida={setSaida} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;