import { WindowsBootConfig, BootEntry } from '../types';

interface WindowsPreviewProps {
  config: WindowsBootConfig;
  entries: BootEntry[];
}

export default function WindowsPreview({ config, entries }: WindowsPreviewProps) {
  const enabledEntries = entries.filter(e => e.enabled);
  const defaultEntry = entries.find(e => e.isDefault);
  const timeout = parseInt(config.timeout) || 30;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Vista Previa del Boot Manager de Windows</h2>
        <p className="text-gray-400">Así se verá el menú de arranque de Windows con tu configuración actual</p>
      </div>

      {/* Windows Boot Manager Preview */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-3 border-b border-gray-700 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">Vista previa del Boot Manager de Windows</span>
        </div>

        {/* Simulated Windows Boot Screen */}
        <div className="bg-[#1a1a2e] p-8 md:p-12 min-h-[500px] flex flex-col items-center justify-center relative">
          {/* Windows Boot Manager Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M3 12V6.75L9 5.43V11.91L3 12Z" fill="#0078D4"/>
                <path d="M9.5 5.31V12H21V3.5L9.5 5.31Z" fill="#0078D4"/>
                <path d="M3 12.5L9 12.5V19.07L3 17.75V12.5Z" fill="#0078D4"/>
                <path d="M9.5 12.5V19.19L21 21V12.5H9.5Z" fill="#0078D4"/>
              </svg>
              <h3 className="text-white text-xl font-semibold">Windows Boot Manager</h3>
            </div>
          </div>

          {/* Boot Menu */}
          {config.displayBootMenu === 'Yes' ? (
            <div className="w-full max-w-md">
              <div className="space-y-2">
                {enabledEntries.map((entry, index) => {
                  const isDefault = entry.isDefault;
                  return (
                    <div
                      key={entry.id}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        isDefault
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {entry.name.toLowerCase().includes('windows') ? '🪟' : 
                           entry.name.toLowerCase().includes('ubuntu') || entry.name.toLowerCase().includes('linux') ? '🐧' : '💾'}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{entry.name}</p>
                          {isDefault && (
                            <p className="text-xs text-blue-400 mt-0.5">Predeterminado</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {enabledEntries.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <p>No hay entradas habilitadas</p>
                </div>
              )}

              {/* Footer info */}
              <div className="mt-8 text-center space-y-2">
                <p className="text-gray-400 text-sm">
                  Elegir: <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">↑↓</kbd>
                  {' '}Aceptar: <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Enter</kbd>
                </p>
                <p className="text-gray-500 text-xs">
                  Arranque automático en {timeout} segundos...
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">
                Iniciando {defaultEntry?.name || 'Windows 11'}...
              </p>
              <p className="text-gray-500 text-sm mt-2">
                (Menú oculto - Mantén Shift para acceder)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryCard
          title="⏱️ Tiempo de Espera"
          items={[
            { label: 'Timeout', value: `${config.timeout} segundos` },
            { label: 'Mostrar menú', value: config.displayBootMenu === 'Yes' ? 'Sí' : 'No' },
          ]}
        />
        <SummaryCard
          title="🎯 Arranque"
          items={[
            { label: 'Entrada por defecto', value: defaultEntry?.name || 'No definida' },
            { label: 'Opciones avanzadas', value: config.advancedOptions === 'Yes' ? 'Visibles' : 'Ocultas' },
          ]}
        />
        <SummaryCard
          title="🔒 Seguridad"
          items={[
            { label: 'Test Signing', value: config.testSigning === 'Yes' ? 'Activado' : 'Desactivado' },
            { label: 'NX Policy', value: config.nxPolicy },
          ]}
        />
        <SummaryCard
          title="⚡ Rendimiento"
          items={[
            { label: 'PAE Policy', value: config.paePolicy },
            { label: 'Debug', value: config.bootDebug === 'Yes' ? 'Activado' : 'Desactivado' },
          ]}
        />
      </div>

      {/* Info about bcdedit */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
        <span className="text-xl">💡</span>
        <div>
          <p className="text-sm text-blue-300 font-medium">Sobre el Boot Manager de Windows</p>
          <p className="text-xs text-blue-400/80 mt-1">
            El Boot Manager de Windows (anteriormente NTLDR) gestiona el arranque en sistemas Windows Vista y posteriores. 
            La configuración se almacena en el BCD (Boot Configuration Data) y se edita con <code className="bg-blue-900/30 px-1 rounded">bcdedit</code> desde una terminal con privilegios de administrador.
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
      <h4 className="font-medium text-white text-sm mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-gray-400">{item.label}</span>
            <span className="text-gray-200 font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
