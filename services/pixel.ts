import ReactPixel from "react-facebook-pixel";

const PixelWithScript = {
  track: (title: string, data?: any) => (window as any).fbq('track', title, data),
  trackCustom: (event: string, data?: any) => (window as any).fbq('trackCustom', event, data),
  pageView: () => (window as any).fbq("track", "PageView"),
}

export const Pixel = async (): Promise<typeof ReactPixel | typeof PixelWithScript> => {
  const haveFbq = (window as any).fbq;

  if (haveFbq) {
    return PixelWithScript;
  }

  return new Promise((resolve) => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("676029587592410", undefined, { autoConfig: true, debug: false }); // facebookPixelId
        resolve(ReactPixel);
      });
  });
};
