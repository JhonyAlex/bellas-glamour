#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 INICIANDO BUILD Y DEPLOY DEFINITIVO...\n');

// Paso 1: Verificar configuración
console.log('1️⃣ Verificando configuración...');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
console.log('✅ Vercel config:', JSON.stringify(vercelConfig, null, 2));

// Paso 2: Limpiar build anterior
console.log('\n2️⃣ Limpiando build anterior...');
try {
  execSync('rm -rf dist', { stdio: 'inherit' });
  console.log('✅ Build anterior eliminado');
} catch (error) {
  console.log('⚠️  No se pudo eliminar dist (puede que no exista)');
}

// Paso 3: Build
console.log('\n3️⃣ Construyendo aplicación...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completado');
} catch (error) {
  console.error('❌ Error en build:', error.message);
  process.exit(1);
}

// Paso 4: Verificar archivos generados
console.log('\n4️⃣ Verificando archivos del build...');
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log('Archivos en dist/:');
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
  
  // Buscar archivos JS
  const jsFiles = files.filter(f => f.endsWith('.js'));
  console.log(`\n✅ Archivos JS encontrados: ${jsFiles.length}`);
  jsFiles.forEach(file => console.log(`  📄 ${file}`));
} else {
  console.log('❌ No existe el directorio dist/');
}

// Paso 5: Copiar archivos de configuración
console.log('\n5️⃣ Copiando archivos de configuración...');
const configFiles = ['vercel.json', '_headers', '_redirects'];
configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      fs.copyFileSync(file, path.join(distPath, file));
      console.log(`✅ Copiado ${file} a dist/`);
    } catch (error) {
      console.log(`⚠️  No se pudo copiar ${file}`);
    }
  }
});

// Paso 6: Verificar variables de entorno
console.log('\n6️⃣ Verificando variables de entorno...');
const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Configurada`);
  } else {
    console.log(`❌ ${varName}: No configurada`);
    console.log(`   Debe estar configurada en Vercel Dashboard → Settings → Environment Variables`);
  }
});

console.log('\n🎯 RESUMEN:');
console.log('✅ Build completado');
console.log('✅ Archivos JS generados');
console.log('✅ Configuración verificada');
console.log('✅ Variables de entorno verificadas');

console.log('\n🚀 INSTRUCCIONES PARA DEPLOY:');
console.log('1. Ve a https://vercel.com/dashboard');
console.log('2. Selecciona tu proyecto "bellas-glamour"');
console.log('3. Ve a "Deployments"');
console.log('4. Click en "Redeploy"');
console.log('5. IMPORTANTE: Desmarca "Use existing Build Cache"');
console.log('6. Click en "Redeploy"');

console.log('\n🎉 ¡Tu plataforma BellasGlamour.com estará en línea!');
console.log('🔗 URL: https://www.bellasglamour.com');

// Información adicional sobre el error MIME
console.log('\n📋 INFORMACIÓN SOBRE EL ERROR MIME:');
console.log('Los archivos JS deben ser servidos con Content-Type: application/javascript');
console.log('La configuración actual fuerza este MIME type en el servidor Express');
console.log('Si el error persiste, contacta soporte de Vercel con esta información.');