var gist = new Gist(),
    promise;

$('#loadJSON').on('click', function(){
  promise = gist.fetch();
  promise.done(function(response){
    var authors = JSON.parse(response);
    console.log(authors);
  });
});

