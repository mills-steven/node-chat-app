var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', ()=> {
 it('should generate correct message object', () => {
   var from = 'Steve';
   var text = 'Test';
   var message = generateMessage(from, text);

   expect(message.createdAt).toBeA('number');
   expect(message.text).toBe(text);
   expect(message.from).toBe(from);
 });
});
