import logo from './logo.svg';
import React from "react";
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form.js";


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};



console.log("야옹");

//컴포넌트는 무조건 대문자로 시작
function CatItem(props) {
  return (
    <li>
      <img src={props.img} alt="cat" />
    </li>
  );
}

// const FOO = "hello world"
// {FOO == "hello world" ? "true" : "false"}
// {foo()}

// function foo() {
//   return 1;
// }

//리액트 안에서도 {}로 자바스크립트 문법을 쓸 수 있음

//조건부 렌더링
function Favorites({ favorites }) {
  if (favorites.length == 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>
  }
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}

//삼항연상자
const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";

  return (
    < div className="main-card" >
      <img src={img} alt="mainCat" />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div >
  );
}

const App = () => {

  const CAT1 = "";
  //const CAT2 = "";
  //const CAT3 = "";

  //상태 끌어올리기 Lifting stata up(자식 컴포넌트 안에서만 쓰이던 상태를 상위 컴포넌트에서도 쓰기 위함 -> 자식 컴포넌트에 props로 넘겨줘야 함)
  // const [counter, setCounter] = React.useState(
  //   jsonLocalStorage.getItem('counter')
  // );
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const [mainCat, setmainCat] = React.useState(CAT1);
  //없으면 null값 || []
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });
  console.log("카운터", counter);

  const alreadyFavorite = favorites.includes(mainCat);


  //await은 반드시 async함수 안에
  async function setInitialCat(value) {
    const newCat = await fetchCat('First cat');
    setmainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setmainCat(newCat);

    //비동기처리 : 값 대신 함수를 넘김
    setCounter((prev) => {
      const nextCounter = prev + 1
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    })

  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  //조건에 따라 텍스트 노출
  const counterTitle = counter == null ? "" : counter + "번째 ";

  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );

}

export default App;
