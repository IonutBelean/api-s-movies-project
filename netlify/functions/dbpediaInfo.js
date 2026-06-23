import fetch from "node-fetch";

const extractNameFromURI = (uri) => {
  if (!uri) return null;
  const parts = uri.split("/");
  return parts[parts.length - 1].replace(/_/g, " ");
};

const sparql = async (query) => {
  const url =
    "https://dbpedia.org/sparql?query=" +
    encodeURIComponent(query) +
    "&format=json";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
      signal: controller.signal,
    });
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
};

const formatRuntime = (val) => {
  if (!val) return null;
  const num = parseFloat(val);
  if (isNaN(num)) return null;
  const totalMinutes = num < 300 ? Math.round(num) : Math.round(num / 60);
  if (totalMinutes < 40) return null;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const formatMoney = (val) => {
  if (!val) return null;
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return null;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num.toLocaleString()}`;
};

const buildQuery = (title, year, exact) => `
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX dbp: <http://dbpedia.org/property/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT DISTINCT ?film ?label ?abstract
         ?director ?producer ?writer
         ?runtime ?budget ?gross ?releaseDate WHERE {
    VALUES ?type { dbo:Film dbo:TelevisionShow }
    ?film a ?type ;
          rdfs:label ?label .
    FILTER (lang(?label) = "en")
    ${
      exact
        ? `FILTER (LCASE(STR(?label)) = LCASE("${title}"))`
        : `FILTER (CONTAINS(LCASE(STR(?label)), LCASE("${title}")))`
    }
    ${
      year
        ? `?film dbo:releaseDate ?releaseDate .
         FILTER (CONTAINS(STR(?releaseDate), "${year}"))`
        : `OPTIONAL { ?film dbo:releaseDate ?releaseDate }
         OPTIONAL { ?film dbp:releaseDate ?releaseDate }`
    }
    OPTIONAL { ?film dbo:abstract ?abstract . FILTER(lang(?abstract)='en') }
    OPTIONAL { ?film dbo:director ?director }
    OPTIONAL { ?film dbo:producer ?producer }
    OPTIONAL { ?film dbo:writer   ?writer   }
    OPTIONAL { ?film dbo:runtime  ?runtime  }
    OPTIONAL { ?film dbo:budget   ?budget   }
    OPTIONAL { ?film dbo:gross    ?gross    }
  }
  LIMIT 1
`;

const search = async (title, year) => {
  const attempts = [
    [title, year, true],
    [title, null, true],
    [title, year, false],
    [title, null, false],
  ];

  for (const [t, y, exact] of attempts) {
    try {
      const data = await sparql(buildQuery(t, y, exact));
      const b = data.results.bindings[0];
      if (b) return b;
    } catch {
      continue;
    }
  }
  return null;
};

export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS")
    return { statusCode: 204, headers, body: "" };
  if (event.httpMethod === "GET")
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "POST only." }),
    };
  if (event.httpMethod !== "POST")
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };

  try {
    const { title, year } = JSON.parse(event.body);
    if (!title)
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "No title provided" }),
      };

    const b = await search(title, year);
    if (!b)
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: "Negăsit în DBpedia" }),
      };

    const filmURI = b.film.value;

    const multiQuery = `
      PREFIX dbo: <http://dbpedia.org/ontology/>
      PREFIX dbp: <http://dbpedia.org/property/>
      SELECT ?starring ?starringName ?genre ?genreName ?country ?language WHERE {
        OPTIONAL {
          <${filmURI}> dbo:starring ?starringURI .
          BIND(STR(?starringURI) AS ?starring)
        }
        OPTIONAL { <${filmURI}> dbp:starring ?starringName }
        OPTIONAL {
          <${filmURI}> dbo:genre ?genreURI .
          BIND(STR(?genreURI) AS ?genre)
        }
        OPTIONAL { <${filmURI}> dbp:genre ?genreName }
        OPTIONAL { <${filmURI}> dbp:country ?country }
        OPTIONAL { <${filmURI}> dbp:language ?language }
      }
    `;

    const multiData = await sparql(multiQuery);
    const rows = multiData.results.bindings;

    const collectURI = (field) => [
      ...new Map(
        rows
          .filter((r) => r[field])
          .map((r) => [
            r[field].value,
            { name: extractNameFromURI(r[field].value), uri: r[field].value },
          ]),
      ).values(),
    ];

    const collectString = (field) => [
      ...new Set(
        rows
          .filter((r) => r[field]?.value?.trim())
          .map((r) => r[field].value.trim()),
      ),
    ];

    const starring =
      collectURI("starring").length > 0
        ? collectURI("starring")
        : collectString("starringName").map((n) => ({ name: n, uri: null }));

    const genre =
      collectURI("genre").length > 0
        ? collectURI("genre")
        : collectString("genreName").map((n) => ({ name: n, uri: null }));

    const result = {
      uri: filmURI,
      title: b.label?.value || null,
      abstract: b.abstract?.value || null,
      thumbnail: null,
      director: b.director?.value
        ? { name: extractNameFromURI(b.director.value), uri: b.director.value }
        : null,
      producer: b.producer?.value
        ? { name: extractNameFromURI(b.producer.value), uri: b.producer.value }
        : null,
      writer: b.writer?.value
        ? { name: extractNameFromURI(b.writer.value), uri: b.writer.value }
        : null,
      releaseDate: b.releaseDate?.value?.split("T")[0] || null,
      runtime: formatRuntime(b.runtime?.value),
      budget: formatMoney(b.budget?.value),
      gross: formatMoney(b.gross?.value),
      starring,
      genre,
      country: collectString("country"),
      language: collectString("language"),
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
