import Editor from '@monaco-editor/react';

export default function EditorPython({ codigo, setCodigo, executarCodigo, carregando }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
      <div className="h-80 rounded border border-gray-600 mb-4 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={codigo}
          onChange={(value) => setCodigo(value || '')}
          options={{ minimap: { enabled: false }, fontSize: 16, padding: { top: 16 } }}
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
  );
}