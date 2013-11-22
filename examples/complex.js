Ext.define('Empresa',{
    extend: 'Ext.data.Model',

    fields: [
            {name: 'id', type: 'int'},
            {name: 'nome', type: 'string'}
    ],

    hasMany: {model: 'Pessoa', name: 'funcionarios', foreignKey: 'empresaId'}
});

Ext.define('Pessoa',{
    extend: 'Ext.data.Model',

    fields: [
            {name: 'id', type: 'int'},
            {name: 'nome', type: 'string'},
            {name: 'empresaId', type: 'int'},
            {name: 'enderecoId', type: 'int'}
    ],

    hasMany: {model: 'Telefone', name: 'telefones', foreignKey: 'pessoaId'},
    hasOne: {model: 'Endereco'}
});

Ext.define('Telefone',{
    extend: 'Ext.data.Model',

    fields: [
            {name: 'id', type: 'int'},
            {name: 'ddd', type: 'string'},
            {name: 'numero', type: 'string'},
            {name: 'pessoaId', type: 'int'}
    ]
});

Ext.define('Endereco',{
    extend: 'Ext.data.Model',

    fields: [
            {name: 'id', type: 'int'},
            {name: 'rua', type: 'string'},
            {name: 'numero', type: 'string'},
            {name: 'cidade', type: 'string'}
    ]
});

Ext.define('Empresas',{
    extend: 'Ext.data.Store',
    model: 'Empresa',
    proxy: {
        type: 'ajax',

        api: {
            create: 'php/json/criaEmpresa.php', //CRUD
            read: 'php/json/listaEmpresa.php',
            update: 'php/json/atualizaEmpresa.php',
            destroy: 'php/json/deletaEmpresa.php',
        },
        
        reader: {
            type: 'json',
            root: 'empresas'
        },

        writer: {
            type: 'associatedjson', //nosso Writer customizado
            root: 'empresas',
            writeAllFields: true,
            encode: true,
            allowSingle: false
        }
    }
});

Ext.onReady(function(){

    var store = Ext.create('Empresas');

    var novaEmpresa = Ext.create('Empresa',{
    	nome: 'Empresa de testes'
    });

    var novoFuncionario01 = Ext.create('Pessoa', {
        nome: 'Renan'
    });

    var novoFuncionario02 = Ext.create('Pessoa', {
        nome: 'João'
    });

    var novoTelefone01 = Ext.create('Telefone',{
        ddd: '11',
        numero: '9 9999-9999'
    });

    var novoTelefone02 = Ext.create('Telefone',{
        ddd: '11',
        numero: '9 8888-8888'
    });

    var novoTelefone03 = Ext.create('Telefone',{
        ddd: '11',
        numero: '9 7777-7777'
    });

    var novoTelefone04 = Ext.create('Telefone',{
        ddd: '11',
        numero: '9 6666-6666'
    });

    var novoEndereco01 = Ext.create('Endereco', {
        rua: 'Rua testes',
        numero: 1,
        cidade: 'Criciuma'
    });

    var novoEndereco02 = Ext.create('Endereco', {
        rua: 'Rua mais testes',
        numero: 2,
        cidade: 'Ararangua'
    });

    //Adicionar os telefones 01 e 02 no funcionário Renan
    novoFuncionario01.telefones().add(novoTelefone01);
    novoFuncionario01.telefones().add(novoTelefone02);

    //Altero o enderedo do funcionario 01
    novoFuncionario01.setEndereco(novoEndereco01);

    //Adicionar os telefones 03 e 04 no funcionário João
    novoFuncionario02.telefones().add(novoTelefone03);
    novoFuncionario02.telefones().add(novoTelefone04);

    //Altero o enderedo do funcionario 02
    novoFuncionario02.setEndereco(novoEndereco02);

    //Adiciona os funcionários na empresa
    novaEmpresa.funcionarios().add(novoFuncionario01);
    novaEmpresa.funcionarios().add(novoFuncionario02);

    store.add(novaEmpresa);

    store.sync();
});   