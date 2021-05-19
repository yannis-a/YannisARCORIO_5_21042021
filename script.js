let response = await fetch("data.json");
console.log(response)
if (response.ok) {
  // if HTTP-status is 200-299
  // get the response body (the method explained below)
  let json = await response.json();
  alert("HTTP-success: " + json);
} else {
  alert("HTTP-Error: " + response.status);
}
