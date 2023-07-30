<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EcommerceController extends Controller
{
    //
}






// <?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Article;

// class HayalaController extends Controller
// {
//     function addOrUpdateArticle(Request $request, $id = "add"){
//         if($id == "add"){
//             $article = new Article;
//         }else{
//             $article = Article::find($id);
//         }

//         $article->category_id = 1;
//         $article->name = $request->name ? $request->name : $article->name;
//         $article->author = $request->author;
//         $article->location = $request->location;
//         $article->save();

//         return json_encode(["articles" => $article]);
//     }

//     function getArticles($id = null){
//         if($id){
//             $articles = Article::find($id);
//         }else{
//             $articles = Article::all();
//         }
        
//         return json_encode(["articles" => $articles]);
//     }

//     function getArticlebyCategory($id){
//         $articles = Article::where("category_id", $id)->get();
//         return json_encode(["articles" => $articles]);
//     }

//     function deleteArticle($id){
//         $article = Article::find($id)->delete();
//         return json_encode(["success" => true]);
//     }
    
//     function test (){
//         return json_encode(["name" => "Charbel"]);
//     }

//     function issuesV01 (){
//         return json_encode(["name" => "V01"]);
//     }

//     function issuesV02 (){
//         return json_encode(["name" => "V02"]);
//     }

//     function third (){
//         return json_encode(["name" => "Third"]);
//     }
// }
