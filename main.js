"use strict";

class Stack{
  
  constructor(){
    this.stk = [];
  }
  size(){
    return this.stk.length;
  }
  
  push(val){
    return this.stk.push(val);
  }
  
  pop(val){
    return this.stk.pop();
  }
  
  peek(){
    return this.stk[this.size() - 1];
  }
  
  empty(){
    this.stk.length = 0;
  }
}

class Calculator  {
  
  constructor(display, max){
  this.screenDisplay = display;
  this.max = max;
  this.prev = '';
  this.value = '&#8291;';
  this.startOver = true;
  this.stack = new Stack();
  this.op = null;
  this.tions = {
    'plus' : (a, b) => a/1.0 + b/1.0,
    'times' : (a, b) => a*b,
    'min' : (a, b) => a-b,
    'div' : (a, b) => a/b,
    'mod' : (a, b) => a%b,
  };
  }
  
  run(ope){
    return this.tions[ope];
  }
  
  solve(ope){
    if (this.value !== '' && this.op !== null){
      if (ope === undefined) ope = this.op;
      let ans = this.tions[ope](this.stack.pop(), this.value);
      this.startOver = true;
      this.op = null;
      this.screenWrite(ans);
      this.stack.push(ans);
    }
  }
  
  operate(ope){
    if (this.value === '&#8291;') this.value = '0';
    if (this.op === null || this.value === ''){
      this.stack.push(parseInt(this.value));
      this.prev = this.value;
      this.value = '';
    }
    else if (this.stack.size() === 1)
      this.solve();
    this.op = ope;
  }
  
  clear(doubleClick=false){
    this.prev = this.value;
    this.value = '&#8291;';
    this.screenWrite('&#8291;');
    if (doubleClick){
      this.op = null;
      this.stack.empty();
    }
  }
  
  backspace(){
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
  }
  
  screenWrite(val){
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
    
  }
  
}

window.onload = function(){
  var calc = new Calculator(document.getElementById('screen'), 20);
  var reset = pressedKey => {
    for (var item in rations) rations[item].className = "tap tion";
    if (pressedKey !== undefined)
      pressedKey.className += " light";
  };
  var rands = [].slice.call(document.getElementsByClassName('rand')).reverse();
  
  var rations = {};
  [].slice.call(document.getElementsByClassName('tion')).forEach(ele => {
    rations[ele.id] = document.getElementById(ele.id);
  });
  
  var sys = {};
  [].slice.call(document.getElementsByClassName('sys')).forEach(ele => {
    sys[ele.id] = document.getElementById(ele.id);
  });
  
  sys.equ.onclick = () => {
    calc.solve();
    reset();
  };
  
  sys.back.onclick = () => {
    calc.backspace();
    reset();
  };
  
  sys.clear.onclick = () => calc.clear();
  
  sys.clear.ondblclick = () => {
    calc.clear(true);
    reset();
  };
  

  for ( var i = 0; i < rands.length; i++ ) (i => { 
    rands[i].onclick = function() {
      calc.screenWrite(i);
      calc.startOver = false;
    };
  })(i);
  
  for (var operation in rations) (i => {
    rations[operation].onclick = function(){
      calc.operate(this.id);
      calc.startOver = true;
      reset(this);
    };
  })(i);

};

/*TODO
**Screen lenth optimization
--optimize to ES6
--Add backspace
--Add clear
**Add dot
**Add sqr, sqrt, exp, log. ...
**handle operations involving just '.' or '-'
*/




