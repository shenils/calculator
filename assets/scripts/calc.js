var calc = {
  init: function() {
    $('#calculator .input').click(function(){
      if(this.dataset.keyType == "digit") {
        calc.handleInput(this.dataset.digit);
      } else if (this.dataset.keyType == "operator") {
        calc.handleInput(this.dataset.operator);
      } else if (this.dataset.keyType == "delete") {
        calc.handleDelete();
      } else if (this.dataset.keyType == "equals") {
        calc.evaluateResult();
      }
      if (typeof(input) != 'undefined') {
        $('#preview').html($('#preview').html() + input);
      }
    });
    $('#calculator #delete').dblclick(function() {
      $('#preview').html('');
      $('#result').html('');
    });
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function(digit) {
    $(document).bind('keyup', digit, function() {
      handleInput(digit);
    });
  });
    
  },
  handleInput(input): function() {
    $('#preview').html($('#preview').html() + input);
  },
  handleDelete(): function() {
    $('#preview').html($('#preview').html().slice(0, -1));
  },
  evaluateResult(): function() {
    $('#result').html(eval($('#preview').html()));
  }   
}







$(document).ready(function() {
  calc.init();
});