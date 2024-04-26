const inputNome = document.getElementById('input_nome')
const inputRa = document.getElementById('input_ra')
const inputEmail = document.getElementById('input_email')
const inputProva1 = document.getElementById('input_prova_1')
const inputProvaIntegrada1 = document.getElementById('input_prova_integrada_1')
const inputAep1 = document.getElementById('input_aep_1')
const inputProva2 = document.getElementById('input_prova_2')
const inputProvaIntegrada2 = document.getElementById('input_prova_integrada_2')
const inputAep2 = document.getElementById('input_aep_2')

let listaAlunos = []

function adicionaDadosAluno() {


    listaAlunos.push({
        nome: inputNome.value,
        email: inputEmail.value,
        ra: inputRa.value,
        notas: { 
            primeiroBimestre: {
                prova: inputProva1.value,
                integrada: inputProvaIntegrada1.value,
                aep: inputAep1.value,
            }, 
            segundoBimestre: {
                prova: inputProva2.value,
                integrada: inputProvaIntegrada2.value,
                aep: inputAep2.value,
            }
        }
    })
}

// Função para recarregar tabela HTML após novo registro de alunos (Feito por: Lucas Leffel e GPT)
function mostrarDadosAluno() {
    const tabela = document.querySelector('.conteiner-lista table');

    // Limpa a tabela
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }

    // Preenche a tabela com os dados dos alunos
    listaAlunos.forEach(aluno => {

        const tr = document.createElement('tr');
        
        const tdNome = document.createElement('td');
        tdNome.textContent = aluno.nome;
        tr.appendChild(tdNome);

        const tdNotas = document.createElement('td');
        tdNotas.textContent = `${aluno.notas.primeiroBimestre.prova}, ${aluno.notas.primeiroBimestre.integrada}, ${aluno.notas.primeiroBimestre.aep}`;
        tr.appendChild(tdNotas);

        const tdProva1 = document.createElement('td');
        tdProva1.textContent = aluno.notas.segundoBimestre.prova;
        tr.appendChild(tdProva1);

        const tdIntegrada1 = document.createElement('td');
        tdIntegrada1.textContent = aluno.notas.segundoBimestre.integrada;
        tr.appendChild(tdIntegrada1);

        const tdAep1 = document.createElement('td');
        tdAep1.textContent = aluno.notas.segundoBimestre.aep;
        tr.appendChild(tdAep1);

        const tdStatus = document.createElement('td');
        tdStatus.textContent = calcularStatusDeAprovacao(aluno);
        tr.appendChild(tdStatus);

        tabela.appendChild(tr);
    });
}

// Função para determinar status de aprovação do aluno (Feito por: Lucas Leffel)
function statusNota(media_final) {
    
    // Declarando variável de status
    let status;

    // Se nota mais ou igual a 6 aluno aprovado aprovado
    if (media_final >= 6) {
        
        status = "Aprovado!";
    }

    // Se nota maior ou igual a 3 e menor que 6 aluno em recuperação
    else if (media_final < 6 && media_final >= 3) {

        status = "Em recuperação!";
    }

    // Se não, aluno reprovado
    else {

        status = "Reprovado!";
    }
    
    //retornar status
    return status;
}

// Função de excluir um aluno registrado (Feito por: Lucas Leffel)
function excluir_aluno(nome) {

    // Retirar elemento da lista
    listaAlunos.splice(posicao, 1)
}

// Função de editar registro (Feito parcialmente por: Lucas Leffel)
function editar_aluno(posicao) {

    // Ainda não sei
    texto = prompt('Nova descrição:').trim();

    // Se novo registro for nulo faça:
    if (texto == '' || texto == null) {

        // Exiba tela de erro e execute a função
        alert('um campo não foi preenchido!');       
        editar_aluno(posicao);
    }
    
    // Se não, faça:
    else {
    
    // Faça o novo registro
    listaAlunos[posicao].nome = texto;
    listaAlunos[posicao].email = texto;
    listaAlunos[posicao].ra = texto;
    listaAlunos[posicao].notas = texto;
    }
}
 function calcularmedia(aep,prova,inte){
    (prova * 0.8) + (aep * 0.1) + (inte * 0.1)

        return ((prova * 0.8)+(aep * 0.1)+(inte * 0.1))/ 3
    }
    function calcularmediasemestre(n1,n2){
        return (n1+n2)/ 2
        }
