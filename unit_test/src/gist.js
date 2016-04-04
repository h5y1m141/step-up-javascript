var Gist = (function() {
  function Gist(){
    this.url = 'https://gist.githubusercontent.com/h5y1m141/f52eece296999105742c/raw/f3291233f69032a0b168192e11958575836833c2/react.json';
  }
  Gist.prototype.fetch = function(){
    var deferred;
    deferred = $.ajax({
      url: this.url
    });
    return deferred.promise();
  };
  return Gist;
})();
