# Entre Camadas — Galeria de Patrícia

Site estático para GitHub Pages, sem dependências de build.

## Publicar no GitHub Pages

1. Cria um repositório no GitHub e faz push destes ficheiros.
2. Em **Settings → Pages**, escolhe **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.
3. Guarda e abre o endereço indicado pelo GitHub.

## Substituir as obras-demo

As imagens atuais são composições SVG/CSS de demonstração, para o site ficar apresentável antes de receber as fotografias reais. Para usar fotografias:

- coloca os ficheiros na pasta `imagens/`;
- adiciona os ficheiros JPG/WebP;
- adiciona uma entrada em `imagens/obras.json` com o título, técnica e caminho do ficheiro;
- o site cria automaticamente o cartão, o filtro e a vista ampliada.

Exemplo de entrada:

```json
{"title":"Mar aberto","meta":"Acrílico sobre tela · 2026","category":"acrilico","art":"sea","image":"imagens/mar-aberto.jpg"}
```

Para cada nova obra, basta copiar a imagem para `imagens/`, atualizar `obras.json` e fazer novo upload.

O email de contacto (`ola@patricia.art`) também pode ser alterado diretamente no HTML.
