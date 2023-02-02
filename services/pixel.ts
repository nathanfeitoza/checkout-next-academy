import ReactPixel from "react-facebook-pixel";

export const Pixel = async (): Promise<typeof ReactPixel> => {
  return new Promise((resolve) => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("676029587592410", undefined, { autoConfig: true, debug: false }); // facebookPixelId
        resolve(ReactPixel);
      });
  });
};
