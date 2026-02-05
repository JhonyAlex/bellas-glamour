#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando build para Vercel...');

// Verificar que existan los archivos necesarios
const requiredFiles = [
  'vercel.json',
  'package.json',
  'vite.config.ts'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} encontrado`);
  } else {
    console.log(`❌ ${file} no encontrado`);
  }
});

// Verificar configuración de vercel.json
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  console.log('📄 Configuración de Vercel:');
  console.log('- Version:', vercelConfig.version);
  console.log('- Builds:', vercelConfig.builds?.length || 0);
  console.log('- Routes:', vercelConfig.routes?.length || 0);
  console.log('- Headers:', vercelConfig.headers?.length || 0);
} catch (error) {
  console.log('❌ Error leyendo vercel.json:', error.message);
}

// Verificar que el archivo index.html exista
if (fs.existsSync('index.html')) {
  console.log('✅ index.html encontrado');
} else {
  console.log('❌ index.html no encontrado');
}

// Verificar variables de entorno
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

console.log('\n🌍 Variables de entorno:');
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName} configurada`);
  } else {
    console.log(`❌ ${varName} no configurada`);
  }
});

console.log('\n🎯 Build listo para Vercel!');
console.log('Asegúrate de que las variables de entorno estén configuradas en:');
console.log('Vercel Dashboard → Settings → Environment Variables');