export default function HelpPanel() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Ayuda y Documentación</h2>
        <p className="text-gray-400">Guía completa para configurar GRUB en Ubuntu con dual-boot</p>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">🚀 Inicio Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StepCard step={1} title="Configura" description="Ajusta los parámetros en la pestaña Configuración" />
          <StepCard step={2} title="Genera" description="Haz clic en 'Generar Script' para crear el script de instalación" />
          <StepCard step={3} title="Aplica" description="Ejecuta el script con sudo en tu terminal de Ubuntu" />
        </div>
      </div>

      {/* Common Issues */}
      <Section title="🔧 Problemas Comunes" icon="🔧">
        <FAQItem
          question="Windows no aparece en el menú GRUB"
          answer={
            <div className="space-y-2">
              <p>Desde Ubuntu 22.04+, OS Prober está desactivado por seguridad. Para reactivarlo:</p>
              <CodeBlock code="sudo nano /etc/default/grub" />
              <p>Añade o modifica esta línea:</p>
              <CodeBlock code='GRUB_DISABLE_OS_PROBER=false' />
              <p>Luego ejecuta:</p>
              <CodeBlock code="sudo update-grub" />
            </div>
          }
        />
        <FAQItem
          question="GRUB no muestra menú (arranca directo)"
          answer={
            <div className="space-y-2">
              <p>Cambia el estilo del timeout a 'menu':</p>
              <CodeBlock code='GRUB_TIMEOUT_STYLE="menu"' />
              <p>Y aumenta el timeout:</p>
              <CodeBlock code='GRUB_TIMEOUT="10"' />
              <p>Si está en 'hidden', puedes acceder al menú manteniendo presionada la tecla <kbd className="bg-gray-700 px-1.5 py-0.5 rounded text-xs">Shift</kbd> durante el arranque.</p>
            </div>
          }
        />
        <FAQItem
          question="Resolución incorrecta en GRUB"
          answer={
            <div className="space-y-2">
              <p>Para ver las resoluciones disponibles:</p>
              <CodeBlock code="sudo hwinfo --framebuffer" />
              <p>O desde la consola GRUB (tecla 'c'):</p>
              <CodeBlock code="videoinfo" />
              <p>Luego configura la resolución en:</p>
              <CodeBlock code='GRUB_GFXMODE="1920x1080x32,1024x768x32,auto"' />
            </div>
          }
        />
        <FAQItem
          question="Error 'sparse file not allowed' al arrancar"
          answer={
            <div className="space-y-2">
              <p>Este error es inofensivo. Para eliminarlo, edita:</p>
              <CodeBlock code="sudo nano /etc/grub.d/10_linux" />
              <p>Busca la línea con <code className="bg-gray-700 px-1 rounded">recordfail</code> y comenta la línea que contiene <code className="bg-gray-700 px-1 rounded">GRUB_RECORDFAIL_TIMEOUT</code></p>
            </div>
          }
        />
        <FAQItem
          question="Después de actualizar Windows, GRUB desapareció"
          answer={
            <div className="space-y-2">
              <p>Windows a veces sobrescribe el MBR/EFI. Para restaurar GRUB:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Arranca desde un USB live de Ubuntu</li>
                <li>Abre terminal y ejecuta:</li>
              </ol>
              <CodeBlock code={`sudo mount /dev/nvme0n1p2 /mnt  # Tu partición root
sudo mount /dev/nvme0n1p1 /mnt/boot/efi  # Partición EFI
sudo grub-install --target=x86_64-efi --efi-directory=/mnt/boot/efi --bootloader-id=ubuntu
sudo chroot /mnt
update-grub
exit
sudo umount -R /mnt
sudo reboot`} />
            </div>
          }
        />
      </Section>

      {/* Important Commands */}
      <Section title="📋 Comandos Importantes" icon="📋">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommandCard
            title="Ver configuración actual"
            command="cat /etc/default/grub"
          />
          <CommandCard
            title="Actualizar GRUB"
            command="sudo update-grub"
          />
          <CommandCard
            title="Reinstalar GRUB (EFI)"
            command="sudo grub-install --target=x86_64-efi"
          />
          <CommandCard
            title="Ver entradas detectadas"
            command="grep menuentry /boot/grub/grub.cfg"
          />
          <CommandCard
            title="Backup de GRUB"
            command="sudo cp /etc/default/grub /etc/default/grub.backup"
          />
          <CommandCard
            title="Restaurar backup"
            command="sudo cp /etc/default/grub.backup /etc/default/grub"
          />
          <CommandCard
            title="Ver particiones"
            command="lsblk -f"
          />
          <CommandCard
            title="OS Prober manual"
            command="sudo os-prober"
          />
        </div>
      </Section>

      {/* File Locations */}
      <Section title="📁 Archivos Importantes" icon="📁">
        <div className="space-y-3">
          <FileCard
            path="/etc/default/grub"
            description="Configuración principal de GRUB. Aquí se definen timeout, resolución, etc."
          />
          <FileCard
            path="/boot/grub/grub.cfg"
            description="Menú generado automáticamente. NO editar directamente."
          />
          <FileCard
            path="/etc/grub.d/"
            description="Scripts que generan las entradas del menú. Se ejecutan en orden numérico."
          />
          <FileCard
            path="/boot/grub/themes/"
            description="Directorio de temas visuales de GRUB."
          />
          <FileCard
            path="/boot/efi/EFI/"
            description="Directorio EFI con los bootloaders (Ubuntu, Windows, etc.)"
          />
        </div>
      </Section>

      {/* GRUB Parameters Reference */}
      <Section title="📖 Parámetros del Kernel Útiles" icon="📖">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Parámetro</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              <ParamRow param="quiet" desc="Reduce la verbosidad del arranque" />
              <ParamRow param="splash" desc="Muestra pantalla de carga gráfica" />
              <ParamRow param="nomodeset" desc="Desactiva KMS (útil para problemas de GPU)" />
              <ParamRow param="acpi=off" desc="Desactiva ACPI (solución para hardware antiguo)" />
              <ParamRow param="noapic" desc="Desactiva APIC (problemas de interrupciones)" />
              <ParamRow param="text" desc="Arranca en modo texto" />
              <ParamRow param="single" desc="Modo monousuario (recovery)" />
              <ParamRow param="recovery" desc="Modo recuperación" />
              <ParamRow param="pci=noaer" desc="Silencia errores PCIe AER" />
              <ParamRow param="ibt=off" desc="Desactiva Indirect Branch Tracking (algunas CPUs)" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* External Resources */}
      <Section title="🔗 Recursos Externos" icon="🔗">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ResourceLink
            title="Documentación oficial de GRUB"
            url="https://www.gnu.org/software/grub/manual/grub/"
            description="Manual completo de GNU GRUB"
          />
          <ResourceLink
            title="Ubuntu Wiki - Grub2"
            url="https://help.ubuntu.com/community/Grub2"
            description="Guía de Ubuntu para GRUB 2"
          />
          <ResourceLink
            title="GRUB Themes"
            url="https://www.gnome-look.org/browse?cat=109"
            description="Temas visuales para GRUB"
          />
          <ResourceLink
            title="Arch Wiki - GRUB"
            url="https://wiki.archlinux.org/title/GRUB"
            description="Documentación detallada (aplicable a Ubuntu)"
          />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 md:p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2">
        {step}
      </div>
      <h4 className="font-medium text-white text-sm">{title}</h4>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  return (
    <details className="group border-b border-gray-700/50 last:border-0">
      <summary className="py-3 px-1 cursor-pointer flex items-center justify-between text-sm font-medium text-white hover:text-orange-400 transition-colors">
        <span>{question}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pb-4 px-1 text-sm text-gray-300">
        {answer}
      </div>
    </details>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-gray-950 rounded-lg p-3 text-xs font-mono text-green-400 overflow-x-auto border border-gray-700">
      <code>{code}</code>
    </pre>
  );
}

function CommandCard({ title, command }: { title: string; command: string }) {
  return (
    <div className="bg-gray-900 rounded-xl p-3 border border-gray-700">
      <p className="text-xs text-gray-400 mb-1">{title}</p>
      <code className="text-sm text-orange-400 font-mono">{command}</code>
    </div>
  );
}

function FileCard({ path, description }: { path: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
      <span className="text-lg">📄</span>
      <div>
        <code className="text-sm text-orange-400 font-mono">{path}</code>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function ParamRow({ param, desc }: { param: string; desc: string }) {
  return (
    <tr className="hover:bg-gray-700/20">
      <td className="py-2 px-3">
        <code className="text-orange-400 text-xs font-mono bg-gray-900 px-2 py-0.5 rounded">{param}</code>
      </td>
      <td className="py-2 px-3 text-gray-400 text-xs">{desc}</td>
    </tr>
  );
}

function ResourceLink({ title, url, description }: { title: string; url: string; description: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-900 rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 transition-colors group"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </a>
  );
}
