import './App.css';
// import React from 'react'
// import getAllPolemonData from './utils/pokemon';
// import getAllPolemonUrl from './utils/pokemon'
import { useEffect, useState } from 'react';

const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData,setPokemonData] = useState([]);

 async function getData(allUrl){
  const promises = allUrl.map((eactData) => (
  fetch(eactData)
  .then((res) => res.json())))
   return Promise.all(promises)
  .then((data) => {
   const detailData = data;
   return detailData;
  }
  )
}

//2  (受け取るものが多数。promise.all必要。)
async function loadPokemon(data){
  // const pokemonUrl = await getAllPolemonUrl(data.url);
  // console.log(pokemonUrl);
  // console.log(pokemonUrl);
  const pokemonUrl = await Promise.all(data.map((item) => item.url));
  return pokemonUrl;
  // return await Promise.all(data.map((item) => item.url));
  // getData(pokemonUrl);
};

//1  (受け取るものが一つ。newPromiseでOK)
function getAllPolemonData(url){
  return new Promise((resolve,reject) => 
      //fetchでurlから受け取った情報をthenで、受け取りjson形式に変換。
      fetch(url).then((res) => res.json())
      //dataとして保存し、promiseがresolveしたのでdataを返す。
      .then((data) => resolve(data))
      //Promise処理は、上記fetchが終わるまで待っている！(時間がかかる処理で使用)
)};

useEffect(() => {
  //async:非同期処理を行う合図
  //await:非同期処理が完了するまで待つよう指示
  const fetchPokemonData = async () => {
    //1 　 await忘れない！
    let data = await getAllPolemonData(initialURL);
    console.log(data);
    console.log(data.results);//20種のポケモンの名前とurl
    //2   await忘れない！
    let allUrl = await loadPokemon(data.results);
    console.log(allUrl);//20種のポケモンのurl
    // getData(allUrl);
    let pokemonName = await getData(allUrl);
    setPokemonData(pokemonName); //全部でてからsetStateする！
    setLoading(false);
  }
  fetchPokemonData();//✩忘れがち
},[]);

console.log(pokemonData); //useEttectなどの外でconsole.logすること！！

//async function fetchPokemonData(){
  // try{
  //   await fetch(initialURL).then((res) => res.json()).then((data) => {let res = data})
  // }
// }

  return (
    <div>
      {loading? <h1>ロード中</h1>: <h1>データを取得しました</h1>}
      {pokemonData.map((data, index) => <div key={index} className="pokemonList" >
        <ul>
        <li>{data.id}</li>
          <li>{data.name}</li>
          <img src={data.sprites.front_default} alt="pic" />
          <img src={data.sprites.back_default} alt="pic" />
        </ul>
      </div>)}
    </div>
  )
}

export default App
