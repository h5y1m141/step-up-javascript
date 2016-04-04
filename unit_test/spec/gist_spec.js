describe('Gist', function() {
  beforeEach(function() {
    this.gist = new Gist();
  });
  describe('fetchメソッド', function() {
    beforeEach(function () {
      // 実際にWebにはアクセスせずに、期待されるJSONをMockのオブジェクト
      // として定義
      spyOn(this.gist, 'fetch').and.callFake(function(){
        var deferred = $.Deferred();
        var dummyResponse = [
          {
            'author': 'おやまだひろし',
            'text': 'はじめてのReact.js'
          },
          {
            'author': 'Hiroshi Oyamada',
            'text': 'First Step ReactJS'
          }
        ];
        deferred.resolve(JSON.stringify(dummyResponse));
        return deferred.promise();
      });
    });
    it('定義されてる', function(){
      expect(this.gist.fetch()).toBeDefined();
    });
    it('APIからJSONが得られる', function(){
      var promise,
          result;
      promise = this.gist.fetch();
      promise.done(function(data){
        result = JSON.parse(data); 
      });
      expect(result[0].author).toEqual('おやまだひろし');
    });
  });
});
