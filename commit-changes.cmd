@echo off
cd /d "c:\Users\Debora\Documents\moneymap-oficial"
echo Finalizando merge...
git commit -m "Merge main into backend-joao"
echo.
echo Verificando status...
git status
echo.
echo Adicionando arquivos modificados...
git add .
echo.
echo Fazendo commit das alteracoes do schema...
git commit -m "feat: Adicionar schema Prisma completo e atualizacoes do servidor

- Schema PostgreSQL completo com 11 tabelas
- Relacionamentos com FKs e indices
- Enums para todos os tipos
- Constraints e validacoes
- Servidor atualizado com melhor configuracao"
echo.
echo Fazendo push para branch backend-joao...
git push origin backend-joao
echo.
echo Concluido!
pause