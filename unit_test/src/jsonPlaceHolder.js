var JsonPlaceHolder = (function(){
  function Post(rootURL){
    this.rootURL = rootURL;
    this.title = 'JavaScriptステップアップ勉強会';
    this.body = 'PHPやRubyなどの言語を利用してWebアプリケーション開発をしてる方は一定数いると思うのですが、なんとなくJavaScript苦手という方が一定数いるような気がしてます。そういった方向けに特定のフレームワークやライブラリについて取り上げるのではなくJavaScriptについて一歩掘り下げて学ぶハンズオン形式のスタイルで学べるようにこのコミュニティを立ち上げました';
  }
  Post.prototype._request = function(params){
    var deferred = $.ajax(params);
    return deferred.promise();
  };
  Post.prototype.index = function(){
    var params = {
      url: this.rootURL + '/posts',
      method: 'GET'
    };
    return this._request(params);
  };
  Post.prototype.show = function(id){
    var params = {
      url: this.rootURL + '/posts/' + id,
      method: 'GET'
    };
    return this._request(params);
  };
  Post.prototype.create = function(_params){
    var params = {
      url: this.rootURL + '/posts',
      method: 'POST',
      data: _params
    };
    return this._request(params);
  };
  Post.prototype.update = function(id, _params){
    var params = {
      url: this.rootURL + '/posts/' + id, 
      method: 'PUT',
      data: _params
    };
    return this._request(params);
  };
  Post.prototype.destroy = function(id, _params){
    var params = {
      url: this.rootURL + '/posts/' + id,
      method: 'DELETE',
      data: ''
    };
    return this._request(params);
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
