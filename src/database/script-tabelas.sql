create database aerasense;

use aerasense;

create table empresa(
idEmpresa int primary key auto_increment,
nome varchar(45),
cnpj char(14) not null,
email varchar(45),
telefone varchar(45),
preco_contrato int,
frequencia varchar(45),
pgEmDia boolean default true,
constraint chkfrequencia
	check(frequencia in('Mensal','Anual'))
);

insert into empresa values
	(default,'EmpresaExemplo1','12345678910111',null,null,10000,'Mensal',true),
	(default,'EmpresaExemplo2','12345678910112',null,null,100000,'Anual',true);
    
create table responsavel(
idResponsavel int auto_increment,
fkEmpresa int,
nome varchar(45),
email varchar(45),
telefone varchar(45),
senha varchar(45),
constraint fkEmpresa 
	foreign key (fkEmpresa)
    references empresa(idEmpresa),
constraint pkRespEmp
	primary key (idResponsavel,fkEmpresa)
);

insert into responsavel values 
	(default,1,'Funcionario Empresa 1',null,null,null),
	(default,2,'Funcionario Empresa 2',null,null,null);
    
create table setor(
idSetor int auto_increment,
fkEmpresa int,
nome varchar(45),
constraint fkSetorEmpresa
	foreign key (fkEmpresa)
    references empresa(idEmpresa),
constraint pkSetorEmp
	primary key(idSetor,fkEmpresa)
);

insert into setor values
	(default,1,'Setor Empresa 1'),
	(default,2,'Setor Empresa 2');
    
create table sensor(
idSensor int auto_increment,
fkSetor int,
fkEmpresa int,
codigo char(8),
descricao varchar(45),
constraint fkSensorSetor
	foreign key (fkSetor)
    references setor(idSetor),
constraint fkEmpresaSensor
	foreign key (fkEmpresa)
    references setor(fkEmpresa),
constraint pkSensorSetorEmp
	primary key (idSensor,fkSetor,fkEmpresa)
);

insert into sensor values 
	(default,1,1,'WE23ED45','Descrição 1'),
	(default,2,2,'QS14XC67','Descrição 2');
    
create table dado(
idDado int auto_increment,
fkSensor int,
fkSetor int,
fkEmpresa int,
porcentagem decimal(5,2),
dtHr timestamp default current_timestamp,
constraint fkDadoSensor
	foreign key (fkSensor) 
    references sensor(idSensor),
constraint fkDadoSetor
	foreign key (fkSetor) 
    references sensor(fkSetor),
constraint fkDadoEmpresa
	foreign key (fkEmpresa) 
    references sensor(fkEmpresa),
constraint pkDadoSensorSetorEmp
	primary key (idDado,fkSensor,fkSetor,fkEmpresa)
);

select * from dado;