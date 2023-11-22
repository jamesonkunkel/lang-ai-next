import axios from "axios";

// create an axios get request to the api
const getTranslation = async (prompt: string) => {
  const response = await axios.post("/api/translator", { prompt: prompt });
  return response.data;
};

export default function Home() {
  const handleClick = async () => {
    const response = await getTranslation("Me llamo Jameson");
    console.log(response);
  };

  return (
    <main>
      <button onClick={handleClick}>Click me</button>
    </main>
  );
}
