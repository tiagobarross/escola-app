let cursos = [];
let editandoCursoId = null;

async function listarCursos() {
  const filtro = document.getElementById("filtroCurso").value.toLowerCase();
  const res = await fetch("http://localhost:3000/cursos");
  cursos = await res.json();
  const tbody = document.querySelector("#tabelaCursos tbody");
  tbody.innerHTML = "";

  cursos
    .filter(curso => curso.nome.toLowerCase().includes(filtro))
    .forEach(curso => {
      const tr = document.createElement("tr");

      const tdNome = document.createElement("td");
      tdNome.textContent = curso.nome;

      const tdDescricao = document.createElement("td");
      tdDescricao.textContent = curso.descricao;

      const tdCarga = document.createElement("td");
      tdCarga.textContent = curso.cargaHoraria;

      const tdAcoes = document.createElement("td");

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.addEventListener("click", () => editarCurso(curso.id));

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.addEventListener("click", () => excluirCurso(curso.id));

      tdAcoes.appendChild(btnEditar);
      tdAcoes.appendChild(btnExcluir);

      tr.appendChild(tdNome);
      tr.appendChild(tdDescricao);
      tr.appendChild(tdCarga);
      tr.appendChild(tdAcoes);

      tbody.appendChild(tr);
    });
}

function mostrarFormularioCurso() {
  document.getElementById("formCurso").style.display = "block";
  document.getElementById("nomeCurso").value = "";
  document.getElementById("descricaoCurso").value = "";
  document.getElementById("cargaHorariaCurso").value = "";
  editandoCursoId = null;
}

async function salvarCurso() {
  const nome = document.getElementById("nomeCurso").value.trim();
  const descricao = document.getElementById("descricaoCurso").value.trim();
  const cargaHoraria = document.getElementById("cargaHorariaCurso").value.trim();

  if (!nome || !descricao || !cargaHoraria) {
    alert("Preencha todos os campos do curso.");
    return;
  }

  const curso = {
    nome,
    descricao,
    cargaHoraria,
    dataCadastro: new Date().toISOString().split("T")[0]
  };

  if (editandoCursoId) {
    await fetch(`http://localhost:3000/cursos/${editandoCursoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso)
    });
  } else {
    await fetch("http://localhost:3000/cursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso)
    });
  }

  await listarCursos();
  document.getElementById("formCurso").style.display = "none";
}

async function editarCurso(id) {
  const res = await fetch("http://localhost:3000/cursos");
  cursos = await res.json();

  const curso = cursos.find(c => String(c.id) === String(id));
  if (!curso) {
    alert("Curso não encontrado!");
    return;
  }

  document.getElementById("nomeCurso").value = curso.nome;
  document.getElementById("descricaoCurso").value = curso.descricao;
  document.getElementById("cargaHorariaCurso").value = curso.cargaHoraria;
  document.getElementById("formCurso").style.display = "block";

  // Isso é essencial:
  editandoCursoId = curso.id;
}


async function excluirCurso(id) {
  if (confirm("Tem certeza que deseja excluir este curso?")) {
    const res = await fetch(`http://localhost:3000/cursos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir curso");
    alert("Curso excluído com sucesso!");
    await listarCursos();
  }
}

let alunos = [];
let editandoAlunoId = null;

async function carregarCursosNoSelect() {
  const res = await fetch("http://localhost:3000/cursos");
  const cursosSelect = await res.json();
  const select = document.getElementById("cursoAlunoSelect");
  select.innerHTML = '<option value="">Selecione um curso</option>';
  cursosSelect.forEach(curso => {
    const option = document.createElement("option");
    option.value = curso.id;
    option.textContent = curso.nome;
    select.appendChild(option);
  });
}

async function listarAlunos() {
  const filtro = document.getElementById("filtroAluno").value.toLowerCase();
  const resAlunos = await fetch("http://localhost:3000/alunos");
  alunos = await resAlunos.json();

  const resCursos = await fetch("http://localhost:3000/cursos");
  const cursos = await resCursos.json();

  const tbody = document.querySelector("#tabelaAlunos tbody");
  tbody.innerHTML = "";

  alunos
    .filter(aluno => aluno.nome.toLowerCase().includes(filtro))
    .forEach(aluno => {
      const curso = cursos.find(c => c.id === aluno.cursoId);
      const tr = document.createElement("tr");

      const tdNome = document.createElement("td");
      tdNome.textContent = aluno.nome;

      const tdCpf = document.createElement("td");
      tdCpf.textContent = aluno.cpf;

      const tdNascimento = document.createElement("td");
      tdNascimento.textContent = aluno.dataNascimento;

      const tdCurso = document.createElement("td");
      tdCurso.textContent = curso ? curso.nome : "N/A";

      const tdAcoes = document.createElement("td");

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.addEventListener("click", () => editarAluno(aluno.id));

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.addEventListener("click", () => excluirAluno(aluno.id));

      tdAcoes.appendChild(btnEditar);
      tdAcoes.appendChild(btnExcluir);

      tr.appendChild(tdNome);
      tr.appendChild(tdCpf);
      tr.appendChild(tdNascimento);
      tr.appendChild(tdCurso);
      tr.appendChild(tdAcoes);

      tbody.appendChild(tr);
    });
}

function mostrarFormularioAluno() {
  document.getElementById("formAluno").style.display = "block";
  document.getElementById("nomeAluno").value = "";
  document.getElementById("cpfAluno").value = "";
  document.getElementById("dataNascimentoAluno").value = "";
  document.getElementById("cursoAlunoSelect").value = "";
  editandoAlunoId = null;
  carregarCursosNoSelect();
}

async function salvarAluno() {
  const nome = document.getElementById("nomeAluno").value.trim();
  const cpf = document.getElementById("cpfAluno").value.trim();
  const dataNascimento = document.getElementById("dataNascimentoAluno").value;
  const cursoValue = document.getElementById("cursoAlunoSelect").value;
  const cursoId = cursoValue;

  const aluno = { nome, cpf, dataNascimento, cursoId };

  if (editandoAlunoId) {
    await fetch(`http://localhost:3000/alunos/${editandoAlunoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
  } else {
    await fetch("http://localhost:3000/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno)
    });
  }

  await listarAlunos();
  document.getElementById("formAluno").style.display = "none";
}

async function editarAluno(id) {
  const resAlunos = await fetch("http://localhost:3000/alunos");
  alunos = await resAlunos.json();
  await carregarCursosNoSelect();

  const aluno = alunos.find(a => String(a.id) === String(id));
  if (!aluno) {
    alert("Aluno não encontrado.");
    return;
  }

  document.getElementById("nomeAluno").value = aluno.nome;
  document.getElementById("cpfAluno").value = aluno.cpf;
  document.getElementById("dataNascimentoAluno").value = aluno.dataNascimento;
  document.getElementById("cursoAlunoSelect").value = aluno.cursoId;

  document.getElementById("formAluno").style.display = "block";

  editandoAlunoId = aluno.id;
}


async function excluirAluno(id) {
  if (!confirm("Tem certeza que deseja excluir este aluno?")) return;
  const res = await fetch(`http://localhost:3000/alunos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao excluir aluno");
  alert("Aluno excluído com sucesso!");
  await listarAlunos();
}

listarCursos();
listarAlunos();
