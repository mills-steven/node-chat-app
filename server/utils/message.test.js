var expect = require('expect');
var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Steve';
    var latitude = 41.887461;
    var longitude = -87.640263;
    var url = 'https://www.google.com/maps?q=41.887461,-87.640263';
    var message = generateLocationMessage(from, latitude, longitude);

      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, url});

  });
});
