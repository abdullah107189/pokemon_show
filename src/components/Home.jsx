import { useEffect, useState } from "react";

const Home = () => {
  const [pokeapi, setPokeapi] = useState([]);
  try {
    useEffect(() => {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPokeapi(data?.results);
          console.log(data?.results);
        });
    }, []);
  } catch (error) {
    console.log("Fetching problem, ", error.message);
  }
  return (
    <div>
      {pokeapi.map((p) => (
        <div key={p.url}></div>
      ))}
    </div>
  );
};

export default Home;
