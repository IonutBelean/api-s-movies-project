import fetch from "node-fetch";

const extractNameFromURI = (uri) => {
  if (!uri) return null;
  const parts = uri.split("/");
  return parts[parts.length - 1].replace(/_/g, " ");
};

export const handler = async (event) => {
  const headers = { "Content-Type": "application/json" };

  try {
    // Daca e GET, returnam mesaj clar
    if (event.httpMethod === "GET") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message:
            "This endpoint only works with POST requests containing JSON { title: 'Movie Title' }",
        }),
      };
    }

    // Acceptam doar POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    // Procesam POST
    const { title } = JSON.parse(event.body);
    if (!title) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "No title provided" }),
      };
    }

    const sparqlQuery = `
      PREFIX dbo: <http://dbpedia.org/ontology/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT ?film ?label ?abstract ?director ?starring ?producer ?writer ?releaseDate ?runtime ?budget ?gross ?language ?country ?genre WHERE {
        ?film a dbo:Film .
        ?film rdfs:label ?label .
        FILTER (lang(?label) = "en") .
        FILTER (CONTAINS(LCASE(?label), LCASE("${title}"))) .

        OPTIONAL { ?film dbo:abstract ?abstract . FILTER(lang(?abstract)='en') }
        OPTIONAL { ?film dbo:director ?director }
        OPTIONAL { ?film dbo:starring ?starring }
        OPTIONAL { ?film dbo:producer ?producer }
        OPTIONAL { ?film dbo:writer ?writer }
        OPTIONAL { ?film dbo:releaseDate ?releaseDate }
        OPTIONAL { ?film dbo:runtime ?runtime }
        OPTIONAL { ?film dbo:budget ?budget }
        OPTIONAL { ?film dbo:gross ?gross }
        OPTIONAL { ?film dbo:language ?language }
        OPTIONAL { ?film dbo:country ?country }
        OPTIONAL { ?film dbo:genre ?genre }
      }
      LIMIT 1
    `;

    const endpoint = "https://dbpedia.org/sparql";
    const url =
      endpoint + "?query=" + encodeURIComponent(sparqlQuery) + "&format=json";

    const res = await fetch(url);
    const data = await res.json();
    const bindings = data.results.bindings[0];

    if (!bindings) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: "Film not found in DBpedia" }),
      };
    }

    const mapURI = (value) =>
      value ? { name: extractNameFromURI(value), uri: value } : null;

    const result = {
      uri: bindings.film?.value || null,
      title: bindings.label?.value || null,
      abstract: bindings.abstract?.value || null,
      director: mapURI(bindings.director?.value),
      starring: mapURI(bindings.starring?.value),
      producer: mapURI(bindings.producer?.value),
      writer: mapURI(bindings.writer?.value),
      releaseDate: bindings.releaseDate?.value || null,
      runtime: bindings.runtime?.value || null,
      budget: bindings.budget?.value || null,
      gross: bindings.gross?.value || null,
      language: bindings.language?.value || null,
      country: bindings.country?.value || null,
      genre: mapURI(bindings.genre?.value),
    };

    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
