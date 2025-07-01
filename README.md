# 📚 Escola App

Sistema web para gerenciamento de alunos e cursos em uma instituição de ensino. Ideal para estudos e simulações com front-end JavaScript puro e backend fake com JSON Server.

## 🚀 Funcionalidades

- 🔍 Buscar e visualizar perfil de aluno por CPF
- 📋 Cadastrar, editar e excluir **cursos**
- 🧑‍🎓 Cadastrar, editar e excluir **alunos**
- 🔄 Interface com abas para gerenciar cursos e alunos separadamente
- 💾 Armazenamento simulado via JSON Server

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- [JSON Server](https://github.com/typicode/json-server)

## 📦 Como rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/escola-app.git
cd escola-app
```

2. **Instale o JSON Server (caso ainda não tenha):**

```bash
npm install -g json-server
```

3. **Inicie o servidor:**

```bash
json-server --watch db.json --port 3000
```

4. **Abra o arquivo index.html no seu navegador:**

## 📝 Estrutura de diretórios

```bash
/escola-app
├── css/
│   └── style.css
├── js/
│   ├── admin.js
│   └── perfil.js
├── index.html
├── admin.html
├── perfil.html
└── db.json
```
