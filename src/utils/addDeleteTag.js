export const addTag = (tags, tag, setTags) => {
  setTags([...tags, { name: tag, id: `${tag}${Math.random()}` }]);
};

export const deleteTag = (tags, tagId, setTags) => {
  const copyTags = tags.filter((tag) => tag.id !== tagId);
  setTags(copyTags);
};
