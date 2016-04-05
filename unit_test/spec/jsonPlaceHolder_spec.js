describe('JsonPlaceHolder', function() {
  beforeEach(function() {
    this.jsonPlaceHolder = new JsonPlaceHolder();
  });
  describe('rootURLについて', function() {
    it('定義されてる', function(){
      expect(this.jsonPlaceHolder.rootURL).toBeDefined();
    });
    it('値が確認できる', function(){
      expect(this.jsonPlaceHolder.rootURL).toBe('http://jsonplaceholder.typicode.com');
    });
  });
  describe('Postsについて', function() {
    describe('indexについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.index()).toBeDefined();
      });
    });
    describe('showについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.show()).toBeDefined();
      });
    });
    describe('createについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.create()).toBeDefined();
      });
    });
    describe('updateについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.update()).toBeDefined();
      });
    });
    describe('destroyについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.destroy()).toBeDefined();
      });
    });
  });
});
