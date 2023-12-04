import { useState, useEffect } from "react";

export default function Movies({ initialData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieData, setMovieData] = useState(initialData);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://www.omdbapi.com/?apikey=59dad974&s=${searchTerm}`);
      const newData = await res.json();
      setMovieData(newData);
    }

    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm !== "") {
      fetchData();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      <div>
        {movieData && movieData.Search && movieData.Search.map((movie) => (
          <div key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: "100px" }} />
            {movie.Title} --- {movie.Year}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.search || "avengers";
  const res = await fetch(`http://www.omdbapi.com/?apikey=59dad974&s=${searchTerm}`);
  const initialData = await res.json();

  return {
    props: {
      initialData,
    },
  };
}
