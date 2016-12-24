"use strict";

//basic setup
const True = true;
const False = false;

function Stack(){
  this.stk = [];
  this.stk.length = 0;
  this.size = function(){
    return this.stk.length;
  };
  
  this.push = function(val){
    return this.stk.push(val);
  };
  
  this.pop = function(val){
    return this.stk.pop();
  };
  
  this.peek = function(){
    return this.stk[this.size() - 1];
  };
  
  this.empty = function(){
    this.stk.length = 0;
  };
}

function Calculator(display, max)  {
  this.screenDisplay = display;
  this.max = max;
  this.prev = '';
  this.value = '&#8291;';
  this.startOver = true;
  this.stack = new Stack();
  this.op = null;
  
  this.run = function(ope){
    return this.tions[ope];
  };
  
  this.tions = {
    'plus' : function(a, b){
            return a/1.0 + b/1.0;
            },
    'min' : function(a, b){
              return a - b;
            },
    'times' : function(a, b){
                return a*b;
              },
  
    'div' : function(a, b){
              return a/b;
            },
  
    'mod' : function(a, b){
              return a%b;
            },
  };
  
  this.solve = function(ope){
    if (this.value !== '' && this.op !== null){
      if (ope === undefined) ope = this.op;
      let ans = this.tions[ope](this.stack.pop(), this.value);
      console.log(ans);
      this.startOver = true;
      this.op = null;
      this.screenWrite(ans);
      this.stack.push(ans);
    }
  };
  
  this.operate = function(ope){
    if (this.value === '&#8291;') this.value = '0';
    if (this.op === null || this.value === ''){
      this.stack.push(parseInt(this.value));
      this.prev = this.value;
      this.value = '';
      console.log('ri');
    }
    else if (this.stack.size() === 1)
      this.solve();
    this.op = ope;
  };
  
  this.clear = function(doubleClick=false){
    this.prev = this.value;
    this.value = '&#8291;';
    this.screenWrite('&#8291;');
    if (doubleClick){
      this.op = null;
      this.stack.empty();
    }
  };
  
  this.backspace = function(){
    if (this.op !== null){
      this.op = null;
      this.stack.empty();
      this.value = this.prev;
      this.startOver = false;
      return;
    }
    if (this.value !== '&#8291;'){
      this.startOver = true;
      let newStr = this.value.substring(0, this.value.length - 1);
      if (newStr === '') newStr = '&#8291;';
      this.screenWrite(newStr);
      this.stack.empty();
    }
  };
  
  this.screenWrite = function(val){
    if (this.value === '&#8291;') this.value = '';
    console.log(this.value);
    if (val === '&#8291;') {
      this.screenDisplay.innerHTML = '&#8291;';
      this.value = '';
      return;
    }
    if (this.startOver) this.value = '' + val;
    else
      this.value += '' + val;
    if (this.value.length < this.max)
      this.screenDisplay.innerHTML = this.value;
    
  };
  
  var makeSpaces = function(num){
    var res = "";
    for(var i = 0; i < num; i++){
      res += " ";
    }
    return res;
  };
}

window.onload = function(){
  var calc = new Calculator(document.getElementById('screen'), 20);
  var reset = function(pressedKey){
    for (var item in rations){
      rations[item].className = "tap tion";
    }
    if (pressedKey !== undefined)
      pressedKey.className += " light";
  };
  var rands;
  try{
    rands = [].slice.call(document.getElementsByClassName('rand')).reverse();
  } catch(e){ /*For IE8 and below*/
    rands = [
      document.getElementById('zero'),
      document.getElementById('one'),
      document.getElementById('two'),
      document.getElementById('three'),
      document.getElementById('four'),
      document.getElementById('five'),
      document.getElementById('six'),
      document.getElementById('seven'),
      document.getElementById('eight'),
      document.getElementById('nine')
    ];
  }
  
  var rations = {
      'plus' : document.getElementById('plus'), //TODO use this to simplify code
      min : document.getElementById('min'),
      times : document.getElementById('times'),
      div : document.getElementById('div'),
      mod : document.getElementById('mod'),
      
  };
  
  
  var sys = {
    back : document.getElementById('back'),
    ans : document.getElementById('equ'),
    clear : document.getElementById('clear'),
  };
  
  sys.ans.onclick = function(){
    calc.solve();
    reset();
  };
  
  sys.back.onclick = function(){
    calc.backspace();
    reset();
  };
  
  sys.clear.onclick = function(){
    calc.clear();
  };
  
  sys.clear.ondblclick = function(){
    calc.clear(true);
    reset();
  };
  

  for ( var i = 0; i < rands.length; i++ ) (function(i){ 
    rands[i].onclick = function() {
      calc.screenWrite(i);
      calc.startOver = false;
      
    };
  })(i);
  
  for (var operation in rations) (function(i){
    rations[operation].onclick = function(){
      calc.operate(this.id);
      calc.startOver = true;
      reset(this);
    };
  })(i);

};

/*TODO
**Screen lenth optimization
**optimize to ES6
--Add backspace
--Add clear
**Add dot
**Add sqr, sqrt, exp, log. ...
**handle operations involving just '.' or '-'
*/




