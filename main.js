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

    nome = inputNome.value.trim()
    ra = inputRa.value.trim()

    if (nome == '') {
        return alert('O nome não pode estar em branco.')
    }
    if (ra == '') {
        return alert('O RA não pode estar em branco.')
    }

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

    form.reset()
    mostrarDadosAluno()
}

function mostrarDadosAlunos() {
    
    // pegando as linhas da tabela
    let linhas = tabela.children
    let listaLinhas = Array.from(linhas)

    // percorrendo as linhas e deletando
    for (let i = listaLinhas.length - 1; i > 0; i--) {
        tabela.removeChild(listaLinhas[i])
    }

    // percorrendo a lista de alunos
    listaAlunos.forEach((aluno, posicao) => {

        // criando os elementos da tabela
        const linhaTabela = document.createElement("tr")
        const colunaNome = document.createElement("td")
        const colunaRa = document.createElement("td")
        const colunaEmail = document.createElement("td")
        const colunaProva1 = document.createElement("td")
        const colunaIntegrada1 = document.createElement("td")
        const colunaAep1 = document.createElement("td")
        const colunaMedia1 = document.createElement("td")
        const colunaProva2 = document.createElement("td")
        const colunaIntegrada2 = document.createElement("td")
        const colunaAep2 = document.createElement("td")
        const colunaMedia2 = document.createElement("td")
        const colunaMediaFinal = document.createElement("td")
        const colunaStatus = document.createElement("td")

        const btnEditar = document.createElement('button')
        const imagemEditar = document.createElement("img")
        imagemEditar.src = "img/editar.png"
        btnEditar.className = 'botoes'

        btnEditar.appendChild(imagemEditar)
        btnEditar.setAttribute('onclick', `editar_aluno('${posicao}')`);

        const btnExcluir = document.createElement('button')
        const imagemExcluir = document.createElement("img")
        imagemExcluir.src = "img/excluir.png"
        btnExcluir.className = 'botoes'

        btnExcluir.appendChild(imagemExcluir)
        btnExcluir.setAttribute('onclick', `excluir_aluno('${posicao}')`);

        let prova1 = aluno.notas.primeiroBimestre.prova
        let integrada1 = aluno.notas.primeiroBimestre.integrada
        let aep1 = aluno.notas.primeiroBimestre.aep
        let prova2 = aluno.notas.segundoBimestre.prova
        let integrada2 = aluno.notas.segundoBimestre.integrada
        let aep2 = aluno.notas.segundoBimestre.aep

        let media1 = '' // calculaMediaBimestre(prova1, integrada1, aep1)
        let media2 = '' // calculaMediaBimestre(prova2, integrada2, aep2)
        let mediaFinal = '' // calculaMediaSemestre(media1, media2)
        let status = '' // statusNota(mediaFinal)

        // atribuindo texto
        colunaNome.innerText = aluno.nome
        colunaRa.innerText = aluno.ra
        colunaEmail.innerText = aluno.email 
        colunaProva1.innerText = prova1
        colunaIntegrada1.innerText = integrada1
        colunaAep1.innerText = aep1
        colunaMedia1.innerText = media1
        colunaProva2.innerText = prova2
        colunaIntegrada2.innerText = integrada2
        colunaAep2.innerText = aep2
        colunaMedia2.innerText = media2
        colunaMediaFinal.innerText = mediaFinal 
        colunaStatus.innerText = status

        // atribuindo texto nas colunas certas
        linhaTabela.appendChild(colunaNome)
        linhaTabela.appendChild(colunaRa)
        linhaTabela.appendChild(colunaEmail)
        linhaTabela.appendChild(colunaProva1)
        linhaTabela.appendChild(colunaIntegrada1)
        linhaTabela.appendChild(colunaAep1)
        linhaTabela.appendChild(colunaMedia1)
        linhaTabela.appendChild(colunaProva2)
        linhaTabela.appendChild(colunaIntegrada2)
        linhaTabela.appendChild(colunaAep2)
        linhaTabela.appendChild(colunaMedia2)
        linhaTabela.appendChild(colunaMediaFinal)
        linhaTabela.appendChild(colunaStatus)
        linhaTabela.appendChild(btnEditar)
        linhaTabela.appendChild(btnExcluir)
        
        tabela.appendChild(linhaTabela)
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

function calcularMediaBimestre(prova, inte, aep){

    let media = (prova * 0.8)+(aep * 0.1)+(inte * 0.1)
    media = Math.max(0, Math.min(media, 10))

    return media
}
    
function calcularMediaSemestre(n1,n2){
    return (n1+n2)/ 2
}
