interface CommandOutputProps {
  commands: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
}

export default function CommandOutput({ commands, copied, onCopy, onClose }: CommandOutputProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Script de Instalación</h3>
              <p className="text-xs text-gray-400">Copia y ejecuta este script en tu terminal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Instructions */}
        <div className="px-4 py-3 bg-yellow-500/5 border-b border-gray-700">
          <div className="flex gap-2 items-start">
            <span className="text-yellow-400">⚠️</span>
            <div className="text-xs text-yellow-200/80">
              <p className="font-medium text-yellow-300">Instrucciones:</p>
              <ol className="list-decimal list-inside mt-1 space-y-0.5">
                <li>Copia el script con el botón de abajo</li>
                <li>Abre una terminal en Ubuntu (<code className="bg-yellow-900/30 px-1 rounded">Ctrl+Alt+T</code>)</li>
                <li>Crea el archivo: <code className="bg-yellow-900/30 px-1 rounded">nano grub-config.sh</code></li>
                <li>Pega el contenido (Ctrl+Shift+V) y guarda (Ctrl+O, Enter)</li>
                <li>Ejecuta: <code className="bg-yellow-900/30 px-1 rounded">sudo bash grub-config.sh</code></li>
              </ol>
            </div>
          </div>
        </div>

        {/* Code Block */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="bg-gray-950 rounded-xl p-4 text-sm font-mono overflow-x-auto border border-gray-700">
            <code className="text-gray-300">
              {commands.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-gray-600 select-none w-8 text-right mr-4 flex-shrink-0">{i + 1}</span>
                  <span className={
                    line.startsWith('#') ? 'text-green-400' :
                    line.startsWith('sudo') ? 'text-yellow-300' :
                    line.startsWith('echo') ? 'text-blue-400' :
                    line.includes('=') && !line.startsWith(' ') ? 'text-purple-300' :
                    'text-gray-300'
                  }>
                    {line || '\u00A0'}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            El script crea un backup automático antes de modificar GRUB
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={onCopy}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ¡Copiado!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar Script
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
