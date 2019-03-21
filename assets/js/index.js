$(function() {
    // build array of key-value pairs.
    Array.prototype.associate = function(keys) {
      // create an empty object.
      var result = {};
      // fill the object with the values.
      this.forEach(function (el, i) {
        result[keys[i]] = el;
      });
      // return the object filled with the pairs.
      return result;
    };
    // bxslider actions array.
    var action = ['mode', 'pager', 'controls', 'infiniteLoop', 'auto', 'speed', 'pause', 'responsive', 'adaptiveHeight', 'touchEnabled'];
    // bxslider actions values array.
    var value = ['fade', false, false, true, true, 700, 4500, false, true, false];
    // create slider array.
    var sliders = [];
    $(".bxslider").each(function(i) {
        // if bxslider has "right" class, set ( mode:fade ), else it is ( mode:vertical ).
        value[0] = $(this).hasClass('right') ? 'fade' : 'vertical';
        // return each slider.
        return sliders[i] = $(this).eq(0).bxSlider(value.associate(action));
    });
});

$(document).ready(function(){

  $('#btnSend').click(function(){

      var erros = '';

      // Validar Nomes ==============================
      if( $('#nome').val() == '' ){
          erros += '<p>Digite seu Nome</p>';
          $('#names').css("border-bottom-color", "#F14B4B")
      } else{
          $('#names').css("border-bottom-color", "#d1d1d1")
      }

      // Validar e-mail ==============================
      if( $('#email').val() == '' ){
          erros += '<p>Digite seu e-mail</p>';
          $('#email').css("border-bottom-color", "#F14B4B")
      } else{
          $('#email').css("border-bottom-color", "#d1d1d1")
      }

      // Validar mensagem ==============================
      if( $('#mensagem').val() == '' ){
          erros += '<p>Digite sua mensagem</p>';
          $('#mensagem').css("border-bottom-color", "#F14B4B")
      } else{
          $('#mensagem').css("border-bottom-color", "#d1d1d1")
      }

      // ENVIANDO MENSAGEM ============================
      if( erros == '' == false){
          var mensajeModal = '<div class="modal_wrap">'+
                                  '<div class="mensaje_modal">'+
                                      '<h3>Erros encontrados</h3>'+
                                      erros+
                                      '<span id="btnClose">Fechar</span>'+
                                  '</div>'+
                              '</div>'

          $('body').append(mensajeModal);
      }

      // FECHANDO MODAL ==============================
      $('#btnClose').click(function(){
          $('.modal_wrap').remove();
      });
  });

});