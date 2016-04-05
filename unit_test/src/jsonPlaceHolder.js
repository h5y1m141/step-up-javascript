var JsonPlaceHolder = (function(){
  function Posts(){
  }
  Posts.prototype.index = function(){
    return true;
  };
  Posts.prototype.show = function(){
    return true;
  };
  Posts.prototype.create = function(){
    return true;
  };  
  Posts.prototype.update = function(){
    return true;
  };
  Posts.prototype.destroy = function(){
    return true;
  };  
  function JsonPlaceHolder(){
    this.rootURL = 'http://jsonplaceholder.typicode.com';
    this.posts = new Posts;
  };
  
  return JsonPlaceHolder;
})();
