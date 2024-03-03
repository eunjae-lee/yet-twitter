export const injectDefaultCSS = () => {
  const css = `
  .yet-twitter-hidden-tweet {
    display: none;
  }

  .yet-twitter-mute-btn {
    position: absolute;
    right: -2.25rem;

    background: none;
    border: none;
    margin: 0;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 99999px;
    cursor: pointer;
  }
  .yet-twitter-mute-btn:hover {
    background: #0f171f;
  }
  .yet-twitter-mute-btn svg {
    opacity: 0.3;
  }
  .yet-twitter-mute-btn:hover svg {
    opacity: 1;
    color: #4a99e9;
  }

  .yet-twitter-block-btn-wrapper {
    padding: 1rem 1rem;
    display: flex;
    justify-content: end;
  }
  .yet-twitter-block-btn {
    background-color: rgb(239, 243, 244, 0);
    border-radius: 9999px;
    border-width: 0;
    color: rgb(239, 243, 244);
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    opacity: 0.5;
  }
  .yet-twitter-block-btn:hover {
    background-color: rgb(239, 243, 244, 0.1);
    opacity: 1;
  }
  `
  injectCSS(css)
}

export const injectCSS = (css: string) => {
  const style = document.createElement('style')

  // @ts-ignore
  if (style.styleSheet) {
    // @ts-ignore
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  document.getElementsByTagName('head')[0].appendChild(style)
}
