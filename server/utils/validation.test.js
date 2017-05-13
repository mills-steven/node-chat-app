const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', ()=> {
 it('should reject non-string values ', () => {
   var test = isRealString(1);

   expect(test).toBe(false);
 });


 it('should reject string with only spaces', () => {
   var test = isRealString('           ');

   expect(test).toBe(false);
 });


 it('should all string with non-space characters', () => {
   var test = isRealString('   Steve     ');

   expect(test).toBe(true);
 });
});
