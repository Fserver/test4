import { GrubConfig, BootEntry } from '../types';

interface GrubPreviewProps {
  config: GrubConfig;
  entries: BootEntry[];
}

export default function GrubPreview({ config, entries }: GrubPreviewProps) {
  const enabledEntries = entries.filter(e => e.enabled);
  const defaultIdx = entries.findIndex(e => e.isDefault && e.enabled);
  const timeout = parseInt(config.GRUB_TIMEOUT) || 5;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Vista Previa del Menú GRUB</h2>
        <p className="text-gray-400">Así se verá tu menú GRUB con la configuración actual</p>
      </div>

      {/* GRUB Screen Preview */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-3 border-b border-gray-700 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">Vista previa del menú GRUB</span>
        </div>

        {/* Simulated GRUB Screen */}
        <div className="bg-gray-950 p-8 md:p-12 min-h-[500px] flex flex-col justify-between relative">
          {/* Background overlay */}
          {config.GRUB_BACKGROUND && (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-950/95"></div>
          )}

          <div className="relative z-10">
            {/* GRUB Header */}
            <div className="text-center mb-8">
              <h3 className="text-white text-xl font-bold mb-1">GNU GRUB</h3>
              <p className="text-gray-400 text-sm">version 2.12</p>
            </div>

            {/* Menu Entries */}
            <div className="max-w-lg mx-auto space-y-0.5">
              {enabledEntries.map((entry, index) => {
                const isDefault = index === defaultIdx;
                const isHighlighted = isDefault;
                const normalColor = config.GRUB_COLOR_NORMAL || 'light-gray/black';
                const highlightColor = config.GRUB_COLOR_HIGHLIGHT || 'white/black';

                const textColor = isHighlighted
                  ? highlightColor.split('/')[0]
                  : normalColor.split('/')[0];

                const bgColor = isHighlighted
                  ? highlightColor.split('/')[1]
                  : normalColor.split('/')[1];

                return (
                  <div
                    key={entry.id}
                    className={`px-4 py-2 rounded transition-colors ${
                      isHighlighted
                        ? 'bg-blue-700 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    style={{
                      color: isHighlighted ? '#ffffff' : textColor === 'light-gray' ? '#d1d5db' : textColor,
                      backgroundColor: isHighlighted ? '#1d4ed8' : bgColor === 'black' ? 'transparent' : bgColor,
                    }}
                  >
                    <span className="text-sm md:text-base">
                      {getEntryIcon(entry.name)} {entry.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {enabledEntries.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>No hay entradas habilitadas</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative z-10 text-center mt-8">
            {config.GRUB_TIMEOUT_STYLE !== 'hidden' && (
              <p className="text-gray-500 text-xs">
                {config.GRUB_TIMEOUT_STYLE === 'countdown'
                  ? `Arrancando en ${timeout} segundos...`
                  : `Selecciona una entrada con las flechas. Arranque automático en ${timeout}s.`
                }
              </p>
            )}
            <div className="flex justify-center gap-4 mt-3 text-gray-600 text-xs">
              <span>↑↓ Seleccionar</span>
              <span>Enter Aceptar</span>
              <span>e Editar</span>
              <span>c Consola</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryCard
          title="⏱️ Tiempo de Espera"
          items={[
            { label: 'Timeout', value: `${config.GRUB_TIMEOUT} segundos` },
            { label: 'Estilo', value: config.GRUB_TIMEOUT_STYLE },
          ]}
        />
        <SummaryCard
          title="🖼️ Resolución"
          items={[
            { label: 'Modo gráfico', value: config.GRUB_GFXMODE || 'Auto' },
            { label: 'Modo Linux', value: config.GRUB_GFXPAYLOAD_LINUX || 'Por defecto' },
          ]}
        />
        <SummaryCard
          title="🎯 Arranque"
          items={[
            { label: 'Entrada por defecto', value: defaultIdx >= 0 ? enabledEntries[defaultIdx]?.name || 'N/A' : `Índice ${config.GRUB_DEFAULT}` },
            { label: 'Recordar selección', value: config.GRUB_SAVEDEFAULT === 'true' ? 'Sí' : 'No' },
          ]}
        />
        <SummaryCard
          title="🔧 Kernel"
          items={[
            { label: 'Parámetros', value: config.GRUB_CMDLINE_LINUX_DEFAULT || 'Ninguno' },
            { label: 'Terminal', value: config.GRUB_TERMINAL || 'Gráfico' },
          ]}
        />
      </div>

      {/* Warning if OS Prober disabled */}
      {config.GRUB_DISABLE_OS_PROBER === 'true' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm text-red-300 font-medium">OS Prober desactivado</p>
            <p className="text-xs text-red-400/80 mt-1">
              Si tienes Windows u otro sistema operativo instalado, no se detectará automáticamente.
              Cambia <code className="bg-red-900/30 px-1 rounded">GRUB_DISABLE_OS_PROBER</code> a <code className="bg-red-900/30 px-1 rounded">false</code> en la pestaña Configuración.
            </p>
          </div>
        </div>
      )}
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

function getEntryIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('ubuntu') || lower.includes('linux')) return '🐧';
  if (lower.includes('windows')) return '🪟';
  if (lower.includes('recovery')) return '🔧';
  if (lower.includes('uefi') || lower.includes('firmware')) return '⚡';
  return '💾';
}
