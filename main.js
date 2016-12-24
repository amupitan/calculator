"use strict";

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
}

function Calculator(display, max, spaces)  {
  this.screenDisplay = display;
  this.max = max;
  this.value = '';
  this.spaces = spaces;
  this.startOver = true;
  this.stack = new Stack();
  this.op = null;
  
  this.run = function(ope){
    return this.tions[ope];
  };
  
  this.tion = {
    'add' : function(a, b){
            this.startOver = true;
            this.screenWrite(a + b);
            },
    ''
  };
  
  this.add = function(a, b){
    this.startOver = true;
    this.screenWrite(a + b);
  };
  
  this.sub = function(a, b){
    return a - b;
  };
  
  this.mul = function(a, b){
    return a*b;
  };
  
  this.div = function(a, b){
    return a/b;
  };
  
  this.mod = function(a, b){
    return a%b;
  };
  
  this.solve = function(ope){
    if (this.value !== ''){
      if (ope === undefined) ope = this.op;
      var ans = this.run(ope)(this.stack.pop(), this.value);
    }
  };
  
  this.operate = function(ope){
    if (this.op === null || this.value === ''){
      this.stack.push(parseInt(this.value));
      this.value = '';
    }
    else if (this.stack.size() === 2)
      this.solve();
    // else if (this.value === ''){
        
    // }
    this.op = ope;
  };
  
  this.backspace = function(){
    
  };
  
  this.screenWrite = function(val, change){
    // var maxlength = 21;
  
    if (change) this.value = val;
    else
      this.value += val;
    if (this.value.length < this.max)
      this.screenDisplay.innerHTML = /*makeSpaces((max - this.value.length)*2) + */this.value;
    
  };
  
  var makeSpaces = function(num){
    var res = "";
    for(var i = 0; i < num; i++){
      res += " ";
    }
    return res;
  }
}

window.onload = function(){
  var calc = new Calculator(document.getElementById('screen'), 20, 40);
  var rands = [
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
    
  var rations = {
      plus : document.getElementById('plus'),
      min : document.getElementById('min'),
      times : document.getElementById('times'),
      div : document.getElementById('div'),
      mod : document.getElementById('mod'),
      
  };
  
  
  var sys = {
    backspace : document.getElementById('back'),
    ans : document.getElementById('equ'),
  };

  for ( var i = 0; i < rands.length; i++ ) (function(i){ 
    rands[i].onclick = function() {
      calc.startOver = false;
      calc.screenWrite(i, false);
      console.log(i);
    };
  })(i);
  
  for (var operation in rations) (function(i){
    operation.onclick = function(){
      calc.operate(i.id);
    };
  })(i);

};

// this.screenWrite = function(val){
//     // var maxlength = 21;
    
//     if (this.value.length < this.max){
//       this.screenDisplay.value = this.value;//makeSpaces(max - this.value.length) + this.value;
//       console.log('val len: ' + this.value.length + 'max: ' + this.max);
//     }
//     // this.screenDisplay.value += val;
//     this.value += val;

//   };







