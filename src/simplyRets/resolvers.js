const getProperties = async (_, args, { dataSources }) => {
  const { city } = args;

  return await dataSources.simplyRetsAPI.getPropertiesByCity(city);
};

module.exports = {
  getProperties,
};
