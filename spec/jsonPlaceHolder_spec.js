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
  describe('Postについて', function() {
    describe('_request()メソッドについて', function() {
      beforeEach(function () {
        spyOn(jsonPlaceHolder.post, '_request').and.callThrough();
      });      
      it('WebAPIにアクセスする個々のメソッドが呼ばれる時には通信処理を担う_request()メソッドが呼ばれる', function(){
        jsonPlaceHolder.post.index();
        expect(jsonPlaceHolder.post._request).toHaveBeenCalled();
        jsonPlaceHolder.post.show();
      });
    });
    describe('WebAPIにアクセスするメソッドについて', function() {
      beforeEach(function() {
        var fakeResult = [
          {id: 1, title: 'title1', body: 'body1' },
          {id: 2, title: 'title2', body: 'body2' }
        ];
        spyOn(jsonPlaceHolder.post, 'index').and.callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult);
          return deferred.promise();
        });
        spyOn(jsonPlaceHolder.post, 'show').and.callFake(function(){
          var deferred = $.Deferred();
          deferred.resolve(fakeResult[0]);
          return deferred.promise();
        });
      });
      describe('indexについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.post.index()).toBeDefined();
        });
        it('一覧を取得できる', function(){
          var result,
              promise;
          promise = jsonPlaceHolder.post.index();
          promise.done(function(response){
            result = response;
          });
          expect(result[0].id).toEqual(1);
        });
      });
      describe('showについて', function() {
        it('定義されてる', function(){
          expect(jsonPlaceHolder.post.show()).toBeDefined();
        });
        it('指定された投稿情報が取得できる', function(){
          var result,
              promise;
          promise = jsonPlaceHolder.post.show(1);
          promise.done(function(response){
            result = response;
          });
          expect(result.id).toEqual(1);
        });
      });
    });
  });
});
