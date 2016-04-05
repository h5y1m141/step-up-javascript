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
    beforeEach(function () {
      spyOn(this.jsonPlaceHolder.posts, '_request').and.callThrough();
    });
    describe('indexについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.index()).toBeDefined();
      });
      it('APIを呼び出すための_request()メソッドが呼ばれる', function(){
        this.jsonPlaceHolder.posts.index();
        expect(this.jsonPlaceHolder.posts._request).toHaveBeenCalled();
      });
    });
    describe('showについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.show()).toBeDefined();
      });
      it('APIを呼び出すための_request()メソッドが呼ばれる', function(){
        this.jsonPlaceHolder.posts.show();
        expect(this.jsonPlaceHolder.posts._request).toHaveBeenCalled();
      });
    });
    describe('createについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.create()).toBeDefined();
      });
      it('APIを呼び出すための_request()メソッドが呼ばれる', function(){
        this.jsonPlaceHolder.posts.create();
        expect(this.jsonPlaceHolder.posts._request).toHaveBeenCalled();
      });
    });
    describe('updateについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.update()).toBeDefined();
      });
      it('APIを呼び出すための_request()メソッドが呼ばれる', function(){
        this.jsonPlaceHolder.posts.update();
        expect(this.jsonPlaceHolder.posts._request).toHaveBeenCalled();
      });
    });
    describe('destroyについて', function() {
      it('定義されてる', function(){
        expect(this.jsonPlaceHolder.posts.destroy()).toBeDefined();
      });
      it('APIを呼び出すための_request()メソッドが呼ばれる', function(){
        this.jsonPlaceHolder.posts.destroy();
        expect(this.jsonPlaceHolder.posts._request).toHaveBeenCalled();
      });
    });
  });
});
