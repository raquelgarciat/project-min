const getApiProjects = async () => {
  const response = await fetch(`http://http://localhost:4000/api/ingredients`);
  const dataJson = await response.json();
  console.log(dataJson);
  return dataJson;
};

const objectApi = {
  getApiProjects: getApiProjects,
};

export default objectApi;
