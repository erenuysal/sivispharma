# Sivis Pharma — Demo Site

Müşteri sunumu için hazırlanmış Sivis Pharma vitrin sitesi (Seperra Software).

## Yerel geliştirme

```bash
npm install
npm run dev
```

## GitHub Pages

**Müşteri linki:** https://erenuysal.github.io/sivispharma/

```bash
# Yeniden yayın
$env:VITE_BASE="/sivispharma/"   # PowerShell
npm run build
npx gh-pages -d dist -b gh-pages
```
