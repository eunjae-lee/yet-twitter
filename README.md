# Yet Twitter (옛 트위터)

Customize your Twitter experience.

이 브라우저 익스텐션으로 트위터를 정리해보세요.

- Download Link: [yet-twitter.zip](https://github.com/eunjae-lee/yet-twitter/raw/main/public/yet-twitter.zip)

https://github.com/eunjae-lee/yet-twitter/assets/499898/c20c1d24-0b80-4a1d-a51e-abf313b2455d

## Installation guide for developers

It's better to clone this repository instead of downloading the zip file, because you can get easily update the extension.

### Clone the repository

```sh
git clone git@github.com:eunjae-lee/yet-twitter.git
```

### Install the dependency

```sh
pnpm install
```

If you don't use `pnpm`, you can use `npm` or `yarn` too.

### Build the extension

```sh
pnpm run build && pnpm run pack

# or

npm run build && npm run pack
```

### Load the extension

1. Open `chrome://extensions` in your browser.
2. Turn on "Developer mode" on the top-right corner.
3. Click "Load unpacked" button.
4. Choose `<the-repository>/extension` directory.

### Update the extension

When there is an update, you can run the following commands:

```sh
git pull
pnpm install
pnpm run build
pnpm run pack
```

Open `chrome://extensions` and click the button on "Yet Twitter" extension to apply the new updates.
