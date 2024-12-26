FROM mcr.microsoft.com/playwright:v1.49.0-jammy
WORKDIR /app
COPY package.json .
COPY playwright.config.ts .
RUN npm install
RUN npx -y playwright@1.49.0 install --with-deps
COPY . .
CMD npx playwright test