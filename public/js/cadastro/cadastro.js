
// sessionStorage.NOME_USUARIO = "";
// sessionStorage.SOBRENOME_USUARIO = "";
// sessionStorage.NOME_EMPRESA = "";
// sessionStorage.CNPJ_EMPRESA = "";
// sessionStorage.CELULAR_USUARIO = "";
// sessionStorage.EMAIL_USUARIO = "";
// sessionStorage.SENHA_USUARIO = "";
// sessionStorage.TOKEN_EMPRESA = "";


function FnContinuarCadastro() {
    input_name.style.borderBlockColor = 'gray'
    input_sobrenome.style.borderBlockColor = 'gray'
    input_empresa.style.borderBlockColor = 'gray';
    input_CNPJ.style.borderBlockColor = 'gray';
    input_celular.style.borderBlockColor = 'gray';
    input_TokenEmpresa.style.borderBlockColor = 'gray'
    var nome = input_name.value
    var Input_TokenEmpresa = input_TokenEmpresa.value
    var sobrenome = input_sobrenome.value
    var empresa = input_empresa.value
    var cnpj = input_CNPJ.value
    var celular = input_celular.value

    // Limpa o campo
    ID_Erros.innerHTML = ''

    if (nome == '' || sobrenome == '' || empresa == '' || cnpj == '' || celular == '') {
        ID_Erros.innerHTML = 'Algum campo não está devidamente preenchido!'
        return
    }


    if(Input_TokenEmpresa.length < 6){
        ID_Erros.innerHTML = 'Token da empresa invalido!'
        return
    }

    // Valida se contem numero nos campos: Nome e sobrenome
    var listaNumeroString = '1234567890'
    var i = 0
    var b = 0
    var CaracNomeSobre = false
    // Para cada letra, ele entra no segundo while
    while (i < nome.length) {
        // Já no segundo while, ele ve se a letra é um dos numeros da variavel(string) listaNumeroString
        while (b < listaNumeroString.length) {
            if (nome[i] == listaNumeroString[b]) {
                CaracNomeSobre = true
            }
            b++
        }
        b = 0
        i++
    }
    i = 0
    b = 0
    // Repete o processo com o sobrenome
    while (i < sobrenome.length) {
        while (b < listaNumeroString.length) {
            if (sobrenome[i] == listaNumeroString[b]) {
                CaracNomeSobre = true
            }
            b++
        }
        b = 0
        i++
    }
    if (CaracNomeSobre) {
        ID_Erros.innerHTML = 'Campo nome ou sobrenome invalido! Contem numero'
        input_name.style.borderBlockColor = 'red'
        input_sobrenome.style.borderBlockColor = 'red'
        return
    }


    // Valida a quantidade de numeros no CNPJ obs: com os pontos e traços inclusos
    if (cnpj.length < 14) {
        ID_Erros.innerHTML = 'Campo CNPJ invalido ou incompleto!'
        input_CNPJ.style.borderBlockColor = 'red';
        return
    }
    if (nome.length < 3 && sobrenome.length < 3) {
        ID_Erros.innerHTML = 'Nome ou sobrenome invalido! Pequeno demais'
        input_name.style.borderBlockColor = 'red'
        input_sobrenome.style.borderBlockColor = 'red'
        return
    }
    if (celular.length < 14) {
        ID_Erros.innerHTML = 'Numero de celular invalido!'
        input_celular.style.borderBlockColor = 'red';
        return
    }
    console.log('PRIMEIRA TELA CADASTRO, SALVANDO NO SESSION STORAGE.....')
    sessionStorage.NOME_USUARIO = nome
    sessionStorage.SOBRENOME_USUARIO = sobrenome
    sessionStorage.NOME_EMPRESA = empresa
    sessionStorage.CNPJ_EMPRESA = cnpj
    sessionStorage.CELULAR_USUARIO = celular
    sessionStorage.TOKEN_EMPRESA = Input_TokenEmpresa
    window.location.href = './finacadastro.html';

}





