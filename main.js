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
}

function Calculator(display, max, spaces)  {
  this.screenDisplay = display;
  this.max = max;
  this.value = '0';
  this.spaces = spaces;
  this.startOver = true;
  this.stack = new Stack();
  this.op = null;
  
  this.run = function(ope){
    return this.tions[ope];
  };
  
  this.tions = {
    'plus' : function(a, b){
            // this.startOver = true;
            // this.screenWrite(a + b);
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
    if (this.value !== ''){
      if (ope === undefined) ope = this.op;
      var ans = this.tions[ope];
      ans = ans(this.stack.pop(), this.value);
      console.log(ans);
      this.startOver = true;
      this.op = null;
      this.screenWrite(ans);
      this.stack.push(ans);
    }
  };
  
  this.operate = function(ope){
    if (this.op === null || this.value === ''){
      this.stack.push(parseInt(this.value));
      this.value = '';
    }
    else if (this.stack.size() === 2)
      this.solve();
    this.op = ope;
  };
  
  this.backspace = function(){
    
  };
  
  this.screenWrite = function(val){
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
  var calc = new Calculator(document.getElementById('screen'), 20, 40);
  
  var reset = function(light){
    for (var item in rations){
      console.log(item);
      rations[item].className = "tap tion";
    }
    if (light !== undefined)
      light.className += " light";
  };
  
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
  
  sys.ans.onclick = function(){
    calc.solve();
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

// this.screenWrite = function(val){
//     // var maxlength = 21;
    
//     if (this.value.length < this.max){
//       this.screenDisplay.value = this.value;//makeSpaces(max - this.value.length) + this.value;
//       console.log('val len: ' + this.value.length + 'max: ' + this.max);
//     }
//     // this.screenDisplay.value += val;
//     this.value += val;

//   };







