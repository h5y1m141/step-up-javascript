## JSONPlaceholderクラスの仕様を考える

実装をする前に、まずはJSONPlaceholderクラスの仕様を考えてみたいと思います。


JSONPlaceholderのWebAPIは

- posts
- comments
- albums
- photos
- todos
- users

というそれぞれのリソースに対して取得、作成、、削除・・・といった処理が行えるような構造になってます。

なるべくこの構造を維持したクラスが定義できると、自分自身だけではなく他の人からも利用する時にイメージしやすい構造になるかと思います。

そのため

```javascript
var jsonPlaceHolder = new JsonPlaceHolder();
```

とした後に、例えば投稿情報に対する処理に対しては

```javascript
var id = 1,
    postData = {
      id: 1,
      title: 'タイトル',
      body: '本文'
    };
jsonPlaceHolder.posts.index();              // 一覧を取得
jsonPlaceHolder.posts.show(id);             // 指定したIDの投稿情報を取得
jsonPlaceHolder.posts.create(postData);     // 投稿情報を作成
jsonPlaceHolder.posts.update(id, postData); // 指定したIDの投稿情報を更新
jsonPlaceHolder.posts.destroy(id);          // 指定したIDの投稿情報を削除
```

という形で行えて、コメント情報に対する処理に対しては

```javascript
var id = 1,
    postData = {
      id: 1,
      title: 'タイトル',
      body: '本文'
    };
jsonPlaceHolder.comments.index();              // 一覧を取得
jsonPlaceHolder.comments.show(id);             // 指定したIDのコメントを取得
jsonPlaceHolder.comments.create(postData);     // コメントを作成
jsonPlaceHolder.comments.update(id, postData); // 指定したIDのコメントを更新
jsonPlaceHolder.comments.destroy(id);          // 指定したIDのコメントを削除
```

が行えると理想的かと思うのでこういう処理が行えることを仕様として定義したいと思います。

なお、今回は、時間の都合もあって特定のリソース（投稿情報）の対しての説明だけになります。
