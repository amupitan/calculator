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
}

function Calculator(display, max)  {
  this.screenDisplay = display;
  this.max = max;
  this.value = '';
  this.startOver = true;
  this.stack = new Stack();
  this.op = null;
  
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
  
  this.operate = function(ope){
    this.stack.push(this.value);
    this.op = ope;
  };
  
  this.backspace = function(){
    
  };
  
  this.screenWrite = function(val){
    // var maxlength = 21;
    
    if (this.value.length < this.max){
      this.screenDisplay.value = this.value;//makeSpaces(max - this.value.length) + this.value;
      console.log('val len: ' + this.value.length + 'max: ' + this.max);
    }
    // this.screenDisplay.value += val;
    this.value += val;

    // if (this.screenDisplay.value.length === maxlength){
    //   this.screenDisplay.value = this.screenDisplay.value.substring(0, maxlength-1);
    //   this.screenDisplay.style.borderColor = "red";
    // }
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
  var calc = new Calculator(document.getElementById('screen'), 39);
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
      
  };
  
  var sys = {
    backspace : document.getElementById('back'),
  };

  for ( var i = 0; i < rands.length; i++ ) (function(i){ 
    rands[i].onclick = function() {
      calc.startOver = false;
      calc.screenWrite(i);
      console.log(i);
    };
  })(i);

};







