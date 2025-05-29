# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.17.0](https://github.com/BlackGlory/store-js/compare/v0.16.1...v0.17.0) (2025-05-29)


### ⚠ BREAKING CHANGES

* - Replaced `timeout: number` with `signal: AbortSignal`
- The module requires Store@^0.6.2
* Node.js v16 => Node.js v22

### Features

* replace `timeout: number` with `signal: AbortSignal` ([5f13657](https://github.com/BlackGlory/store-js/commit/5f136575a6e7bd4126feffd5bd35860883a4d2cf))


* upgrade dependencies ([10d1138](https://github.com/BlackGlory/store-js/commit/10d11388871f8f42905d9274a1eb638b63b4e816))

### [0.16.1](https://github.com/BlackGlory/store-js/compare/v0.16.0...v0.16.1) (2023-06-11)


### Bug Fixes

* export src ([a70beba](https://github.com/BlackGlory/store-js/commit/a70bebab2dda3fa8fd1ae695fa84350c1532db11))

## [0.16.0](https://github.com/BlackGlory/store-js/compare/v0.15.1...v0.16.0) (2023-03-28)


### ⚠ BREAKING CHANGES

* It requires Store^0.6.0

### Features

* upgrade to Store^0.6.0 ([63372f0](https://github.com/BlackGlory/store-js/commit/63372f0f4508d173bfd877dd5076428ea273f9d4))

### [0.15.1](https://github.com/BlackGlory/store-js/compare/v0.15.0...v0.15.1) (2023-03-11)

## [0.15.0](https://github.com/BlackGlory/store-js/compare/v0.14.1...v0.15.0) (2023-02-08)


### ⚠ BREAKING CHANGES

* It requires Store^0.5.0

### Features

* upgrade to Store^0.5.0 ([500c446](https://github.com/BlackGlory/store-js/commit/500c446ee1a3c1d7481e5c8fdc844e9851ad2649))

### [0.14.1](https://github.com/BlackGlory/store-js/compare/v0.14.0...v0.14.1) (2023-01-30)


### Bug Fixes

* build ([f1cdd98](https://github.com/BlackGlory/store-js/commit/f1cdd980cbbac6157e65ac297c25c41eefc38600))

## [0.14.0](https://github.com/BlackGlory/store-js/compare/v0.13.0...v0.14.0) (2023-01-30)


### ⚠ BREAKING CHANGES

* - CommonJS => ESM.
- The minimal version of Node.js is 16.
- It requires Store^0.4.0.

### Features

* upgrade ([8d5d421](https://github.com/BlackGlory/store-js/commit/8d5d42136534f244e00b1abf64eab7b72e5b8ef9))

## [0.13.0](https://github.com/BlackGlory/store-js/compare/v0.12.2...v0.13.0) (2022-11-13)


### ⚠ BREAKING CHANGES

* Removed `StoreClient.getCSV` because it is impractical

* remove `getCSV` ([d46a49d](https://github.com/BlackGlory/store-js/commit/d46a49d5ef363c5bda342799de9a8149c8c8a4a7))

### [0.12.2](https://github.com/BlackGlory/store-js/compare/v0.12.1...v0.12.2) (2022-10-31)

### [0.12.1](https://github.com/BlackGlory/store-js/compare/v0.12.0...v0.12.1) (2022-10-23)


### Bug Fixes

* replace `pathname` with `appendPathname` ([613c891](https://github.com/BlackGlory/store-js/commit/613c8916b1ecf43c2921df61e4e111970d3ab639))

## [0.12.0](https://github.com/BlackGlory/store-js/compare/v0.11.6...v0.12.0) (2022-10-21)


### ⚠ BREAKING CHANGES

* Removed `HTTPClientError`, `HTTPError`, `AbortError`

* remove `HTTPClientError`, `HTTPError`, `AbortError` ([2ec916a](https://github.com/BlackGlory/store-js/commit/2ec916aaf7da980d00f83821bb4f574623851973))

### [0.11.6](https://github.com/BlackGlory/store-js/compare/v0.11.5...v0.11.6) (2022-09-30)

### [0.11.5](https://github.com/BlackGlory/store-js/compare/v0.11.4...v0.11.5) (2022-09-30)


### Bug Fixes

* keepalive ([bdf4689](https://github.com/BlackGlory/store-js/commit/bdf4689ee16993eb19431e0a5b3f7da29c81b5e6))

### [0.11.4](https://github.com/BlackGlory/store-js/compare/v0.11.3...v0.11.4) (2022-09-30)

### [0.11.3](https://github.com/BlackGlory/store-js/compare/v0.11.2...v0.11.3) (2022-08-01)

### [0.11.2](https://github.com/BlackGlory/store-js/compare/v0.11.1...v0.11.2) (2022-03-19)

### [0.11.1](https://github.com/BlackGlory/store-js/compare/v0.11.0...v0.11.1) (2022-02-10)


### Features

* add Accept-Version to StoreClient ([badb6fd](https://github.com/BlackGlory/store-js/commit/badb6fd91731d1e09c297cf864280f9f9a82d273))

## [0.11.0](https://github.com/BlackGlory/store-js/compare/v0.10.1...v0.11.0) (2022-01-17)


### ⚠ BREAKING CHANGES

* requires Store 0.3.6

### Features

* add Accept-Version headers ([923db88](https://github.com/BlackGlory/store-js/commit/923db88ae2c848a97571adf176834d46035b0d89))

### [0.10.1](https://github.com/BlackGlory/store-js/compare/v0.10.0...v0.10.1) (2021-12-17)

## [0.10.0](https://github.com/BlackGlory/store-js/compare/v0.9.5...v0.10.0) (2021-12-16)


### ⚠ BREAKING CHANGES

* - The minimum version is Node.js v16

* update dependencies ([ef6762b](https://github.com/BlackGlory/store-js/commit/ef6762b3229dcf54c6dbee670bdf59dd0ee237b9))

### [0.9.5](https://github.com/BlackGlory/store-js/compare/v0.9.4...v0.9.5) (2021-10-14)

### [0.9.4](https://github.com/BlackGlory/store-js/compare/v0.9.3...v0.9.4) (2021-10-06)


### Features

* export AbortError ([4fb707d](https://github.com/BlackGlory/store-js/commit/4fb707d0c644b7c098d680fe44433382afe0037f))

### [0.9.3](https://github.com/BlackGlory/store-js/compare/v0.9.2...v0.9.3) (2021-09-18)


### Bug Fixes

* extra-request ([dc61e82](https://github.com/BlackGlory/store-js/commit/dc61e82cee693018030e1033b7f78716bbd61e02))

### [0.9.2](https://github.com/BlackGlory/store-js/compare/v0.9.1...v0.9.2) (2021-09-16)

### [0.9.1](https://github.com/BlackGlory/store-js/compare/v0.9.0...v0.9.1) (2021-09-15)


### Features

* add keepalive, timeout ([e464d0f](https://github.com/BlackGlory/store-js/commit/e464d0f3b90a4e69f1a5808cfd3804fa7ea9a5b6))

## [0.9.0](https://github.com/BlackGlory/store-js/compare/v0.8.3...v0.9.0) (2021-07-04)


### ⚠ BREAKING CHANGES

* rewrite all `get` methods

### Features

* rewrite all `get` methods ([06ea124](https://github.com/BlackGlory/store-js/commit/06ea124644b1a71c9694118c3598cfe43661637b))

### [0.8.3](https://github.com/BlackGlory/store-js/compare/v0.8.2...v0.8.3) (2021-07-03)

### [0.8.2](https://github.com/BlackGlory/store-js/compare/v0.8.1...v0.8.2) (2021-04-30)


### Features

* add tryGet, tryGetJSON, tryGetCSV ([033da82](https://github.com/BlackGlory/store-js/commit/033da82a8a2833e3356a4560623fe0a6ce517fd4))
* export NotFound ([23f568d](https://github.com/BlackGlory/store-js/commit/23f568ddc00b43a6343e7a4a55d63291050a12b2))

### [0.8.1](https://github.com/BlackGlory/store-js/compare/v0.8.0...v0.8.1) (2021-04-30)

## [0.8.0](https://github.com/BlackGlory/store-js/compare/v0.7.4...v0.8.0) (2021-04-28)


### ⚠ BREAKING CHANGES

* rename

* rename ([b74e883](https://github.com/BlackGlory/store-js/commit/b74e883885b2c4469b77871536c7e55d27e681d9))

### [0.7.4](https://github.com/BlackGlory/store-js/compare/v0.7.3...v0.7.4) (2021-03-20)


### Bug Fixes

* use Headers from extra-fetch ([5f3c8cf](https://github.com/BlackGlory/store-js/commit/5f3c8cf454ba3aa47d1122f0a1e708e0c67d5de1))

### [0.7.3](https://github.com/BlackGlory/store-js/compare/v0.7.2...v0.7.3) (2021-03-19)

### [0.7.2](https://github.com/BlackGlory/store-js/compare/v0.7.1...v0.7.2) (2021-03-17)

### [0.7.1](https://github.com/BlackGlory/store-js/compare/v0.7.0...v0.7.1) (2021-03-17)

## [0.7.0](https://github.com/BlackGlory/store-js/compare/v0.6.9...v0.7.0) (2021-03-14)


### ⚠ BREAKING CHANGES

* rename /api to /admin

### Features

* rename /api to /admin ([b76b5f8](https://github.com/BlackGlory/store-js/commit/b76b5f8ba6d65aaefe812db4f2f721fc0261a476))

### [0.6.9](https://github.com/BlackGlory/store-js/compare/v0.6.8...v0.6.9) (2021-03-10)


### Features

* add keepalive option ([51c2541](https://github.com/BlackGlory/store-js/commit/51c25410d2be5281657893975d1042f242702edd))

### [0.6.8](https://github.com/BlackGlory/store-js/compare/v0.6.7...v0.6.8) (2021-03-05)

### [0.6.7](https://github.com/BlackGlory/store-js/compare/v0.6.6...v0.6.7) (2021-03-04)

### [0.6.6](https://github.com/BlackGlory/store-js/compare/v0.6.5...v0.6.6) (2021-03-04)


### Features

* export HTTPClientError ([b2578dd](https://github.com/BlackGlory/store-js/commit/b2578dd60366478d34b447092ce026a5cd7decc3))

### [0.6.5](https://github.com/BlackGlory/store-js/compare/v0.6.4...v0.6.5) (2021-02-28)

### [0.6.4](https://github.com/BlackGlory/store-js/compare/v0.6.3...v0.6.4) (2021-02-25)

### [0.6.3](https://github.com/BlackGlory/store-js/compare/v0.6.2...v0.6.3) (2021-02-14)

### [0.6.2](https://github.com/BlackGlory/store-js/compare/v0.6.1...v0.6.2) (2021-02-03)

### [0.6.1](https://github.com/BlackGlory/store-js/compare/v0.6.0...v0.6.1) (2021-02-03)

## [0.6.0](https://github.com/BlackGlory/store-js/compare/v0.5.4...v0.6.0) (2021-01-29)


### ⚠ BREAKING CHANGES

* StoreClient#listStores => getAllStoreIds
* StoreClient#listItems => getAllItemIds

### Features

* rename listItems => getAllItemIds ([fe3ee0a](https://github.com/BlackGlory/store-js/commit/fe3ee0a4a3d4cac08baec47c5f237f77a68ba006))
* rename listStores => getAllStoreIds ([689b2b0](https://github.com/BlackGlory/store-js/commit/689b2b02d78be7e2b9d0e40b74699e8306f892d4))

### [0.5.4](https://github.com/BlackGlory/store-js/compare/v0.5.3...v0.5.4) (2021-01-26)

### [0.5.3](https://github.com/BlackGlory/store-js/compare/v0.5.2...v0.5.3) (2021-01-21)


### Features

* support basic auth in StoreClient ([aae59eb](https://github.com/BlackGlory/store-js/commit/aae59eb8330511c8ee7b929929a1ed00090a1d7f))

### [0.5.2](https://github.com/BlackGlory/store-js/compare/v0.5.1...v0.5.2) (2021-01-20)

### [0.5.1](https://github.com/BlackGlory/store-js/compare/v0.5.0...v0.5.1) (2021-01-17)

## [0.5.0](https://github.com/BlackGlory/store-js/compare/v0.4.11...v0.5.0) (2021-01-15)


### ⚠ BREAKING CHANGES

* doc => payload
rev => revision

### Features

* rename doc to payload, rev to revision ([031a64b](https://github.com/BlackGlory/store-js/commit/031a64b260b6a27f616aa138615d65ab16d2005e))

### [0.4.11](https://github.com/BlackGlory/store-js/compare/v0.4.10...v0.4.11) (2021-01-15)

### [0.4.10](https://github.com/BlackGlory/store-js/compare/v0.4.9...v0.4.10) (2021-01-15)


### Bug Fixes

* esm bundle ([f5d16f3](https://github.com/BlackGlory/store-js/commit/f5d16f3126c0476fd5e52576424c114da1d2fc12))

### [0.4.9](https://github.com/BlackGlory/store-js/compare/v0.4.8...v0.4.9) (2021-01-14)


### Bug Fixes

* rollup cannot resolve papaparse browser field ([6074311](https://github.com/BlackGlory/store-js/commit/607431118e670169dfcb703784d5fc883fe3d9f0))

### [0.4.8](https://github.com/BlackGlory/store-js/compare/v0.4.7...v0.4.8) (2021-01-14)


### Features

* add StoreClient#setCSV, StoreClient#getCSV ([fe28ac5](https://github.com/BlackGlory/store-js/commit/fe28ac5c5c1ec4d0a6fe291eb519bac20885f54b))

### [0.4.7](https://github.com/BlackGlory/store-js/compare/v0.4.6...v0.4.7) (2021-01-08)

### [0.4.6](https://github.com/BlackGlory/store-js/compare/v0.4.5...v0.4.6) (2021-01-04)

### [0.4.5](https://github.com/BlackGlory/store-js/compare/v0.4.4...v0.4.5) (2021-01-04)


### Bug Fixes

* bundle for browser ([f5b2531](https://github.com/BlackGlory/store-js/commit/f5b253138d23cb27829f569c62f67d75dd01c708))

### [0.4.4](https://github.com/BlackGlory/store-js/compare/v0.4.3...v0.4.4) (2021-01-04)

### [0.4.3](https://github.com/BlackGlory/store-js/compare/v0.4.2...v0.4.3) (2021-01-04)

### [0.4.2](https://github.com/BlackGlory/store-js/compare/v0.4.1...v0.4.2) (2021-01-03)


### Features

* hide StoreClient#_get ([1d996f3](https://github.com/BlackGlory/store-js/commit/1d996f3a8159ccf8f94a28a1d6f7762a62881922))

### [0.4.1](https://github.com/BlackGlory/store-js/compare/v0.4.0...v0.4.1) (2021-01-03)


### Bug Fixes

* set, setJSON ([667b755](https://github.com/BlackGlory/store-js/commit/667b7558b28e94b40e08a49367d2426f9ecc8c2a))

## [0.4.0](https://github.com/BlackGlory/store-js/compare/v0.3.7...v0.4.0) (2020-12-31)


### ⚠ BREAKING CHANGES

* remove info

### Features

* add clear, listStores, listItems, stats; remove info ([85518f0](https://github.com/BlackGlory/store-js/commit/85518f0ee8d07850380e9c980b8bdd35cb299486))

### [0.3.7](https://github.com/BlackGlory/store-js/compare/v0.3.6...v0.3.7) (2020-12-30)

### [0.3.6](https://github.com/BlackGlory/store-js/compare/v0.3.5...v0.3.6) (2020-12-30)

### [0.3.5](https://github.com/BlackGlory/store-js/compare/v0.3.4...v0.3.5) (2020-12-30)

### [0.3.4](https://github.com/BlackGlory/store-js/compare/v0.3.3...v0.3.4) (2020-12-22)

### [0.3.3](https://github.com/BlackGlory/store-js/compare/v0.3.2...v0.3.3) (2020-12-21)


### Features

* add RequestOptions ([627ce8f](https://github.com/BlackGlory/store-js/commit/627ce8fb86d29f1d6c1ef84727633cab82e6c942))

### [0.3.2](https://github.com/BlackGlory/store-js/compare/v0.3.1...v0.3.2) (2020-12-20)


### Features

* add StoreClient#info ([6747853](https://github.com/BlackGlory/store-js/commit/6747853764ac50d433df60dd49cfc6ed5c2ae99c))

### [0.3.1](https://github.com/BlackGlory/store-js/compare/v0.3.0...v0.3.1) (2020-12-20)

## [0.3.0](https://github.com/BlackGlory/store-js/compare/v0.2.2...v0.3.0) (2020-12-09)


### ⚠ BREAKING CHANGES

* get => getJSON
set => setJSON

### Features

* add getJSON, setJSON ([cb20a86](https://github.com/BlackGlory/store-js/commit/cb20a867509c9c2d952d64e626951e30fce088cf))

### [0.2.2](https://github.com/BlackGlory/store-js/compare/v0.2.1...v0.2.2) (2020-12-08)

### [0.2.1](https://github.com/BlackGlory/store-js/compare/v0.2.0...v0.2.1) (2020-12-06)

## [0.2.0](https://github.com/BlackGlory/store-js/compare/v0.1.2...v0.2.0) (2020-12-05)


### ⚠ BREAKING CHANGES

* remove => del

* rename remove to del ([a1c2e13](https://github.com/BlackGlory/store-js/commit/a1c2e13780f43f59bb1876c46b525001815a54b4))

### [0.1.2](https://github.com/BlackGlory/store-js/compare/v0.1.1...v0.1.2) (2020-12-05)


### Bug Fixes

* umd name ([5aed624](https://github.com/BlackGlory/store-js/commit/5aed624591f384f248b133d3dff5789aabc30624))

### [0.1.1](https://github.com/BlackGlory/store-js/compare/v0.1.0...v0.1.1) (2020-12-04)

## 0.1.0 (2020-12-03)


### Features

* init ([a21e2cc](https://github.com/BlackGlory/store-js/commit/a21e2cca3bea79d387782ca2543f9991f63917ba))
