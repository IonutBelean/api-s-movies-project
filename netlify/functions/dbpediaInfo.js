const fetch = require("node-fetch");

const handler = async (event) => {
  console.log("Function started");

  let title = "";
  try {
    const body = JSON.parse(event.body || "{}");
    title = body.title?.trim();

    if (!title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing title in request body" }),
      };
    }

    console.log("Received title:", title);
  } catch (parseError) {
    console.error("Error parsing body:", parseError);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const query = `
  SELECT ?abstract ?director ?starring ?releaseDate ?wikiPage
  WHERE {
    ?film a dbo:Film ;
          rdfs:label ?label ;
          dbo:abstract ?abstract .
    FILTER (lang(?label) = "en" && contains(lcase(str(?label)), "${title
      .toLowerCase()
      .replace(/"/g, '\\"')}"))
    FILTER (lang(?abstract) = "en")
    OPTIONAL { ?film dbo:director ?directorURI . ?directorURI foaf:name ?director . }
    OPTIONAL { ?film dbo:starring ?actorURI . ?actorURI foaf:name ?starring . }
    OPTIONAL { ?film dbo:releaseDate ?releaseDate . }
    OPTIONAL { ?film foaf:isPrimaryTopicOf ?wikiPage . }
  } LIMIT 1
`;

  const url = `https://dbpedia.org/sparql?query=${encodeURIComponent(
    query
  )}&format=json`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
    });

    const responseText = await response.text();
    console.log("Raw response from DBpedia:", responseText);

    // Verificăm dacă răspunsul este HTML (ex: site în mentenanță)
    if (responseText.trim().startsWith("<")) {
      return {
        statusCode: 503,
        body: JSON.stringify({
          error:
            "DBpedia endpoint is under maintenance. Please try again later.",
        }),
      };
    }

    const data = JSON.parse(responseText);
    const result = data.results?.bindings?.[0];

    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No information found for this title." }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        abstract: result.abstract?.value || "",
        director: result.director?.value || "",
        starring: result.starring?.value || "",
        releaseDate: result.releaseDate?.value || "",
        wikiPage: result.wikiPage?.value || "",
      }),
    };
  } catch (err) {
    console.error("DBpedia query failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "DBpedia query failed",
        details: err.message,
      }),
    };
  }
};

module.exports = { handler };
