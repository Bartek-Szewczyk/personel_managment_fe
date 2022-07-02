const getToken = async () => {
  const token = await JSON.parse(localStorage.getItem("user")).token;
  return token;
};

export const getHeader = async () => {
  const token = await getToken();
  const conf = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return conf;
};
