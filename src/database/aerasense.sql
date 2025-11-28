-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS aerasense;

-- Usar o banco de dados
USE aerasense;

-- Criar a tabela empresa
CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID da empresa
    nome_fantasia VARCHAR(45) NOT NULL, -- Nome fantasia da empresa
    razao_social VARCHAR(100) NOT NULL, -- Razão social da empresa
    cnpj CHAR(14) UNIQUE NOT NULL, -- CNPJ da empresa
    email VARCHAR(255) UNIQUE NOT NULL, -- Email da empresa
    ddi_telefone VARCHAR(6) NOT NULL, -- DDI do telefone da empresa
    ddd_telefone VARCHAR(3) NOT NULL, -- DDD do telefone da empresa
    telefone VARCHAR(15) NOT NULL, -- Telefone da empresa
    status_empresa VARCHAR(15) NOT NULL DEFAULT 'ativo', -- Status da empresa
    data_hora_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora de cadastro da empresa
    data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Data e hora de atualização da empresa
    codigo_ativacao CHAR(6) UNIQUE NOT NULL -- Código de ativação da empresa
    CONSTRAINT chkStatusEmpresa
        CHECK (status_empresa IN ('ativo', 'inativo')), -- Status da empresa
);

-- Endereço
CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID do endereço
    logradouro VARCHAR(45) NOT NULL, -- Logradouro
    numero VARCHAR(8) NOT NULL, -- Número do logradouro
    bairro VARCHAR(20) NOT NULL, -- Bairro
    cidade VARCHAR(25) NOT NULL, -- Cidade
    uf CHAR(2) NOT NULL, -- UF
    cep CHAR(8) NOT NULL, -- CEP
    complemento VARCHAR(15), -- Complemento
    matriz TINYINT NOT NULL, -- Se é matriz
    data_hora_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora de cadastro
    data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Data e hora de atualização
    fk_id_empresa INT, -- ID da empresa
    CONSTRAINT fkEmpresaEndereco
    		FOREIGN KEY (fk_id_empresa)
    			REFERENCES empresa (id),
    CONSTRAINT chkUf CHECK (
        uf IN
        (
  		'AC', 'AL', 'AP',
  		'AM', 'BA', 'CE',
  		'DF', 'ES', 'GO',
  		'MA', 'MT', 'MS',
  		'MG', 'PA', 'PB',
  		'PR', 'PE', 'PI',
  		'RJ', 'RN', 'RS',
  		'RO', 'RR', 'SC',
  		'SP', 'SE', 'TO'
        )
    ),
    CONSTRAINT chkMatriz
        CHECK (matriz = 1 OR matriz = 0)
);

-- Usuário
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID do usuário
    nome VARCHAR(45) NOT NULL, -- Nome
    sobrenome VARCHAR(60) NOT NULL, -- Sobrenome
    email VARCHAR(255) UNIQUE NOT NULL, -- E-mail
    senha VARCHAR(50) NOT NULL, -- Senha
    tipo_usuario VARCHAR(15) NOT NULL DEFAULT 'comum', -- Tipo
    status_usuario VARCHAR(9) NOT NULL DEFAULT 'ativo', -- Status
    data_hora_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora de cadastro
    data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Data e hora de atualização
    fk_id_empresa INT, -- ID da Empresa
    fk_id_adm INT, -- ID do Administrador
    CONSTRAINT chkTipoUsuario
        CHECK (tipo_usuario IN ('comum', 'admin')),
    CONSTRAINT chkStatusUsuario
        CHECK (status_usuario IN ('ativo', 'inativo')),
    CONSTRAINT fkEmpresaUsuario
        FOREIGN KEY (fk_id_empresa)
            REFERENCES empresa (id),
    CONSTRAINT fkAdmUsuario
        FOREIGN KEY (fk_id_adm)
            REFERENCES usuario (id)
);

-- Acesso (Registro de acessos)
create table acesso (
    idAcesso INT AUTO_INCREMENT, -- ID do acesso
    fkUsuario INT, -- ID do usuario
    fkEmpresa INT, -- ID da empresa
    dtHrLogin DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora de login
    dtHrLogout DATETIME DEFAULT NULL, -- Data e hora de logout
    CONSTRAINT pkComposta
        PRIMARY KEY (idAcesso, fkUsuario, fkEmpresa),
    CONSTRAINT fkUsuario
        FOREIGN KEY (fkUsuario)
            REFERENCES usuario(id),
    CONSTRAINT fkEmpresa
        FOREIGN KEY (fkEmpresa)
            REFERENCES empresa(id)
);

