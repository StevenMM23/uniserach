import axios from "axios";

export default async function handler(req, res) {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://owlbot.info/api/v4/dictionary/${query}`, {
      headers: {
        Authorization: `Token 43cd6183199b299dbbbf81db1378100d5760fd3d`,
      },
    });
    res.status(200).json(response.data.definitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
