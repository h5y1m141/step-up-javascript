var jsonPlaceHolder = new JsonPlaceHolder(),
    promise;

$('#loadJSON').on('click', function(){
  promise = jsonPlaceHolder.posts.index();
  promise.done(function(response){
    console.log(response);
  });
});

