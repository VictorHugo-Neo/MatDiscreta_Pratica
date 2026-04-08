import { useState, useEffect } from 'react';

export function usePython(codigoInicial) {
  const [carregando, setCarregando] = useState(true);
  const [pyodide, setPyodide] = useState(null);
  const [codigo, setCodigo] = useState(codigoInicial);
  const [saida, setSaida] = useState('> Aguardando execução...');

  useEffect(() => {
    async function iniciarPyodide() {
      try {
        const instancia = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        setPyodide(instancia);
        setCarregando(false);
      } catch (erro) {
        setSaida('> Erro ao carregar o motor Python.');
        console.error(erro);
      }
    }
    iniciarPyodide();
  }, []);

  const executarCodigo = async () => {
    if (!pyodide) return;
    setSaida('> Executando...\n');

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

  return { carregando, codigo, setCodigo, saida, setSaida, executarCodigo };
}