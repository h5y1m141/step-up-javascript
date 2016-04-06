var jsonPlaceHolder = new JsonPlaceHolder();

$('#listResources').on('click', function(){
  var promise, 
      items = [];
  promise = jsonPlaceHolder.posts.index();
  promise.done(function(response){
    $.each(response, function(index, item) {
      items.push('<li>' + 'ID：'
                 + item.id
                 + 'タイトル：' 
                 + item.title 
                 + '</li>');
    });
    $('#postsIndex').append(items);
  });
});

$('#showResource').on('click', function(){
  var promise,
      items = [],
      id = ($('#postsID')) ? $('#postsID').val() : 1;
  promise = jsonPlaceHolder.posts.show(id);
  promise.done(function(item){
    items.push('<li>' + 'ID：'
               + item.id
               + 'タイトル：' 
               + item.title 
               + '</li>');
    $('#postsShow').append(items);
  });
});
