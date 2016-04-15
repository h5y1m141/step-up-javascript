var JsonPlaceHolder = (function(){
  function Post(rootURL){
    this.rootURL = rootURL;
  };
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
      url: this.rootURL + '/posts' + id,
      method: 'GET'
    };
    return this._request(params);
  };
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.post = new Post(this.rootURL);
  };
  return JsonPlaceHolder;
})();
