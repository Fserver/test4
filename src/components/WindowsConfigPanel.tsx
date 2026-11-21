import { WindowsBootConfig } from '../types';

interface WindowsConfigPanelProps {
  config: WindowsBootConfig;
  updateConfig: (key: keyof WindowsBootConfig, value: string) => void;
}

export default function WindowsConfigPanel({ config, updateConfig }: WindowsConfigPanelProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Configuración del Boot Manager de Windows</h2>
        <p className="text-gray-400">Edita los parámetros del BCD (Boot Configuration Data) de Windows. Estos cambios se aplican con <code className="text-blue-400 bg-gray-800 px-1 rounded">bcdedit</code></p>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="text-sm text-yellow-300 font-medium">Precaución</p>
          <p className="text-xs text-yellow-400/80 mt-1">
            Modificar el BCD puede impedir que Windows arranque. Asegúrate de tener un medio de recuperación de Windows a mano. Los scripts generados se deben ejecutar como <strong>Administrador</strong>.
          </p>
        </div>
      </div>

      {/* Timeout Section */}
      <Section title="⏱️ Tiempo de Espera" description="Controla cuánto tiempo se muestra el menú de arranque de Windows">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Timeout (segundos)"
            value={config.timeout}
            onChange={(v) => updateConfig('timeout', v)}
            placeholder="30"
            type="number"
            help="Tiempo en segundos antes del arranque automático (predeterminado: 30)"
          />
          <SelectField
            label="Mostrar menú de arranque"
            value={config.displayBootMenu}
            onChange={(v) => updateConfig('displayBootMenu', v)}
            options={[
              { value: 'Yes', label: '✅ Sí - Mostrar menú' },
              { value: 'No', label: '❌ No - Arranque directo' },
            ]}
            help="Si se desactiva, mantén Shift durante el arranque para acceder"
          />
        </div>
      </Section>

      {/* Default Entry */}
      <Section title="🎯 Entrada por Defecto" description="Define qué sistema arranca por defecto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Opciones avanzadas"
            value={config.advancedOptions}
            onChange={(v) => updateConfig('advancedOptions', v)}
            options={[
              { value: 'No', label: '❌ Ocultar opciones avanzadas' },
              { value: 'Yes', label: '✅ Mostrar opciones avanzadas' },
            ]}
            help="Muestra opciones como Modo Seguro en el menú"
          />
          <SelectField
            label="EMS (Emergency Management Services)"
            value={config.emsEnabled}
            onChange={(v) => updateConfig('emsEnabled', v)}
            options={[
              { value: 'No', label: '❌ Desactivado' },
              { value: 'Yes', label: '✅ Activado' },
            ]}
            help="Solo necesario para administración remota de servidores"
          />
        </div>
      </Section>

      {/* Security & Debug */}
      <Section title="🔒 Seguridad y Depuración" description="Opciones de seguridad del arranque y depuración">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Firmado de pruebas (Test Signing)"
            value={config.testSigning}
            onChange={(v) => updateConfig('testSigning', v)}
            options={[
              { value: 'No', label: '❌ Desactivado (Recomendado)' },
              { value: 'Yes', label: '✅ Activado (para drivers sin firma)' },
            ]}
            help="Permite cargar drivers no firmados. Necesario para algunos juegos con anti-cheat"
          />
          <SelectField
            label="Depuración de arranque"
            value={config.bootDebug}
            onChange={(v) => updateConfig('bootDebug', v)}
            options={[
              { value: 'No', label: '❌ Desactivado' },
              { value: 'Yes', label: '✅ Activado' },
            ]}
            help="Muestra información de depuración durante el arranque"
          />
        </div>
      </Section>

      {/* Memory & Performance */}
      <Section title="⚡ Rendimiento y Memoria" description="Políticas de memoria y rendimiento del arranque">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Política NX (No-eXecute)"
            value={config.nxPolicy}
            onChange={(v) => updateConfig('nxPolicy', v)}
            options={[
              { value: 'OptIn', label: 'OptIn (Recomendado)' },
              { value: 'OptOut', label: 'OptOut' },
              { value: 'AlwaysOn', label: 'AlwaysOn (Máxima seguridad)' },
              { value: 'AlwaysOff', label: 'AlwaysOff (Máxima compatibilidad)' },
            ]}
            help="Protección contra ejecución de código en memoria de datos"
          />
          <SelectField
            label="Política PAE (Physical Address Extension)"
            value={config.paePolicy}
            onChange={(v) => updateConfig('paePolicy', v)}
            options={[
              { value: 'Default', label: 'Por defecto' },
              { value: 'ForceEnable', label: 'Forzar activación' },
              { value: 'ForceDisable', label: 'Forzar desactivación' },
            ]}
            help="Permite acceder a más de 4GB de RAM en sistemas de 32 bits"
          />
        </div>
      </Section>

      {/* Boot Menu Policy */}
      <Section title="🖥️ Política del Menú" description="Controla el comportamiento del menú de arranque">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Política del menú de arranque"
            value={config.bootMenuPolicy}
            onChange={(v) => updateConfig('bootMenuPolicy', v)}
            options={[
              { value: 'Standard', label: 'Estándar - Menú clásico' },
              { value: 'Legacy', label: 'Legacy - Menú heredado' },
            ]}
            help="'Standard' usa el nuevo menú de Windows 10/11, 'Legacy' usa el clásico"
          />
          <SelectField
            label="Apagar tras cambio de boot"
            value={config.bootShutDown}
            onChange={(v) => updateConfig('bootShutDown', v)}
            options={[
              { value: 'No', label: '❌ No - Reiniciar tras cambio' },
              { value: 'Yes', label: '✅ Sí - Apagar tras cambio' },
            ]}
            help="Controla si se apaga el sistema tras cambiar la entrada de arranque"
          />
        </div>
      </Section>

      {/* Quick Presets */}
      <Section title="🚀 Presets Rápidos" description="Aplica configuraciones predefinidas con un clic">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <PresetButton
            title="Dual Boot Rápido"
            description="Menú visible, timeout 10s"
            onClick={() => {
              updateConfig('timeout', '10');
              updateConfig('displayBootMenu', 'Yes');
              updateConfig('advancedOptions', 'Yes');
            }}
          />
          <PresetButton
            title="Arranque Directo"
            description="Sin menú, arranque inmediato"
            onClick={() => {
              updateConfig('timeout', '0');
              updateConfig('displayBootMenu', 'No');
            }}
          />
          <PresetButton
            title="Modo Desarrollador"
            description="Test signing + debug activado"
            onClick={() => {
              updateConfig('testSigning', 'Yes');
              updateConfig('bootDebug', 'Yes');
              updateConfig('advancedOptions', 'Yes');
            }}
          />
          <PresetButton
            title="Máxima Seguridad"
            description="NX AlwaysOn, sin test signing"
            onClick={() => {
              updateConfig('testSigning', 'No');
              updateConfig('nxPolicy', 'AlwaysOn');
              updateConfig('bootDebug', 'No');
            }}
          />
          <PresetButton
            title="Compatibilidad Máxima"
            description="NX Off, PAE ForceEnable"
            onClick={() => {
              updateConfig('nxPolicy', 'AlwaysOff');
              updateConfig('paePolicy', 'ForceEnable');
            }}
          />
          <PresetButton
            title="Configuración Normal"
            description="Restaurar valores por defecto"
            onClick={() => {
              updateConfig('timeout', '30');
              updateConfig('displayBootMenu', 'Yes');
              updateConfig('advancedOptions', 'No');
              updateConfig('testSigning', 'No');
              updateConfig('bootDebug', 'No');
              updateConfig('nxPolicy', 'OptIn');
              updateConfig('paePolicy', 'Default');
              updateConfig('emsEnabled', 'No');
              updateConfig('bootMenuPolicy', 'Standard');
              updateConfig('bootShutDown', 'No');
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
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
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
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
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
      className="text-left bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-blue-500/50 hover:bg-gray-900/80 transition-all group"
    >
      <div className="font-medium text-sm text-white group-hover:text-blue-400 transition-colors">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </button>
  );
}