function CadastrarForms(e) {
    e.preventDefault();
    console.log("TESTEB")
    console.log("Entrou na função de validação")
    var Inputemail = input_email.value
    var senha = input_senha.value
    var Inputconfirmasenha = input_confirmsenha.value
    var Inputcheckbox = input_termo.checked

    // Limpa o campo
    ID_Erros.innerHTML = ''

    if (Inputemail == '' || senha == '' || Inputconfirmasenha == '') {
        ID_Erros.innerHTML = 'Algum campo não está devidamente preenchido!'
        return
    }


    // Valida se a senha é diferente da confirmarsenha
    if (senha != Inputconfirmasenha) {
        ID_Erros.innerHTML = 'Senhas digitadas diferentes. Revise sua senha!'
        return
    }
    // Valida o checkbox
    if (Inputcheckbox == false) {
        ID_Erros.innerHTML = 'Concorde com os termos de uso e lincença para prosseguir!'
        return
    }



    // Validação da senha

    MinCatere = false
    CaracMax = false
    CaracMin = false
    CaracNumero = false
    CaracSimb = false


    // Validar 8 caracteres
    if (senha.length >= 8) {
        MinCatere = true
    }

    // Contem letra minúscula: abcdefgh.
    if (senha.toLowerCase() != senha) {
        CaracMax = true
    }
    // Contem letra maiúsculas: ABCDEFG.
    if (senha.toUpperCase() != senha) {
        CaracMin = true
    }



    i = 0
    // Tem no mínimo 1 número: 123456.
    // Para cada letra, ele faz um if para ver se ela é um numero
    while (i < senha.length) {
        if (!isNaN(senha[i])) {
            CaracNumero = true
            break
        }
        i++
    }


    // Tem no mínimo 1 símbolos: !@#$%^&* 
    listaSimbolosString = '!@#$%^&*'
    i = 0
    var b = 0
    var count = false
    // Para cada letra, ele entra no segundo while
    while (i < senha.length) {
        // Já no segundo while, ele ve se a letra é um dos simbolos da variavel(string) listaSimbolosString
        while (b < listaSimbolosString.length) {
            if (senha[i] == listaSimbolosString[b]) {
                CaracSimb = true
                break
            }
            b++
        }
        b = 0
        i++
    }

    //     MinCatere = false
    //     CaracMax = false
    //     CaracMin = false
    //     CaracNumero = false
    //     CaracSimb = false

    if (!MinCatere) {
        ID_Erros.innerHTML += `Sua senha deve ter no minino 8 caracteres!<br>`
    }
    if (!CaracMax) {
        ID_Erros.innerHTML += `Sua senha deve ter mínimo 2 letras maiúsculas: ABCDEFG.<br>`
    }
    if (!CaracMin) {
        ID_Erros.innerHTML += `Sua senha deve ter mínimo 1 letra minúscula: abcdefgh.<br>`
    }
    if (!CaracNumero) {
        ID_Erros.innerHTML += `Sua senha deve ter no mínimo 1 número: 123456.<br>`
    }
    if (!CaracSimb) {
        ID_Erros.innerHTML += `Sua senha deve ter no mínimo 1 símbolos: !@#$%^&*<br>`
    }

    if (MinCatere && CaracMax && CaracMin && CaracNumero && CaracSimb) {
     sessionStorage.EMAIL_USUARIO = Inputemail
     sessionStorage.SENHA_USUARIO = senha       
    }else{
        return
    }

var NomeUsuario = String(sessionStorage.getItem('NOME_USUARIO'))
var SobrenomeUsuario = String(sessionStorage.getItem('SOBRENOME_USUARIO'))
var NomeEmpresa = String(sessionStorage.getItem('NOME_EMPRESA'))
var CNPJEmpresa = String(sessionStorage.getItem('CNPJ_EMPRESA'))
var CelularUsuario = String(sessionStorage.getItem('CELULAR_USUARIO'))
var EmailUsuario = String(sessionStorage.getItem('EMAIL_USUARIO'))
var SenhaUsuario = String(sessionStorage.getItem('SENHA_USUARIO'))
var TokenEmpresa = String(sessionStorage.getItem('TOKEN_EMPRESA'))

console.log("AINDA NO CADASTRO.js" + 
NomeUsuario + '/' +
+ SobrenomeUsuario + '/' +
+ NomeEmpresa + '/' +
+ CNPJEmpresa + '/' +
+ CelularUsuario + '/' +
+ EmailUsuario + '/' +
+ SenhaUsuario + '/' +
+ TokenEmpresa 

)
        //CADASTRAR
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: NomeUsuario,
                sobrenomeServer: SobrenomeUsuario,
                empresaServer: NomeEmpresa,
                cnpjempresaServer: CNPJEmpresa,
                celularServer: CelularUsuario,
                emailServer: EmailUsuario,
                senhaServer: SenhaUsuario,
                tokenempresaServer: TokenEmpresa
            })
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
                if (resposta.ok) {
                    console.log("Cadastro realizado com sucesso!");
                    setTimeout(() => { window.location = "./Login.html" }, 2000);
                } else {
                    console.log("Houve um erro ao tentar realizar o cadastro!")
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });
// jjjj
}


// MASCARAS

function mascaracelular() {

    var valor = input_celular.value;
    var i = 0


    while (i < valor.length) {
        if (isNaN(valor[i]) || valor[i] == ' ') {
            valor = valor.replace(valor[i], '')
            input_celular.value = valor
        }
        i++;
    }

    if (valor.length > 2) {
        valor = valor.replaceAll(' ', '')
        valor = `(${valor.substring(0, 2)}) ${valor.substring(2, valor.length)}`
        input_celular.value = valor
    }

    // Limita a variavel valor para somente 11 caracteres
    input_celular.value = valor.substring(0, 14)


}
function mascaracpnj() {
    valorcnpj = input_CNPJ.value.substring(0, 15)

    var i = 0
    while (i < valorcnpj.length) {
        if (isNaN(valorcnpj[i]) || valorcnpj[i] == ' ') {
            valorcnpj = valorcnpj.replace(valorcnpj[i], '')
            input_CNPJ.value = valorcnpj

        }
        i++;
    }


    input_CNPJ.value = valorcnpj
}

function FnOcultarSenha(senha) {
    // 1 - Input Senha
    // 2 - Input confirmar senha
    var Input = senha
    if (Input == 1) {
        if (input_senha.type == 'password') {
            input_senha.type = 'text'
            BtnOcultarSenha.style.opacity = '60%'
        } else {
            input_senha.type = 'password'
            BtnOcultarSenha.style.opacity = '100%'
        }
    } else {
        if (input_confirmsenha.type == 'password') {
            input_confirmsenha.type = 'text'
            BtnOcultarConfSenha.style.opacity = '60%'
        } else {
            input_confirmsenha.type = 'password'
            BtnOcultarConfSenha.style.opacity = '100%'
        }
    }
}

function FnVoltarPaghome() {
    window.location.href = './../../marley/aerasense/index.html';
}