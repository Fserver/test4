import { useState, useCallback } from 'react';
import ConfigPanel from './components/ConfigPanel';
import BootEntries from './components/BootEntries';
import GrubPreview from './components/GrubPreview';
import CommandOutput from './components/CommandOutput';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HelpPanel from './components/HelpPanel';
import { GrubConfig, BootEntry, TabType } from './types';

const defaultConfig: GrubConfig = {
  GRUB_DEFAULT: '0',
  GRUB_TIMEOUT: '5',
  GRUB_TIMEOUT_STYLE: 'menu',
  GRUB_DISTRIBUTOR: '',
  GRUB_CMDLINE_LINUX_DEFAULT: 'quiet splash',
  GRUB_CMDLINE_LINUX: '',
  GRUB_GFXMODE: 'auto',
  GRUB_GFXPAYLOAD_LINUX: '',
  GRUB_DISABLE_RECOVERY: 'false',
  GRUB_DISABLE_OS_PROBER: 'false',
  GRUB_THEME: '',
  GRUB_BACKGROUND: '',
  GRUB_INIT_TUNE: '',
  GRUB_SERIAL_COMMAND: '',
  GRUB_TERMINAL: '',
  GRUB_COLOR_NORMAL: 'light-gray/black',
  GRUB_COLOR_HIGHLIGHT: 'white/black',
  GRUB_SAVEDEFAULT: 'false',
};

const defaultEntries: BootEntry[] = [
  { id: '1', name: 'Ubuntu 24.04 LTS', enabled: true, isDefault: true },
  { id: '2', name: 'Ubuntu 24.04 LTS (recovery mode)', enabled: true, isDefault: false },
  { id: '3', name: 'Windows 11 (on /dev/nvme0n1p1)', enabled: true, isDefault: false },
  { id: '4', name: 'UEFI Firmware Settings', enabled: true, isDefault: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('config');
  const [config, setConfig] = useState<GrubConfig>(defaultConfig);
  const [entries, setEntries] = useState<BootEntry[]>(defaultEntries);
  const [showCommands, setShowCommands] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateConfig = useCallback((key: keyof GrubConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleEntry = useCallback((id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, enabled: !e.enabled } : e));
  }, []);

  const setDefaultEntry = useCallback((id: string) => {
    setEntries(prev => prev.map(e => ({ ...e, isDefault: e.id === id })));
    const idx = entries.findIndex(e => e.id === id);
    if (idx >= 0) {
      setConfig(prev => ({ ...prev, GRUB_DEFAULT: String(idx) }));
    }
  }, [entries]);

  const addEntry = useCallback((name: string) => {
    const newEntry: BootEntry = {
      id: String(Date.now()),
      name,
      enabled: true,
      isDefault: false,
    };
    setEntries(prev => [...prev, newEntry]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const moveEntry = useCallback((id: string, direction: 'up' | 'down') => {
    setEntries(prev => {
      const idx = prev.findIndex(e => e.id === id);
      if (direction === 'up' && idx > 0) {
        const newArr = [...prev];
        [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];
        return newArr;
      } else if (direction === 'down' && idx < prev.length - 1) {
        const newArr = [...prev];
        [newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]];
        return newArr;
      }
      return prev;
    });
  }, []);

  const generateCommands = useCallback(() => {
    const lines: string[] = [
      '#!/bin/bash',
      '# Script generado por GRUB Editor',
      '# Ejecutar con: sudo bash grub-config.sh',
      '',
      'sudo cp /etc/default/grub /etc/default/grub.backup.$(date +%Y%m%d%H%M%S)',
      '',
      'sudo tee /etc/default/grub > /dev/null << EOF',
    ];

    const enabledEntries = entries.filter(e => e.enabled);
    const defaultIdx = entries.findIndex(e => e.isDefault && e.enabled);

    const configToWrite = { ...config };
    if (defaultIdx >= 0) {
      configToWrite.GRUB_DEFAULT = String(defaultIdx);
    }

    Object.entries(configToWrite).forEach(([key, value]) => {
      if (value !== '' || ['GRUB_DEFAULT', 'GRUB_TIMEOUT', 'GRUB_CMDLINE_LINUX_DEFAULT'].includes(key)) {
        lines.push(`${key}="${value}"`);
      }
    });

    lines.push('EOF');
    lines.push('');
    lines.push('sudo update-grub');
    lines.push('');
    lines.push('echo "✅ Configuración de GRUB actualizada correctamente"');

    return lines.join('\n');
  }, [config, entries]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generateCommands());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generateCommands]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onShowCommands={() => setShowCommands(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {activeTab === 'config' && (
            <ConfigPanel config={config} updateConfig={updateConfig} />
          )}
          {activeTab === 'entries' && (
            <BootEntries
              entries={entries}
              toggleEntry={toggleEntry}
              setDefaultEntry={setDefaultEntry}
              addEntry={addEntry}
              removeEntry={removeEntry}
              moveEntry={moveEntry}
            />
          )}
          {activeTab === 'preview' && (
            <GrubPreview config={config} entries={entries} />
          )}
          {activeTab === 'help' && (
            <HelpPanel />
          )}
        </main>
      </div>

      {/* Command Output Modal */}
      {showCommands && (
        <CommandOutput
          commands={generateCommands()}
          copied={copied}
          onCopy={copyToClipboard}
          onClose={() => setShowCommands(false)}
        />
      )}

      {/* Floating action button for commands */}
      <button
        onClick={() => setShowCommands(true)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-40"
        title="Generar script de instalación"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}
