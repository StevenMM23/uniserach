export async function getServerSideProps({ query }) {
  const { q } = query;
  const {
    data: { results },
  } = await axios.get(`https://api.nickravchenko.rocks/api/search/?q=${q}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    props: {
      results,
    },
  };
}
