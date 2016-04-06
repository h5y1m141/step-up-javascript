describe('JsonPlaceHolder', function() {
  var jsonPlaceHolder;
  beforeEach(function() {
    jsonPlaceHolder = new JsonPlaceHolder();
  });
  describe('rootURLについて', function() {
    it('定義されてる', function(){
      expect(jsonPlaceHolder.rootURL).toBeDefined();
    });
    it('値が確認できる', function(){
      expect(jsonPlaceHolder.rootURL).toBe('http://jsonplaceholder.typicode.com');
    });
  });
  describe('Postsについて', function() {
    describe('_request()メソッドについて', function() {
      beforeEach(function () {
        spyOn(jsonPlaceHolder.posts, '_request').and.callThrough();
      });      
      it('個々のメソッドが呼ばれた時に、_request()メソッドが呼び出される', function(){
        jsonPlaceHolder.posts.index();
        expect(jsonPlaceHolder.posts._request).toHaveBeenCalled();
        jsonPlaceHolder.posts.show();
        expect(jsonPlaceHolder.posts._request).toHaveBeenCalled();
        jsonPlaceHolder.posts.create();
        expect(jsonPlaceHolder.posts._request).toHaveBeenCalled();
        jsonPlaceHolder.posts.update();
        expect(jsonPlaceHolder.posts._request).toHaveBeenCalled();
        jsonPlaceHolder.posts.destroy();
        expect(jsonPlaceHolder.posts._request).toHaveBeenCalled();
      });        
    });
    describe('個々のメソッドについて', function() {
      var fakeResult =             [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }
      ];
      beforeEach(function () {      
        spyOn(jsonPlaceHolder.posts, 'index').and.callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult);
          return deferred.promise();
        });
        spyOn(jsonPlaceHolder.posts, 'show').and.callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult[0]);
          return deferred.promise();
        });        
        spyOn(jsonPlaceHolder.posts, 'update').and.callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult[0]);
          return deferred.promise();
        });
      });
      describe('indexについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.posts.index()).toBeDefined();
        });
        it('APIからの返り値が確認できる', function(){
          var result,
              promise;
          promise = jsonPlaceHolder.posts.index();
          promise.done(function(response){
            result = response;
          });
          expect(result[0].id).toEqual(1);
        });
      });
      describe('showについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.posts.show()).toBeDefined();
        });
        it('APIからの返り値が確認できる', function(){
          var result,
              promise;
          promise = jsonPlaceHolder.posts.show(1);
          promise.done(function(response){
            result = response;
          });
          expect(result.id).toEqual(1);
        });
      });
      describe('createについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.posts.create()).toBeDefined();
        });
      });
      describe('updateについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.posts.update()).toBeDefined();
        });
        it('APIからの返り値が確認できる', function(){
          var result,
              promise;
          promise = jsonPlaceHolder.posts.update();
          promise.done(function(response){
            result = response;
          });
          expect(result.id).toEqual(1);
          expect(result.title).toEqual('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
        });
      });
      describe('destroyについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.posts.destroy()).toBeDefined();
        });
      });      
    });
  });
});