-- Setor
CREATE TABLE setor (
    id INT AUTO_INCREMENT, -- ID setor
    nome VARCHAR(30) NOT NULL, -- Nome
    categoria VARCHAR(45) NOT NULL, -- Categoria
    descricao VARCHAR(45), -- Descrição
    codigo_setor CHAR(6) NOT NULL, -- Código do setor
    fk_id_empresa INT, -- ID da empresa
    CONSTRAINT pkCompostaEmpresaSetor
        PRIMARY KEY (id, fk_id_empresa),
    CONSTRAINT fkEmpresaSetor
        FOREIGN KEY (fk_id_empresa)
            REFERENCES empresa (id)
);

-- Sensor
CREATE TABLE sensor (
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID do sensor
    nome VARCHAR(45) NOT NULL, -- Nome
    codigo CHAR(15) NOT NULL, -- Código
    localizacao VARCHAR(45) NOT NULL, -- Localização
    frequencia_leitura INT NOT NULL, -- Frequência de leitura
    rotulo VARCHAR(45), -- Rótulo
    status_sensor VARCHAR(15) NOT NULL DEFAULT 'ativo', -- Status
    codigo_botijao CHAR(7), -- Código do cilindro (botijão)
    data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora do registro
    data_hora_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Data e hora da atualização
    fk_id_setor INT, -- ID do setor
    fk_EmpresaSetor INT, -- ID da empresa
    CONSTRAINT chkStatusSensor
        CHECK (status_sensor IN ('ativo', 'inativo')),
    CONSTRAINT fkSetorSensor
        FOREIGN KEY (fk_id_setor)
            REFERENCES setor(id),
    CONSTRAINT fkEmpresaSetorSensor
        FOREIGN KEY (fk_EmpresaSetor)
            REFERENCES setor (fk_id_empresa)
);

-- Medição
CREATE TABLE medicao (
    id INT AUTO_INCREMENT, -- ID da medição
    valor_medicao DECIMAL (4,2), -- Percentual
    data_hora_medicao DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora da medição
    fk_id_sensor INT, -- ID do sensor
    CONSTRAINT pkCompostaSensorMedicao
        PRIMARY KEY (id, fk_id_sensor),
    CONSTRAINT fkSensorMedicao
        FOREIGN KEY (fk_id_sensor)
            REFERENCES sensor (id)
);

-- Alerta
CREATE TABLE alerta (
    idAlerta INT AUTO_INCREMENT, -- ID do alerta
    idMedicao INT, -- ID da medição
    idSensor INT, -- ID do sensor
    dtHr DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora do alerta
    nivel VARCHAR(45), -- Nível do alerta
    CONSTRAINT chkNivel
    	CHECK (nivel in ('Crítico', 'Risco')),
    CONSTRAINT pkComposta
    	PRIMARY KEY (idAlerta, idMedicao, idSensor),
    CONSTRAINT fkMedicao
    	FOREIGN KEY (idMedicao)
        REFERENCES medicao(id),
    CONSTRAINT fkSensor
    	FOREIGN KEY (idSensor)
        REFERENCES sensor(id)
);

DESCRIBE sensor;

-- JOIN de Usuário, Endereço, Setor, Sensor e Medições
SELECT usuario.nome AS 'Nome do Usuário',
       usuario.sobrenome AS 'Sobrenome do usuário',
       usuario.tipo_usuario AS 'Tipo do Usuário',
       empresa.nome_fantasia AS 'Nome da Empresa',
       empresa.cnpj AS 'CNPJ da empresa',
       empresa.email AS 'E-mail da empresa',
       endereco.logradouro AS 'Logradouro',
       endereco.cidade AS 'Cidade',
       endereco.cep AS 'CEP',
       setor.nome AS 'Nome do setor',
       setor.codigo_setor AS 'Código do Setor',
       sensor.codigo AS 'Código do Sensor',
       medicao.valor_medicao AS 'Valor da concentração',
       medicao.data_hora_medicao AS 'Data e Hora da Medição'
FROM empresa
JOIN usuario ON empresa.id = usuario.fk_id_empresa
JOIN endereco ON empresa.id = endereco.fk_id_empresa
JOIN setor ON empresa.id = setor.fk_id_empresa
JOIN sensor ON setor.id = sensor.fk_id_setor -- Junta setor e sensor pelo ID do setor
AND empresa.id = sensor.fk_empresasetor -- Junta empresa e sensor pelo ID da empresa
JOIN medicao ON sensor.id = medicao.fk_id_sensor;

-- Excluir o banco de dados
DROP DATABASE aerasense;
