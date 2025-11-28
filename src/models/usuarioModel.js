var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, fk_id_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, sobrenome, empresa ,cnpjempresa, celular, email, senha ,idempresa) {
    console.log("MODEL CADASTRAR")    
    
    var instrucaoSql = `
       INSERT INTO usuario (nome, sobrenome, email, senha, tipo_usuario, status_usuario, data_hora_cadastro, data_hora_atualizacao, fk_id_empresa, fk_id_adm) value
				('${nome}','${sobrenome}', '${email}', '${senha}', 'admin', 'ativo', NOW(), null, ${idempresa}, null)
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function VerificacaoEmpresa(Token){
      
    
    var instrucaoSql = `
        SELECT * FROM empresa WHERE codigo_ativacao = '${Token}' 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function CriarLog(idUsuario,empresaId){

    var instrucaoSql = `
        insert into acesso values(default,${idUsuario},${empresaId},default,null)
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    autenticar,
    cadastrar,
    VerificacaoEmpresa,
    CriarLog

};