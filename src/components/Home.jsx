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

        setPokeapi(pokeapiData);
      } catch (error) {
        console.log("Fetching problem, ", error.message);
      }
    };
    fetchingData();
  }, []);
  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2  md:gap-5 gap-4 md:p-5 p-4">
      {pokeapi.map((p) => (
        <div
          key={p.image}
          className="bg-white p-2 rounded-3xl flex items-center justify-center relative"
        >
          <img src={p?.image} alt={p?.name} />
          <p className="absolute uppercase font-semibold -bottom-2 bg-gray-200 w-2/3 flex items-center justify-center rounded-3xl ">
            {p?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
