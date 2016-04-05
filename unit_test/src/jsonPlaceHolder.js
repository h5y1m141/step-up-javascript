var JsonPlaceHolder = (function(){
  function Posts(rootURL){
    this.rootURL = rootURL;
  }
  Posts.prototype._request = function(params){
    var deferred = $.ajax(params);
    return deferred.promise();    
  };
  Posts.prototype.index = function(){
    var params = { 
      httpMethod: 'GET',
      params: ''
    };
    this.show();
    return this._request(params);
  };
  Posts.prototype.show = function(){
    var params = { 
      httpMethod: 'GET',
      params: ''
    };
    return this._request(params);
  };
  Posts.prototype.create = function(){
    var params = { 
      httpMethod: 'GET',
      params: ''
    };
    return this._request(params);
  };  
  Posts.prototype.update = function(){
    var params = { 
      httpMethod: 'GET',
      params: ''
    };
    return this._request(params);
  };
  Posts.prototype.destroy = function(){
    var params = { 
      httpMethod: 'GET',
      params: ''
    };
    return this._request(params);
  };  
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.posts = new Posts(this.rootURL);
  };
  
  return JsonPlaceHolder;
})();
