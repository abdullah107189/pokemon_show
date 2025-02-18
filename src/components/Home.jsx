import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [pokeapi, setPokeapi] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokeapiData = await Promise.all(
          data.results.map(async (p) => {
            const { data } = await axios.get(p.url);
            return {
              name: p.name,
              image: data?.sprites?.other?.["official-artwork"]?.front_default,
            };
          })
        );
        console.log("pokiapiData ,,,,", pokeapiData);
        console.log(data?.results);
      } catch (error) {
        console.log("Fetching problem, ", error.message);
      }
    };
    fetchingData();
  }, []);
  return (
    <div>
      {pokeapi.map((p) => (
        <div key={p.url}></div>
      ))}
    </div>
  );
};

export default Home;
