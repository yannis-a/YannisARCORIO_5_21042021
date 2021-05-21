export default async function retrieveContent() {
  const url = "src/data.json";
  const response = await fetch(url);
  return response.json();
}
