const img = $('#img');
img.hide()

$('#botAplicar').click(function(){
    requisicao();
})

function requisicao(){
    const chave = 'U9la1b3rbgf9eBbgxQIDo5xJthLSgxHWbwIlB2yP';
    const valData = new Date().toISOString().slice(0,10);
    let data = ($('#caixaData').val());
        try {
            if(data > valData) throw new Error('Digite uma data atual')
        } catch (error) {
            alert(error)
        }
    
    const nomeImg = $('#nomeImg');
    const video = $('#video');
    const des = $('#descricaoImg');
    
    $.ajax({
        url: `https://api.nasa.gov/planetary/apod?api_key=${chave}&date=${data}`,
        beforeSend: function(){
            $('#msg').html('Está carregando');
        },
        success: function(retorno){
            $('#msg').html('Olhe que lindo!')
            if(retorno.media_type == 'image'){
                img.show();
                video.hide();
                $('#info').css('visibility','visible')
                nomeImg.text(retorno.title)
                des.text(retorno.explanation);
                img.attr('src', retorno.url);
            }else{
                img.hide()
                video.show();
                $('#info').css('visibility','visible')
                nomeImg.text(retorno.title);
                des.text(retorno.explanation);
                video.attr('src', retorno.url);
            }
        }
    })
}   
