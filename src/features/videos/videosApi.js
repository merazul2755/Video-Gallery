import axios from "../../utils/axios";

export const getVideos = async ({ tags, search, author }) => {
  let queryString = "";
  if (tags) {
    queryString += tags?.map((tag) => `tags_like=${tag}`).join("&");
  }
  if (search !== "") {
    queryString += `&q=${search}`;
  }
  if (author !== "") {
    queryString += `&author_like=${author}`;
  }

  const response = await axios.get(`/videos/?${queryString}`);

  return response.data;
};
