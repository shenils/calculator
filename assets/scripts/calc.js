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
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '+', '-', '.'].forEach(function(digit) {
      $(document).bind('keyup', digit, function() {
        calc.handleInput(digit);
      });
    });
    $(document).bind('keyup', '.', function() {
      lastNumber = calc.getLastNumber();
      if(lastNumber.indexOF('.') == -1) {
        if(lastNumber.length == 0) {
          calc.handleInput(0);
        }
        calc.handleInput('.');
      }
    });
    $(document).bind('keyup', 'backspace', function() {
      calc.handleDelete();
    });
    $(document).bind('keyup', 'shift+=', function() {
      calc.handleInput('+');
    }); 
    ['=', 'return'].forEach(function(key) {
      $(document).bind('keyup', key, function() {
        calc.evaluateResult();
      });
    });  
  },
  handleInput(input): function() {
    $('#preview').html($('#preview').html() + input);
  },
  handleDelete(): function() {
    $('#preview').html($('#preview').html().slice(0, -1));
    if($('#preview').html().length == 1) {
      calc.clearResult();
    }
  },
  evaluateResult(): function() {
    $('#result').html(eval($('#preview').html()));
  },
  clearResult(): function() {
    $('#result').html('');
  },
  getLastNumber() function {
    str = $('#preview').html();
    regexp = /[+\-*\/]([0-9.])*$/
    matches = str.match(regexp);
    if (matches == null) {
      return str;
    } else {
      return matches[0].slice(1);
    }
  }   
}







$(document).ready(function() {
  calc.init();
});