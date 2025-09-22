#!/bin/bash

echo "🚀 Iniciando deploy para GitHub Pages..."

# Verificar se está no repositório correto
if [ ! -f "angular.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto Angular!"
    exit 1
fi

# Limpar builds anteriores
echo "🧹 Limpando builds anteriores..."
rm -rf dist/

# Build específico para GitHub Pages (sem SSR)
echo "🔨 Fazendo build estático para GitHub Pages..."
ng build --configuration github-pages --base-href "https://maduzinha04.github.io/google-fit-viewing/"

# Verificar se o build foi bem-sucedido
if [ ! -d "dist/google-fit-viewing/browser" ]; then
    echo "❌ Erro: Build falhou! Verificando estrutura..."
    ls -la dist/ 2>/dev/null || echo "Pasta dist não existe"
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# Verificar estrutura do build
echo "📁 Estrutura do build:"
ls -la dist/google-fit-viewing/browser/

# Criar arquivo .nojekyll (necessário para GitHub Pages)
echo "📝 Criando arquivo .nojekyll..."
touch dist/google-fit-viewing/browser/.nojekyll

# Copiar index.html para 404.html (para SPA routing)
echo "📋 Copiando index.html para 404.html..."
cp dist/google-fit-viewing/browser/index.html dist/google-fit-viewing/browser/404.html

# Verificar se os arquivos foram criados
echo "📋 Arquivos criados:"
ls -la dist/google-fit-viewing/browser/ | grep -E "(index.html|404.html|.nojekyll)"

# Deploy para gh-pages
echo "🚀 Fazendo deploy para GitHub Pages..."
npx angular-cli-ghpages --dir=dist/google-fit-viewing/browser --no-silent

echo "🎉 Deploy concluído!"
echo "🌐 Seu site estará disponível em: https://Maduzinha04.github.io/google-fit-viewing/"
