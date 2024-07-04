## Começando

Para iniciar o projeto, rode o comando:

```bash
npm run dev
```

Abra [http://localhost:3000] com o seu browser.
# Internacionalização
## Atualizando Internacionalização
//! Importação de arquivos de internacionalização está automática na run do projeto

Primeiro entre no site i18nexus cuja chave está no .env
Atualize as traduções como necessário
Então utilize o comando:

```bash
i18nexus pull
```

Os JSONs de internacionalização serão atualizados automaticamente

- Para a implementação de traduções as páginas devem ser criadas dentro de um <TranslationsProvider>, e então seus componentes devem importar o useTranslation.
