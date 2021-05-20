export default async function retrieveContent() {
  const url = "src/data.json";S
  const response = await fetch(url);
  return response.json();
}
