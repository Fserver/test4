import { GrubConfig } from '../types';

interface ConfigPanelProps {
  config: GrubConfig;
  updateConfig: (key: keyof GrubConfig, value: string) => void;
}

export default function ConfigPanel({ config, updateConfig }: ConfigPanelProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Configuración General</h2>
        <p className="text-gray-400">Edita los parámetros principales de GRUB. Estos valores se escribirán en <code className="text-orange-400 bg-gray-800 px-1 rounded">/etc/default/grub</code></p>
      </div>

      {/* Timeout Section */}
      <Section title="⏱️ Tiempo de Espera" description="Controla cuánto tiempo se muestra el menú antes de arrancar automáticamente">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Timeout (segundos)"
            value={config.GRUB_TIMEOUT}
            onChange={(v) => updateConfig('GRUB_TIMEOUT', v)}
            placeholder="5"
            type="number"
            help="Tiempo en segundos antes del arranque automático"
          />
          <SelectField
            label="Estilo del Timeout"
            value={config.GRUB_TIMEOUT_STYLE}
            onChange={(v) => updateConfig('GRUB_TIMEOUT_STYLE', v)}
            options={[
              { value: 'menu', label: 'Menú completo (menu)' },
              { value: 'countdown', label: 'Solo cuenta regresiva (countdown)' },
              { value: 'hidden', label: 'Oculto (hidden)' },
            ]}
            help="Define cómo se muestra el tiempo de espera"
          />
        </div>
      </Section>

      {/* Boot Default Section */}
      <Section title="🎯 Entrada por Defecto" description="Define qué sistema operativo arranca por defecto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Entrada por defecto"
            value={config.GRUB_DEFAULT}
            onChange={(v) => updateConfig('GRUB_DEFAULT', v)}
            placeholder="0"
            help="Índice numérico (0=primera) o 'saved' para recordar última elección"
          />
          <SelectField
            label="Recordar última selección"
            value={config.GRUB_SAVEDEFAULT}
            onChange={(v) => updateConfig('GRUB_SAVEDEFAULT', v)}
            options={[
              { value: 'true', label: 'Sí - Recordar última selección' },
              { value: 'false', label: 'No - Usar entrada fija' },
            ]}
            help="Si se activa, GRUB recordará tu última elección"
          />
        </div>
      </Section>

      {/* Graphics Section */}
      <Section title="🖼️ Gráficos y Resolución" description="Configura la resolución y apariencia visual de GRUB">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Resolución de pantalla"
            value={config.GRUB_GFXMODE}
            onChange={(v) => updateConfig('GRUB_GFXMODE', v)}
            options={[
              { value: 'auto', label: 'Automático (auto)' },
              { value: '1920x1080', label: '1920x1080 (Full HD)' },
              { value: '1920x1080x32', label: '1920x1080x32 (Full HD 32-bit)' },
              { value: '1366x768', label: '1366x768 (HD)' },
              { value: '1280x720', label: '1280x720 (HD 720p)' },
              { value: '1024x768', label: '1024x768 (XGA)' },
              { value: '800x600', label: '800x600 (SVGA)' },
              { value: '640x480', label: '640x480 (VGA)' },
            ]}
            help="Resolución del menú GRUB"
          />
          <SelectField
            label="Modo gráfico Linux"
            value={config.GRUB_GFXPAYLOAD_LINUX}
            onChange={(v) => updateConfig('GRUB_GFXPAYLOAD_LINUX', v)}
            options={[
              { value: '', label: 'Por defecto (vacío)' },
              { value: 'keep', label: 'Mantener resolución GRUB (keep)' },
              { value: 'text', label: 'Solo texto' },
              { value: '1920x1080', label: '1920x1080' },
              { value: '1366x768', label: '1366x768' },
              { value: '1024x768', label: '1024x768' },
            ]}
            help="Resolución al arrancar Linux"
          />
        </div>
      </Section>

      {/* Kernel Parameters */}
      <Section title="🔧 Parámetros del Kernel" description="Opciones que se pasan al kernel de Linux durante el arranque">
        <div className="space-y-4">
          <InputField
            label="Parámetros por defecto"
            value={config.GRUB_CMDLINE_LINUX_DEFAULT}
            onChange={(v) => updateConfig('GRUB_CMDLINE_LINUX_DEFAULT', v)}
            placeholder="quiet splash"
            help="Parámetros comunes: quiet (sin logs), splash (pantalla de carga), nomodeset (para problemas gráficos)"
          />
          <InputField
            label="Parámetros adicionales"
            value={config.GRUB_CMDLINE_LINUX}
            onChange={(v) => updateConfig('GRUB_CMDLINE_LINUX', v)}
            placeholder=""
            help="Parámetros adicionales para todas las entradas (incluido recovery)"
          />
        </div>
      </Section>

      {/* OS Prober */}
      <Section title="🔍 Detección de Sistemas Operativos" description="Controla la detección de otros sistemas como Windows">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="OS Prober (detectar Windows)"
            value={config.GRUB_DISABLE_OS_PROBER}
            onChange={(v) => updateConfig('GRUB_DISABLE_OS_PROBER', v)}
            options={[
              { value: 'false', label: '✅ Activado - Detectar otros SO' },
              { value: 'true', label: '❌ Desactivado - No detectar' },
            ]}
            help="IMPORTANTE: Si tienes dual-boot con Windows, debe estar en 'false'"
          />
          <SelectField
            label="Entradas de recuperación"
            value={config.GRUB_DISABLE_RECOVERY}
            onChange={(v) => updateConfig('GRUB_DISABLE_RECOVERY', v)}
            options={[
              { value: 'false', label: '✅ Mostrar entradas recovery' },
              { value: 'true', label: '❌ Ocultar entradas recovery' },
            ]}
            help="Las entradas recovery permiten reparar el sistema"
          />
        </div>
      </Section>

      {/* Theme */}
      <Section title="🎨 Tema y Apariencia" description="Personaliza el aspecto visual del menú GRUB">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Tema de GRUB"
            value={config.GRUB_THEME}
            onChange={(v) => updateConfig('GRUB_THEME', v)}
            placeholder="/boot/grub/themes/stardock/theme.txt"
            help="Ruta al archivo theme.txt del tema instalado"
          />
          <InputField
            label="Imagen de fondo"
            value={config.GRUB_BACKGROUND}
            onChange={(v) => updateConfig('GRUB_BACKGROUND', v)}
            placeholder="/boot/grub/background.png"
            help="Ruta a una imagen PNG, JPG o TGA para el fondo"
          />
          <InputField
            label="Color texto normal"
            value={config.GRUB_COLOR_NORMAL}
            onChange={(v) => updateConfig('GRUB_COLOR_NORMAL', v)}
            placeholder="light-gray/black"
            help="Formato: color-texto/color-fondo"
          />
          <InputField
            label="Color texto resaltado"
            value={config.GRUB_COLOR_HIGHLIGHT}
            onChange={(v) => updateConfig('GRUB_COLOR_HIGHLIGHT', v)}
            placeholder="white/black"
            help="Color del elemento seleccionado"
          />
        </div>
      </Section>

      {/* Terminal */}
      <Section title="💻 Terminal" description="Configura la salida de terminal de GRUB">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Tipo de terminal"
            value={config.GRUB_TERMINAL}
            onChange={(v) => updateConfig('GRUB_TERMINAL', v)}
            options={[
              { value: '', label: 'Gráfico (por defecto)' },
              { value: 'console', label: 'Consola de texto' },
              { value: 'serial', label: 'Terminal serial' },
            ]}
            help="Usa 'console' si tienes problemas con el modo gráfico"
          />
          <InputField
            label="Comando serial"
            value={config.GRUB_SERIAL_COMMAND}
            onChange={(v) => updateConfig('GRUB_SERIAL_COMMAND', v)}
            placeholder="serial --speed=9600"
            help="Solo necesario si usas terminal serial"
          />
        </div>
      </Section>

      {/* Quick Presets */}
      <Section title="🚀 Presets Rápidos" description="Aplica configuraciones predefinidas con un clic">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <PresetButton
            title="Dual Boot (Ubuntu + Windows)"
            description="Detecta Windows, timeout 10s"
            onClick={() => {
              updateConfig('GRUB_TIMEOUT', '10');
              updateConfig('GRUB_DISABLE_OS_PROBER', 'false');
              updateConfig('GRUB_TIMEOUT_STYLE', 'menu');
            }}
          />
          <PresetButton
            title="Arranque Rápido"
            description="Timeout 2s, sin recovery"
            onClick={() => {
              updateConfig('GRUB_TIMEOUT', '2');
              updateConfig('GRUB_DISABLE_RECOVERY', 'true');
              updateConfig('GRUB_TIMEOUT_STYLE', 'countdown');
            }}
          />
          <PresetButton
            title="Sin Menú (Directo)"
            description="Arranque directo, Shift para menú"
            onClick={() => {
              updateConfig('GRUB_TIMEOUT', '0');
              updateConfig('GRUB_TIMEOUT_STYLE', 'hidden');
            }}
          />
          <PresetButton
            title="Alta Resolución"
            description="Full HD 1080p"
            onClick={() => {
              updateConfig('GRUB_GFXMODE', '1920x1080x32');
              updateConfig('GRUB_GFXPAYLOAD_LINUX', 'keep');
            }}
          />
          <PresetButton
            title="Modo Seguro (Texto)"
            description="Consola de texto, sin gráficos"
            onClick={() => {
              updateConfig('GRUB_TERMINAL', 'console');
              updateConfig('GRUB_CMDLINE_LINUX_DEFAULT', 'nomodeset text');
            }}
          />
          <PresetButton
            title="Recordar Selección"
            description="Siempre arranca lo último elegido"
            onClick={() => {
              updateConfig('GRUB_SAVEDEFAULT', 'true');
              updateConfig('GRUB_DEFAULT', 'saved');
            }}
          />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 md:p-6">
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      {children}
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  help?: string;
}

function InputField({ label, value, onChange, placeholder, type = 'text', help }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
      />
      {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  help?: string;
}

function SelectField({ label, value, onChange, options, help }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
    </div>
  );
}

function PresetButton({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-orange-500/50 hover:bg-gray-900/80 transition-all group"
    >
      <div className="font-medium text-sm text-white group-hover:text-orange-400 transition-colors">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </button>
  );
}
