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

    let nome = inputNome.value.trim()
    let ra = inputRa.value.trim()
    let valorProva1 = inputProva1.value
    let valorProva2 = inputProva2.value
    let valorAep1 = inputAep1.value
    let valorAep2 = inputAep2.value
    let valorIntegrada1 = inputProvaIntegrada1.value
    let valorIntegrada2 = inputProvaIntegrada2.value

    if (nome == '') {
        return alert('O nome não pode estar em branco.')
    }
    if (ra == '') {
        return alert('O RA não pode estar em branco.')
    }
    if (inputEmail.value == '') {
        return alert('O Email não pode estar em branco.')
    }
    if (valorProva1 == '' || valorProva1 < 0 || valorProva1 > 10) {
        return alert('Prova1 não pode estar em branco, menor que zero ou maior que dez.')
    }
    if (valorProva2 == '' || valorProva2 < 0 || valorProva2 > 10) {
        return alert('Prova2 não pode estar em branco, menor que zero ou maior que dez.')
    }
    if (valorAep1 == '' || valorAep1 < 0 || valorAep1 > 10) {
        return alert('AEP1 não pode estar em branco, menor que zero ou maior que dez.')
    }
    if (valorAep2 == '' || valorAep2 < 0 || valorAep2 > 10) {
        return alert('AEP2 não pode estar em branco, menor que zero ou maior que dez.')
    }
    if (valorIntegrada1 == '' || valorIntegrada1 < 0 || valorIntegrada1 > 10) {
        return alert('Integrada1 não pode estar em branco, menor que zero ou maior que dez.')
    }
    if (valorIntegrada2 == '' || valorIntegrada2 < 0 || valorIntegrada2 > 10) {
        return alert('Integrada2 não pode estar em branco, menor que zero ou maior que dez.')
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
    mostrarDadosAlunos()
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
        
        colunaNome.setAttribute('onclick', `editar_nome('${posicao}')`);
        colunaRa.setAttribute('onclick', `editar_ra('${posicao}')`);
        colunaEmail.setAttribute('onclick', `editar_email('${posicao}')`);
        colunaAep1.setAttribute('onclick', `editar_aep('${posicao}')`);
        colunaAep2.setAttribute('onclick', `editar_aep2('${posicao}')`);
        colunaIntegrada1.setAttribute('onclick', `editar_integrada('${posicao}')`);
        colunaIntegrada2.setAttribute('onclick', `editar_integrada2('${posicao}')`);
        colunaProva1.setAttribute('onclick', `editar_prova('${posicao}')`);
        colunaProva2.setAttribute('onclick', `editar_prova2('${posicao}')`);

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

        let media1 = calcularMediaBimestre(prova1, integrada1, aep1)
        let media2 = calcularMediaBimestre(prova2, integrada2, aep2)
        let mediaFinal = calcularMediaSemestre(media1, media2)
        let status = statusNota(mediaFinal)

        if (status == 'Aprovado!') {
            colunaStatus.setAttribute('class', 'aprovado')
        } else if (status == 'Em recuperação!') {
            colunaStatus.setAttribute('class', 'recuperacao')
        } else {
            colunaStatus.setAttribute('class', 'reprovado')
        }

        // atribuindo texto
        colunaNome.innerText = aluno.nome
        colunaRa.innerText = aluno.ra
        colunaEmail.innerText = aluno.email 
        colunaProva1.innerText = prova1
        colunaIntegrada1.innerText = integrada1
        colunaAep1.innerText = aep1
        colunaMedia1.innerText = media1.toFixed(2)
        colunaProva2.innerText = prova2
        colunaIntegrada2.innerText = integrada2
        colunaAep2.innerText = aep2
        colunaMedia2.innerText = media2.toFixed(2)
        colunaMediaFinal.innerText = mediaFinal.toFixed(2)
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

function calcularMediaBimestre(prova, inte, aep){

    let media = (prova * 0.8)+(aep * 0.1)+(inte * 0.1)
    media = Math.max(0, Math.min(media, 10))

    return media
}
    
function calcularMediaSemestre(n1,n2){
    return (n1+n2)/ 2
}

// Funções para editar registro

function editar_nome(posicao) {

    texto = prompt('Novo nome:').trim();

    // Se novo registro for nulo faça:
    if (texto == '' || texto == null) {

        // Exiba tela de erro e execute a função
        alert('um campo não foi preenchido!');
        editar_nome(posicao);
    }

    listaAlunos[posicao].nome = texto;

    mostrarDadosAlunos()
}

function editar_email(posicao) {

    texto = prompt('Novo email:').trim();

    // Se novo registro for nulo faça:
    if (texto == '' || texto == null) {

        // Exiba tela de erro e execute a função
        alert('um campo não foi preenchido!');
        editar_email(posicao);
    }

    listaAlunos[posicao].email = texto;

    mostrarDadosAlunos()
}

function editar_nome(posicao) {

    texto = prompt('Novo nome:').trim();

    // Se novo registro for nulo faça:
    if (texto == '' || texto == null) {

        // Exiba tela de erro e execute a função
        alert('um campo não foi preenchido!');
        editar_nome(posicao);
    }

    listaAlunos[posicao].nome = texto;

    mostrarDadosAlunos()
}

function editar_email(posicao) {

    texto = prompt('Novo email:').trim();

    // Se novo registro for nulo faça:
    if (texto == '' || texto == null) {

        // Exiba tela de erro e execute a função
        alert('um campo não foi preenchido!');
        editar_email(posicao);
    }

    listaAlunos[posicao].email = texto;

    mostrarDadosAlunos()
}

function editar_ra(posicao) {

    texto = prompt('Novo RA:').trim();

    // Se novo registro for nulo faça:
    if (texto == '' || texto == null) {

        // Exiba tela de erro e execute a função
        alert('um campo não foi preenchido!');
        editar_ra(posicao);
    }

    listaAlunos[posicao].ra = texto;

    mostrarDadosAlunos()
}

function editar_aep(posicao) {
    texto = prompt('Nova nota AEP:').trim();

    // Verifica se o texto é um número e está dentro do intervalo
    if (!isNaN(texto) && parseFloat(texto) >= 0 && parseFloat(texto) <= 10) {
        listaAlunos[posicao].notas.primeiroBimestre.aep = parseFloat(texto).toFixed(2);

        mostrarDadosAlunos();
    } else {
        // Exibe tela de erro e executa a função novamente
        alert('Por favor, insira um número válido entre 0 e 10!');
        editar_aep(posicao);
    }
}


function editar_aep2(posicao) {
    texto = prompt('Nova nota AEP:').trim();

    // Verifica se o texto é um número e está dentro do intervalo
    if (!isNaN(texto) && parseFloat(texto) >= 0 && parseFloat(texto) <= 10) {
        listaAlunos[posicao].notas.segundoBimestre.aep = parseFloat(texto).toFixed(2);

        mostrarDadosAlunos();
    } else {
        // Exibe tela de erro e executa a função novamente
        alert('Por favor, insira um número válido entre 0 e 10!');
        editar_aep2(posicao);
    }
}

function editar_integrada(posicao) {
    texto = prompt('Nova nota integrada:').trim();

    // Verifica se o texto é um número e está dentro do intervalo
    if (!isNaN(texto) && parseFloat(texto) >= 0 && parseFloat(texto) <= 10) {
        listaAlunos[posicao].notas.primeiroBimestre.integrada = parseFloat(texto).toFixed(2);

        mostrarDadosAlunos();
    } else {
        // Exibe tela de erro e executa a função novamente
        alert('Por favor, insira um número válido entre 0 e 10!');
        editar_integrada(posicao);
    }
}

function editar_integrada2(posicao) {
    texto = prompt('Nova nota integrada:').trim();

    // Verifica se o texto é um número e está dentro do intervalo
    if (!isNaN(texto) && parseFloat(texto) >= 0 && parseFloat(texto) <= 10) {
        listaAlunos[posicao].notas.segundoBimestre.integrada = parseFloat(texto).toFixed(2);

        mostrarDadosAlunos();
    } else {
        // Exibe tela de erro e executa a função novamente
        alert('Por favor, insira um número válido entre 0 e 10!');
        editar_integrada2(posicao);
    }
}


function editar_prova(posicao) {
    texto = prompt('Nova nota prova:').trim();

    // Verifica se o texto é um número e está dentro do intervalo
    if (!isNaN(texto) && parseFloat(texto) >= 0 && parseFloat(texto) <= 10) {
        listaAlunos[posicao].notas.primeiroBimestre.prova = parseFloat(texto).toFixed(2);

        mostrarDadosAlunos();
    } else {
        // Exibe tela de erro e executa a função novamente
        alert('Por favor, insira um número válido entre 0 e 10!');
        editar_prova(posicao);
    }
}

function editar_prova2(posicao) {
    texto = prompt('Nova nota prova:').trim();

    // Verifica se o texto é um número e está dentro do intervalo
    if (!isNaN(texto) && parseFloat(texto) >= 0 && parseFloat(texto) <= 10) {
        listaAlunos[posicao].notas.segundoBimestre.prova = parseFloat(texto).toFixed(2);

        mostrarDadosAlunos();
    } else {
        // Exibe tela de erro e executa a função novamente
        alert('Por favor, insira um número válido entre 0 e 10!');
        editar_prova2(posicao);
    }
}

document.getElementById('input_prova_1').addEventListener('input', function() {
    let inputProva1 = this.value.trim()
    let inputIntegrada1 = document.getElementById('input_prova_integrada_1').value.trim()
    let inputAep1 = document.getElementById('input_aep_1').value.trim()

    let inputProva2 = document.getElementById('input_prova_2')
    let inputIntegrada2 = document.getElementById('input_prova_integrada_2')
    let inputAep2 = document.getElementById('input_aep_2')
    
    if (inputProva1 !== '' && inputIntegrada1 !== '' && inputAep1 !== '') {
        inputProva2.disabled = false;
        inputIntegrada2.disabled = false;
        inputAep2.disabled = false;
    } else {
        inputProva2.disabled = true;
        inputIntegrada2.disabled = true;
        inputAep2.disabled = true;
    }
});

document.getElementById('input_aep_1').addEventListener('input', function() {
    let inputAep1 = this.value.trim()
    let inputIntegrada1 = document.getElementById('input_prova_integrada_1').value.trim()
    let inputProva1 = document.getElementById('input_prova_1').value.trim()

    let inputProva2 = document.getElementById('input_prova_2')
    let inputIntegrada2 = document.getElementById('input_prova_integrada_2')
    let inputAep2 = document.getElementById('input_aep_2')
    
    if (inputProva1 !== '' && inputIntegrada1 !== '' && inputAep1 !== '') {
        inputProva2.disabled = false;
        inputIntegrada2.disabled = false;
        inputAep2.disabled = false;
    } else {
        inputProva2.disabled = true;
        inputIntegrada2.disabled = true;
        inputAep2.disabled = true;
    }
});

document.getElementById('input_prova_integrada_1').addEventListener('input', function() {
    let inputIntegrada1 = this.value.trim()
    let inputProva1 = document.getElementById('input_prova_1').value.trim()
    let inputAep1 = document.getElementById('input_aep_1').value.trim()

    let inputProva2 = document.getElementById('input_prova_2')
    let inputIntegrada2 = document.getElementById('input_prova_integrada_2')
    let inputAep2 = document.getElementById('input_aep_2')
    
    if (inputProva1 !== '' && inputIntegrada1 !== '' && inputAep1 !== '') {
        inputProva2.disabled = false;
        inputIntegrada2.disabled = false;
        inputAep2.disabled = false;
    } else {
        inputProva2.disabled = true;
        inputIntegrada2.disabled = true;
        inputAep2.disabled = true;
    }
});