var calc = {
  init: function() {
    $('#calculator .input').click(function(){
      if(this.dataset.keyType == "digit") {
        calc.handleInput(this.dataset.digit);
      } else if (this.dataset.keyType == "operator") {
        calc.handleOperator(this.dataset.operator);
      } else if (this.dataset.keyType == "delete") {
        calc.handleDelete();
      } else if (this.dataset.keyType == "equals") {
        calc.evaluateResult();
      }
    });
    $('#calculator #delete').dblclick(function() {
      calc.clearPreview();
      calc.clearResult();
    });
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function(digit) {
      $(document).bind('keyup', digit, function() {
        calc.handleInput(digit);
      });
    });
    ['/', '*', '+', '-', '.'].forEach(function(digit) {
      $(document).bind('keyup', digit, function() {
        calc.handleOperator(digit);
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
      calc.handleOperator('+');
    });
    ['=', 'return'].forEach(function(key) {
      $(document).bind('keyup', key, function() {
        calc.evaluateResult();
      });
    });  
  },
  handleInput: function(input) {
    $('#preview').html($('#preview').html() + input);
  },
  handleOperator: function (operator) {
    if ($('#preview').html().length == 0) {
      if (operator == '-') {
        calc.handleInput ('-');
      }
    } else {
      if (calc.checkLastCharIsOperator()) {
        calc.handleDelete();
      }
      calc.handleInput(operator); 
    } 
  },
  handleDelete: function() {
    $('#preview').html($('#preview').html().slice(0, -1));
    if($('#preview').html().length == 1) {
      calc.clearResult();
    }
  },
  evaluateResult: function() {
    if (calc.checkLastCharIsOperator()) {
      calc.handleDelete();
    }
    $('#result').html(eval($('#preview').html()));
  },
  clearResult: function() {
    $('#result').html('');
  },
  clearPreview: function() {
    $('#preview').html('');
  },
  getLastNumber: function() {
    str = $('#preview').html();
    regexp = /[+\-*\/]([0-9.])*$/
    matches = str.match(regexp);
    if (matches == null) {
      return str;
    } else {
      return matches[0].slice(1);
    }
  },
  getLastChar: function() {
    str = $('#preview').html();
    if (str.length == 0) {
      return str;
    } else {
      return str[str.length - 1];
    }
  },
  checkLastCharIsOperator: function() {
    lastChar = calc.getLastChar();
    return (['+', '-', '*', '/'].indexOf(lastChar) != -1);
  }   
}







$(document).ready(function() {
  calc.init();
});