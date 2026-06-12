# Gerador de Senhas com JavaScript

Um gerador de senhas seguro, responsivo e personalizável, construído com HTML, CSS e JavaScript puro, sem dependências externas.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Sobre o Projeto

O **Gerador de Senhas** é uma aplicação web client-side que permite criar senhas fortes e personalizadas diretamente no navegador, sem enviar nenhum dado para servidores externos. Todo o processo de geração ocorre localmente, garantindo privacidade total ao usuário.

---

## Funcionalidades

- Geração instantânea de senhas aleatórias
- Controle de comprimento via slider (4 a 64 caracteres)
- Inclusão opcional de letras maiúsculas, números e símbolos
- Indicador visual de força da senha (crítica / aviso / segura)
- Cópia para área de transferência com um clique
- Regeneração da senha com botão dedicado
- Redimensionamento automático da fonte conforme o tamanho da senha
- Design responsivo para mobile e desktop

---

## Como Funciona

### Geração da Senha — `generatePassword()`

A senha é construída a partir de um **pool de caracteres** dinâmico. O pool começa sempre com as letras minúsculas (`a–z`) e os demais grupos são adicionados conforme as opções marcadas pelo usuário:

| Opção ativada | Caracteres adicionados |
|---|---|
| Maiúsculas | `A–Z` |
| Números | `0–9` |
| Símbolos | `!@#$%^&*()_+` |

A cada iteração do loop, um índice aleatório é gerado via `Math.random()` e o caractere correspondente no pool é concatenado à senha final.

```js
for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomIndex, randomIndex + 1);
}
```

---

### Indicador de Força — `calculateQuality()`

A força da senha é calculada por uma fórmula ponderada que considera o comprimento e os tipos de caracteres ativos:

```
força = (comprimento / 64) × 35
      + (maiúsculas ativas ? 15 : 0)
      + (números ativos   ? 25 : 0)
      + (símbolos ativos  ? 30 : 0)
```

O resultado é limitado a 100% e mapeado para três estados visuais:

| Força | Cor da barra | Classe CSS |
|---|---|---|
| > 69% | 🟢 Verde | `.safe` |
| 51–69% | 🟡 Amarelo | `.warning` |
| ≤ 50% | 🔴 Vermelho | `.critical` |

A largura da barra é atualizada via `style.width` em tempo real, criando uma animação fluida de transição.

---

### Ajuste de Fonte — `calculateFontSize()`

Para evitar que senhas longas transbordem o container, o tamanho da fonte é reduzido progressivamente conforme o comprimento aumenta:

| Comprimento | Classe aplicada | Tamanho da fonte |
|---|---|---|
| ≤ 22 caracteres | *(padrão)* | `2.5rem` |
| 23–32 caracteres | `.font-sm` | `1.8rem` |
| 33–45 caracteres | `.font-xs` | `1.2rem` |
| > 45 caracteres | `.font-xxs` | `0.9rem` |

---

### Cópia para Área de Transferência — `copy()`

Utiliza a **Clipboard API** nativa do navegador para copiar a senha sem precisar selecionar o texto manualmente:

```js
function copy() {
    navigator.clipboard.writeText(inputEl.value);
}
```

---

### Eventos e Interatividade

| Elemento | Evento | Ação |
|---|---|---|
| Slider de tamanho | `input` | Atualiza `passwordLength` e regenera a senha |
| Checkbox Maiúsculas | `click` | Regenera a senha com o novo pool |
| Checkbox Números | `click` | Regenera a senha com o novo pool |
| Checkbox Símbolos | `click` | Regenera a senha com o novo pool |
| Botão ícone copiar | `click` | Copia a senha para a área de transferência |
| Botão "Copiar Senha" | `click` | Copia a senha para a área de transferência |
| Botão renovar | `click` | Gera uma nova senha com as configurações atuais |

---

### Inicialização

Ao carregar a página, `generatePassword()` é chamada automaticamente, garantindo que o usuário já visualize uma senha gerada ao acessar a aplicação — sem precisar interagir primeiro.

---
