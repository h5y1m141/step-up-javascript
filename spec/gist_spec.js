describe('Gist', function() {
  beforeEach(function() {
    this.gist = new Gist();
  }); 
  describe('fetchメソッド', function() {
    it('定義されてる', function(){
      expect(this.gist.fetch()).toBeDefined();
    });
  });
});
