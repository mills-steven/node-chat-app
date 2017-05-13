const expect = require('expect');

const{Users} = require('./users');

describe('Users', () => {
var users;
beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'Steve',
    room: 'Cool Room'
  }, {

    id: '2',
    name: 'Romana',
    room: 'Another Cool Room'
  }, {

    id: '3',
    name: 'Foxy',
    room: 'Cool Room'
  }]
})

  it('should add new users', () => {
      var users = new Users();
      var user = {
        id: '1',
        name: 'Steve',
        room: 'Cool Room'
      };
      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    var userId = '100';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return name for cool room', () => {
    var userList = users.getUserList('Cool Room');
    expect(userList).toEqual(['Steve', 'Foxy']);
  });

  it('should return name for another cool room', () => {
    var userList = users.getUserList('Another Cool Room');
    expect(userList).toEqual(['Romana']);
  });
});
