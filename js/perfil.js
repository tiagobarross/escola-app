async function buscarPerfil() {
  const cpf = document.getElementById("cpfInput").value.trim();
  const res = await fetch(`http://localhost:3000/alunos?cpf=${cpf}`);
  const alunos = await res.json();
  const perfilDiv = document.getElementById("perfil");

  if (alunos.length > 0) {
    const aluno = alunos[0];

    let cursoHTML = "<p><strong>Curso:</strong> Aluno não está matriculado em nenhum curso.</p>";

    if (aluno.cursoId) {
      try {
        const cursoRes = await fetch(`http://localhost:3000/cursos/${aluno.cursoId}`);
        if (cursoRes.ok) {
          const curso = await cursoRes.json();
          cursoHTML = `
            <h3>Curso</h3>
            <p><strong>Nome:</strong> ${curso.nome}</p>
            <p><strong>Descrição:</strong> ${curso.descricao}</p>
            <p><strong>Carga Horária:</strong> ${curso.cargaHoraria}</p>
          `;
        }
      } catch (error) {
        console.warn("Erro ao buscar curso:", error);
      }
    }

    perfilDiv.style.display = "block";
    perfilDiv.innerHTML = `
      <h3>Dados do Aluno</h3>
      <p><strong>Nome:</strong> ${aluno.nome}</p>
      <p><strong>CPF:</strong> ${aluno.cpf}</p>
      <p><strong>Data de Nascimento:</strong> ${aluno.dataNascimento}</p>
      ${cursoHTML}
    `;
  } else {
    perfilDiv.style.display = "block";
    perfilDiv.innerHTML = "<p>CPF não encontrado.</p>";
  }
}
