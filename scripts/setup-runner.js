#!/usr/bin/env node

/**
 * Cross-platform setup runner
 * Detecta el sistema operativo y ejecuta el script apropiado
 */

const { spawn } = require('child_process')
const os = require('os')
const path = require('path')

const platform = os.platform()

console.log(`🔍 Sistema operativo detectado: ${platform}`)

let command, args

if (platform === 'win32') {
  // Windows
  console.log('🪟 Ejecutando setup para Windows...\n')
  command = 'powershell'
  args = ['-ExecutionPolicy', 'Bypass', '-File', path.join(__dirname, 'setup-local.ps1')]
} else {
  // Linux, macOS, etc.
  console.log('🐧 Ejecutando setup para Unix/Linux/macOS...\n')
  command = 'bash'
  args = [path.join(__dirname, 'setup-local.sh')]
}

const child = spawn(command, args, {
  stdio: 'inherit',
  shell: true
})

child.on('error', (error) => {
  console.error(`❌ Error ejecutando el setup: ${error.message}`)
  process.exit(1)
})

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Setup falló con código ${code}`)
    process.exit(code)
  }
  process.exit(0)
})
