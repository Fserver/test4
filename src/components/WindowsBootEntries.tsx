import { useState } from 'react';
import { BootEntry } from '../types';

interface WindowsBootEntriesProps {
  entries: BootEntry[];
  toggleEntry: (id: string) => void;
  setDefaultEntry: (id: string) => void;
  addEntry: (name: string) => void;
  removeEntry: (id: string) => void;
  moveEntry: (id: string, direction: 'up' | 'down') => void;
}

export default function WindowsBootEntries({ entries, toggleEntry, setDefaultEntry, addEntry, removeEntry, moveEntry }: WindowsBootEntriesProps) {
  const [newEntryName, setNewEntryName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = () => {
    if (newEntryName.trim()) {
      addEntry(newEntryName.trim());
      setNewEntryName('');
      setShowAddForm(false);
    }
  };

  const getEntryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('ubuntu') || lower.includes('linux')) return '🐧';
    if (lower.includes('windows')) return '🪟';
    if (lower.includes('recovery')) return '🔧';
    if (lower.includes('uefi') || lower.includes('firmware')) return '⚡';
    if (lower.includes('memtest')) return '🧪';
    return '💾';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Entradas del Boot Manager</h2>
        <p className="text-gray-400">Gestiona las entradas del menú de arranque de Windows. Puedes reordenar, habilitar/deshabilitar y definir la entrada por defecto.</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
        <span className="text-xl">ℹ️</span>
        <div>
          <p className="text-sm text-blue-300 font-medium">Nota importante</p>
          <p className="text-xs text-blue-400/80 mt-1">
            Las entradas aquí mostradas son una simulación. En tu sistema real, las entradas se gestionan con <code className="bg-blue-900/30 px-1 rounded">bcdedit /enum</code>. Para añadir entradas de otros sistemas, usa <code className="bg-blue-900/30 px-1 rounded">bcdedit /create</code> o herramientas como <strong>EasyBCD</strong>.
          </p>
        </div>
      </div>

      {/* Entries List */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <span>📋</span> Entradas detectadas ({entries.length})
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Añadir
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 bg-gray-900/50 border-b border-gray-700 flex gap-2">
            <input
              type="text"
              value={newEntryName}
              onChange={(e) => setNewEntryName(e.target.value)}
              placeholder="Nombre de la entrada..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              autoFocus
            />
            <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Añadir
            </button>
            <button onClick={() => setShowAddForm(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Cancelar
            </button>
          </div>
        )}

        {/* Entry Items */}
        <div className="divide-y divide-gray-700">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-4 flex items-center gap-4 transition-colors ${
                entry.isDefault ? 'bg-blue-500/5' : ''
              } ${!entry.enabled ? 'opacity-50' : ''}`}
            >
              {/* Index */}
              <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-lg text-xs font-mono text-gray-400">
                {index}
              </div>

              {/* Icon */}
              <span className="text-2xl">{getEntryIcon(entry.name)}</span>

              {/* Name and info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">{entry.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  {entry.isDefault && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                      ⭐ Predeterminado
                    </span>
                  )}
                  {!entry.enabled && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                      Deshabilitada
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {/* Move Up */}
                <button
                  onClick={() => moveEntry(entry.id, 'up')}
                  disabled={index === 0}
                  className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 rounded-lg transition-colors"
                  title="Mover arriba"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>

                {/* Move Down */}
                <button
                  onClick={() => moveEntry(entry.id, 'down')}
                  disabled={index === entries.length - 1}
                  className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 rounded-lg transition-colors"
                  title="Mover abajo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Toggle */}
                <button
                  onClick={() => toggleEntry(entry.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    entry.enabled
                      ? 'text-green-400 hover:bg-green-500/10'
                      : 'text-red-400 hover:bg-red-500/10'
                  }`}
                  title={entry.enabled ? 'Deshabilitar' : 'Habilitar'}
                >
                  {entry.enabled ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>

                {/* Set Default */}
                {!entry.isDefault && (
                  <button
                    onClick={() => setDefaultEntry(entry.id)}
                    className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                    title="Establecer como predeterminada"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                )}

                {/* Remove */}
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Eliminar entrada"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">No hay entradas configuradas</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              + Añadir primera entrada
            </button>
          </div>
        )}
      </div>

      {/* Custom entries info for Windows */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <span>📝</span> Añadir entradas en Windows
        </h3>
        <div className="space-y-3 text-sm text-gray-400">
          <p>Para añadir entradas al Boot Manager de Windows:</p>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto">
            <p className="text-green-400"># Abrir PowerShell como Administrador</p>
            <p className="text-gray-300">bcdedit /enum all</p>
            <p className="text-green-400 mt-2"># Crear nueva entrada (ejemplo para Ubuntu):</p>
            <p className="text-yellow-300">bcdedit /create {"{"}guid{"}"} /d "Ubuntu 24.04" /application BOOTAPP</p>
            <p className="text-yellow-300">bcdedit /set {"{"}guid{"}"} device partition=C:</p>
            <p className="text-yellow-300">bcdedit /set {"{"}guid{"}"} path \EFI\ubuntu\grubx64.efi</p>
            <p className="text-yellow-300">bcdedit /displayorder {"{"}guid{"}"} /addlast</p>
            <p className="text-green-400 mt-2"># Establecer timeout:</p>
            <p className="text-gray-300">bcdedit /timeout 10</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 También puedes usar la herramienta gráfica <strong>EasyBCD</strong> (gratuita para uso personal) para gestionar entradas visualmente.
          </p>
        </div>
      </div>
    </div>
  );
}
