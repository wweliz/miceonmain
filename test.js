/* global describe, it */
//A directive for telling JSHint about global variables that are defined elsewhere. 
 
(function () {
    'use strict';
 
    describe('square function', function () {
      it('should multiply its argument by itself', function(){
        var answer = square(2);
        expect(answer).to.equal(4);
      });
 
      it('should throw errors for non-Number types', function(){
 
        var erroneousSquare = function(){
          square('2');
        }
 
        var nanSquare = function(){
          square(NaN);
        }
 
        expect(erroneousSquare).to.throw(Error);
        expect(nanSquare).to.throw(Error);
      });
 
      it('should throw an error when no args are provided', function(){
 
        expect(square).to.throw(Error);
 
      })
    });
})();