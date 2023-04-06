import React from "react";

export default function getAllPolemon(url){
    return new Promise((resolve,reject) => 
        //fetchでurlから受け取った情報をthenで、受け取りjson形式に変換。
        fetch(url).then((res) => res.json())
        //dataとして保存し、promiseがresolveしたのでdataを返す。
        .then((data) => resolve(data))
        //Promise処理は、上記fetchが終わるまで待っている！(時間がかかる処理で使用)
)};
