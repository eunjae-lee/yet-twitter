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

  .yet-twitter-chain-block-btn-wrapper,
  .yet-twitter-chain-block-banner {
    padding: 1rem;
  }

  .yet-twitter-block-custom-list-btn,
  .yet-twitter-mute-custom-list-btn,
  .yet-twitter-chain-select,
  .yet-twitter-chain-block-btn,
  .yet-twitter-chain-mute-btn,
  .yet-twitter-chain-block-banner-btn {
    border-color: rgba(0, 0, 0, 0);
    background-color: rgb(239, 243, 244);
    border-radius: 9999px;
    border-width: 0;
    color: rgb(15, 20, 25);
    font-family: "TwitterChirp";
    font-weight: bold;
    font-size: 14px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  .yet-twitter-block-custom-list-btn:hover,
  .yet-twitter-mute-custom-list-btn:hover,
  .yet-twitter-chain-select:hover,
  .yet-twitter-chain-block-btn:hover,
  .yet-twitter-chain-mute-btn:hover,
  .yet-twitter-chain-block-banner-btn:hover, {
    opacity: 0.9;
  }

  .yet-twitter-chain-select {
    text-align: center;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .block_custom_list_wrapper,
  .mute_custom_list_wrapper {
    font-family: "TwitterChirp";
    font-size: 16px;
  }

  .block_custom_list_wrapper textarea,
  .mute_custom_list_wrapper textarea {
    border-color: rgba(0, 0, 0, 0);
    background-color: rgb(239, 243, 244);
    border-radius: 8px;
    border-width: 0;
    color: rgb(15, 20, 25);
    font-family: "TwitterChirp";
    font-weight: bold;
    font-size: 14px;
    padding: 0.5rem 1rem;
  }

  .hide-discover-more,
  .hide-discover-more ~ * {
    display: none;
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
