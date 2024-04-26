const inputNome = document.getElementById('input_nome')
const inputRa = document.getElementById('input_ra')
const inputEmail = document.getElementById('input_email')
const inputProva1 = document.getElementById('input_prova_1')
const inputProvaIntegrada1 = document.getElementById('input_prova_integrada_1')
const inputAep1 = document.getElementById('input_aep_1')
const inputProva2 = document.getElementById('input_prova_2')
const inputProvaIntegrada2 = document.getElementById('input_prova_integrada_2')
const inputAep2 = document.getElementById('input_aep_2')
const form = document.getElementById('form') 
const tabela = document.getElementById('tabela')

let listaAlunos = []

function adicionaDadosAluno() {


    // adiciona novo aluno na lista
    listaAlunos.push({
        // define os atributos do aluno
        nome: inputNome.value,
        email: inputEmail.value,
        ra: inputRa.value,
        notas: {
            // define as notas do primeiro bimestre 
            primeiroBimestre: {
                prova: inputProva1.value,
                integrada: inputProvaIntegrada1.value,
                aep: inputAep1.value,
            },
            // define as notas do segundo bimestre 
            segundoBimestre: {
                prova: inputProva2.value,
                integrada: inputProvaIntegrada2.value,
                aep: inputAep2.value,
            }
        }
    })

    mostrarDadosAlunos()
}

function mostrarDadosAlunos() {

    // limpando a tabela
    tabela.innerHTML = '';
    
    // percorrendo a lista de alunos
    listaAlunos.forEach((aluno, posicao) => {

        // criando os elementos html

    })

    // salvando a lista no localstorage
    localStorage.setItem('alunos', JSON.stringify(listaAlunos))
}

function recarregarDadosAlunos() {

    // pegando os dados do localstorage
    const dadosAlunosLocalStorage = localStorage.getItem('alunos')

    // verificando se há dados no localstorage
    if (dadosAlunosLocalStorage) {

        // adicionando os dados a lista de alunos
        listaAlunos = JSON.parse(dadosAlunosLocalStorage)
    }

    mostrarDadosAlunos()
}

recarregarDadosAlunos()

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
function excluir_aluno(posicao) {

    // Retirar elemento da lista
    listaAlunos.splice(posicao, 1)

    mostrarDadosAlunos()
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

    mostrarDadosAlunos()
}

function calcularmedia(aep,prova,inte) {
    (prova * 0.8) + (aep * 0.1) + (inte * 0.1)

    return ((prova * 0.8)+(aep * 0.1)+(inte * 0.1))/ 3
}

function calcularmediasemestre(n1,n2){
    return (n1+n2)/ 2
}
