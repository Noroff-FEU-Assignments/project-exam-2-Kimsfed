export const API_URL = "https://strapi-deploy-project-2021.herokuapp.com";

/**
 * given an image return Url
 * @param {any} image
 *
 */

export const imageUrl = (image) => {
  if (!image) {
    return "/vercel.svg";
  }
  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }

  return image;
};
