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