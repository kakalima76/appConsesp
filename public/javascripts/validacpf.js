
var validaCPF = function(input)
{

  var cpf = input.substring(0,9);

  var findFirstArray = function(value, index, sbt){
    return parseInt(sbt.substring(index, index + 1)) * (10 - index); 
  };

  var sumDigit = function(sum, value){
    return sum + value;
  };

  var k = [].map.call(cpf, findFirstArray).reduce(sumDigit);


  var findDigit = function(x){

    return (x % 11 < 2) ? 0 : 11 - (x % 11);
  };

  var cpfDig1 = cpf + findDigit(k);

  var findSecondArray = function(value, index, sbt){
    return parseInt(sbt.substring(index, index + 1)) * (11 - index);
  };

  var l = [].map.call(cpf, findSecondArray).reduce(sumDigit);

  var cpfDig2 = cpfDig1 + findDigit(l);

  return (input === cpfDig2) ? true : false;
  
};


