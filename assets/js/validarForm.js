 function validaForm()
 {
    erro = false;
    if($('#nome').val() == '')
    {
        alert('Você precisa preencher o campo Nome');erro = true;
    }
    if($('#email').val() == '')
    {
        alert('Você precisa preencher o campo E-mail');erro = true;
    }
    if($('#telefone').val() == '')
    {
        alert('Você precisa preencher o campo Telefone');erro = true;
    }
    if($('#assunto').val() == '')
    {
        alert('Voc&ecirc; precisa preencher o campo Assunto');erro = true;
    }
    if($('#mensagem').val() == '')
    {
        alert('Voc&ecirc; precisa preencher o campo Mensagem');erro = true;
    }

    //se nao tiver erros
    if(!erro)
    {
        $('#formulario_contato').submit();
    }
 }