import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const tabs: { id: TabType; label: string; icon: string; description: string }[] = [
  { id: 'config', label: 'Configuración', icon: '⚙️', description: 'Parámetros generales de GRUB' },
  { id: 'entries', label: 'Entradas de Arranque', icon: '🖥️', description: 'Gestionar sistemas operativos' },
  { id: 'preview', label: 'Vista Previa', icon: '👁️', description: 'Previsualizar el menú GRUB' },
  { id: 'help', label: 'Ayuda', icon: '❓', description: 'Guía y documentación' },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-20
        w-64 bg-gray-800 border-r border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        pt-16 md:pt-0
        flex flex-col
      `}>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); onClose(); }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                ${activeTab === tab.id
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/5'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }
              `}
            >
              <span className="text-xl">{tab.icon}</span>
              <div>
                <div className="font-medium text-sm">{tab.label}</div>
                <div className="text-xs opacity-60 hidden lg:block">{tab.description}</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-700/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">💡 Consejo</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Siempre haz un backup de <code className="text-orange-400">/etc/default/grub</code> antes de aplicar cambios.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
