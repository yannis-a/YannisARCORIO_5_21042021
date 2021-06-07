export default async function retrieveData() {
  const url = "src/data.json";
  const response = await fetch(url);
  return response.json();
}
