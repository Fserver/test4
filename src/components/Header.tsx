import { OSType } from '../types';

interface HeaderProps {
  onToggleSidebar: () => void;
  onShowCommands: () => void;
  osType: OSType;
  onOsChange: (os: OSType) => void;
}

export default function Header({ onToggleSidebar, onShowCommands, osType, onOsChange }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white">Boot Editor</h1>
            <p className="text-xs text-gray-400 hidden sm:block">Configurador visual de arranque</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* OS Selector */}
        <div className="flex items-center bg-gray-900 rounded-lg p-0.5 border border-gray-700">
          <button
            onClick={() => onOsChange('ubuntu')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              osType === 'ubuntu'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🐧</span>
            <span className="hidden sm:inline">Ubuntu</span>
          </button>
          <button
            onClick={() => onOsChange('windows')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              osType === 'windows'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🪟</span>
            <span className="hidden sm:inline">Windows</span>
          </button>
        </div>

        <span className={`hidden md:inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${
          osType === 'ubuntu'
            ? 'bg-green-500/10 text-green-400 border-green-500/20'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        }`}>
          <span className="w-2 h-2 bg-current rounded-full animate-pulse"></span>
          {osType === 'ubuntu' ? 'GRUB' : 'BCD'}
        </span>

        <button
          onClick={onShowCommands}
          className={`hidden md:flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            osType === 'ubuntu'
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {osType === 'ubuntu' ? 'Generar Script' : 'Generar PowerShell'}
        </button>
      </div>
    </header>
  );
}
