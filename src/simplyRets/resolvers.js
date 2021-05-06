const getProperties = async (_, __, { dataSources }) => {
  return await dataSources.simplyRetsAPI.getPropertiesByCity();
};

module.exports = {
  getProperties,
};
