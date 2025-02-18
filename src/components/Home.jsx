import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [pokeapi, setPokeapi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  const filteredPokemon = pokeapi.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className="md:w-4/5 mx-auto md:pt-8 pt-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-9/12 mx-auto flex items-center justify-center focus:w-11/12 focus:shadow-md  p-2 px-5 rounded-full focus:outline-none transform duration-200 bg-white "
        />
      </div>

      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2  md:gap-5 gap-4 md:p-5 p-4">
        {searchTerm === "" ? (
          <>
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
          </>
        ) : (
          <>
            {!filteredPokemon.length == 0 ? (
              <>
                {filteredPokemon.map((p) => (
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
              </>
            ) : (
              <p className="text-center text-4xl w-full col-span-12">
                Try searching for something else
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
