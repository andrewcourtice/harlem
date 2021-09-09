# [2.0.0-beta.0](https://github.com/andrewcourtice/harlem/compare/v2.0.0-alpha.0...v2.0.0-beta.0) (2021-08-11)


### Bug Fixes

* **action:** fixed action abort error type ([176b41e](https://github.com/andrewcourtice/harlem/commit/176b41e60409fc0bfdb6fa8d77ac047878ce203d))
* **actions:** use provided payload for action body ([8dfd68e](https://github.com/andrewcourtice/harlem/commit/8dfd68e7ff3a2c568bbcf4817f6cc878374dd8be))
* **app:** fixed font references ([ca345e6](https://github.com/andrewcourtice/harlem/commit/ca345e6e939e4d63937e3d75a0528c13ee274a33))
* **app:** fixed modal attrs ([de61226](https://github.com/andrewcourtice/harlem/commit/de61226743adf0bc60c4c3aee7bd2091d6372b49))
* fixed vue package version baseline ([5f5a29c](https://github.com/andrewcourtice/harlem/commit/5f5a29cfecd313da724da4f5c508a4b271418b13))
* **history:** fixed command order for undo ([c08415c](https://github.com/andrewcourtice/harlem/commit/c08415c4a3711fe51e4a6f9feaff2a4f03ff812a))


### Features

* **app:** added storage sync ([092ecc8](https://github.com/andrewcourtice/harlem/commit/092ecc86e11400bd42d69698e07f67015a9f9dac))
* **app:** added theme ([84e6f64](https://github.com/andrewcourtice/harlem/commit/84e6f6464e0c10907c4ace8f5846a78537bfd142))
* **app:** updated demo app ([124c317](https://github.com/andrewcourtice/harlem/commit/124c317eb60c914440ff41255e5ea85cd2bc4e15))
* **storage:** added exclude option and clearStorage ([77ad7c0](https://github.com/andrewcourtice/harlem/commit/77ad7c06a0236559395eda618e57a2b1bae2a629))



# [2.0.0-alpha.0](https://github.com/andrewcourtice/harlem/compare/v1.3.2...v2.0.0-alpha.0) (2021-08-07)


### Bug Fixes

* **core:** fixed typings ([e8bcd49](https://github.com/andrewcourtice/harlem/commit/e8bcd4925da66454acdd1179a4cf94fce6943a1a))
* **devtools:** fixed event hook ([8796aef](https://github.com/andrewcourtice/harlem/commit/8796aefa70c30d71ab2592cb36c4a2d7d5b2c06d))
* **extensions:** fixed actions extension test failing ([81fe605](https://github.com/andrewcourtice/harlem/commit/81fe6056132047d55e382a2ff9e49c90f6cf4e0a))
* **extensions:** fixed transaction extension ([a4bc9a5](https://github.com/andrewcourtice/harlem/commit/a4bc9a570fff0eee82865c3784828737c5640e8a))
* **extensions:** fixed type exports ([2b02242](https://github.com/andrewcourtice/harlem/commit/2b02242039577ad37e644992ba364418ca1f1dc3))
* **extensions:** fixed typing on actions extension ([58f2db2](https://github.com/andrewcourtice/harlem/commit/58f2db2166a720337d05a75c70bb3b1b3f080016))
* **storage:** fixed event hook name ([2b6e892](https://github.com/andrewcourtice/harlem/commit/2b6e892d9614dd1cfe435bd7d24382ee480839c1))


### Features

* **app:** further work on demo app ([45665ab](https://github.com/andrewcourtice/harlem/commit/45665ab02fd2bba486abd0f84a8299ff7f82f7a6))
* **app:** many little improvements to demo ([5e8c7d4](https://github.com/andrewcourtice/harlem/commit/5e8c7d46c2d87920a618d66fef807b472e02ea41))
* **app:** started updating the demo app ([17c742e](https://github.com/andrewcourtice/harlem/commit/17c742e2a55e6aeff60d0e1494798fcba0f37dcc))
* **core:** added circular reference detection for mutations ([7719b62](https://github.com/andrewcourtice/harlem/commit/7719b62471484b34dc9e2271f54611528e811b3a))
* **core:** added effect scope to store ([9902107](https://github.com/andrewcourtice/harlem/commit/9902107116dd29031b89d3b7d0c58d924e49fdf4))
* **core:** added event to signal devtools update ([2dff71f](https://github.com/andrewcourtice/harlem/commit/2dff71f7d33ab2415e55b2afcea9b57f50f0b186))
* **core:** added provider api ([202025c](https://github.com/andrewcourtice/harlem/commit/202025c73b9d31e070c3ad5a2e4c7a78697a6675))
* **extensions:** added cancellation to actions ([c9da2f1](https://github.com/andrewcourtice/harlem/commit/c9da2f1693b2f4de06d248dff3e8c4934f3f000e))
* **extensions:** added devtools update to lazy extension ([2fb22d1](https://github.com/andrewcourtice/harlem/commit/2fb22d1615f434ed645f68de7ec8cf481e1e9ef0))
* **extensions:** added trace extension ([2835c45](https://github.com/andrewcourtice/harlem/commit/2835c4581faa023f4c38b3e8e4414452d9131132))
* **extensions:** started action extension ([9874a8a](https://github.com/andrewcourtice/harlem/commit/9874a8a45ec9c66b35939395dab61655aa4d02ea))
* **history:** added basic history extension ([1ed86cd](https://github.com/andrewcourtice/harlem/commit/1ed86cd0fc80741463f9a617b8e2b1bb3eadbad2))
* **lazy:** added registration type ([2d9cbda](https://github.com/andrewcourtice/harlem/commit/2d9cbda0ee7f3f002bbbdd0c2b567e63a2905f94))
* **plugins:** updated devtools to support new store registration format ([8413fb6](https://github.com/andrewcourtice/harlem/commit/8413fb6a922151549e59a44904df4e2650dd9a64))
* **utilities:** added task ([c586e6a](https://github.com/andrewcourtice/harlem/commit/c586e6a707f5149d89170a1e7000e8630b5fb0e8))
* **utilities:** added to and from object utils ([7989b82](https://github.com/andrewcourtice/harlem/commit/7989b82632bccc67438e1172fe37aad711350e17))
* **utilities:** added trace function ([a343a8a](https://github.com/andrewcourtice/harlem/commit/a343a8a235d9c3cf4f39b75c1cd2a81acfaa90c7))



## [1.3.2](https://github.com/andrewcourtice/harlem/compare/v1.3.1...v1.3.2) (2021-06-16)



## [1.3.1](https://github.com/andrewcourtice/harlem/compare/v1.3.0...v1.3.1) (2021-04-16)


### Features

* **core:** added support for specifying multiple mutations in triggers ([8797e7b](https://github.com/andrewcourtice/harlem/commit/8797e7ba445476308917a38b71a2b86d27f59bd2))



# [1.3.0](https://github.com/andrewcourtice/harlem/compare/v1.2.5...v1.3.0) (2021-04-16)



## [1.2.5](https://github.com/andrewcourtice/harlem/compare/v1.2.4...v1.2.5) (2021-04-15)


### Bug Fixes

* fixed type declarations not being generated ([04fc259](https://github.com/andrewcourtice/harlem/commit/04fc2594b426bb24f41954a0d6fa98966ee5b1da))



## [1.2.4](https://github.com/andrewcourtice/harlem/compare/v1.2.3...v1.2.4) (2021-04-14)


### Bug Fixes

* **docs:** temporarily disabled vite build ([9dcfc8a](https://github.com/andrewcourtice/harlem/commit/9dcfc8ad92eda0c1db7d6128a7f50507c2a30388))


### Features

* **docs:** added doc search ([e37eb28](https://github.com/andrewcourtice/harlem/commit/e37eb2800d27bbb13797e88340d9e3a72f3cd5b7))



## [1.2.3](https://github.com/andrewcourtice/harlem/compare/v1.2.2...v1.2.3) (2021-03-25)


### Bug Fixes

* **readme:** fixed broken logo links ([5449f76](https://github.com/andrewcourtice/harlem/commit/5449f7693dfa3d18e5e4892dea47ffee84f8c502))



## [1.2.2](https://github.com/andrewcourtice/harlem/compare/v1.2.1...v1.2.2) (2021-03-24)


### Bug Fixes

* **repo:** fixed webpack build errors when using mjs extensions ([6de45c7](https://github.com/andrewcourtice/harlem/commit/6de45c71d955c5b4e5c040a9c5ecee2db3c2964c))



## [1.2.1](https://github.com/andrewcourtice/harlem/compare/v1.2.0...v1.2.1) (2021-03-24)


### Bug Fixes

* **devtools:** fixed devtools main field ([335a749](https://github.com/andrewcourtice/harlem/commit/335a7492c9858816e843576d4f20539e026c2b6c))



# [1.2.0](https://github.com/andrewcourtice/harlem/compare/v1.1.3...v1.2.0) (2021-03-24)


### Bug Fixes

* **core:** fixed typing in core utilities ([7073fc1](https://github.com/andrewcourtice/harlem/commit/7073fc1e07e81febed06d4e530554897ef4f76dd))



## [1.1.3](https://github.com/andrewcourtice/harlem/compare/v1.1.2...v1.1.3) (2021-03-23)



## [1.1.2](https://github.com/andrewcourtice/harlem/compare/v1.1.1...v1.1.2) (2021-03-23)



## [1.1.1](https://github.com/andrewcourtice/harlem/compare/v1.1.0...v1.1.1) (2021-02-27)


### Bug Fixes

* **core:** fixed writestate typing and exported events constant ([fc316d6](https://github.com/andrewcourtice/harlem/commit/fc316d6302e06c2141df4ebc3398bb9e8b187436))
* **readme:** fixed broken image links ([e9bbe35](https://github.com/andrewcourtice/harlem/commit/e9bbe35c90310fbf709706822124e10bf38d2871))



# [1.1.0](https://github.com/andrewcourtice/harlem/compare/v1.0.19...v1.1.0) (2021-02-22)



## [1.0.19](https://github.com/andrewcourtice/harlem/compare/v1.0.18...v1.0.19) (2021-02-11)


### Bug Fixes

* **core:** fixed minimum vue version ([db7913d](https://github.com/andrewcourtice/harlem/commit/db7913d515dfe84c41ebf6922ccbe2590feecb6a))
* **core:** fixed mutation typing for unknown payload type ([438459a](https://github.com/andrewcourtice/harlem/commit/438459a1f20c85a1220c0a770a4439e51fff88c2))



## [1.0.18](https://github.com/andrewcourtice/harlem/compare/v1.0.17...v1.0.18) (2020-12-30)



## [1.0.17](https://github.com/andrewcourtice/harlem/compare/v1.0.16...v1.0.17) (2020-12-13)


### Bug Fixes

* **app:** fixed feature flags ([95e6612](https://github.com/andrewcourtice/harlem/commit/95e6612a1b34f8d2165302447081ac7891810821))



## [1.0.16](https://github.com/andrewcourtice/harlem/compare/v1.0.15...v1.0.16) (2020-11-04)


### Bug Fixes

* **package:** removed test before publish ([f547b56](https://github.com/andrewcourtice/harlem/commit/f547b5635121ad6030c415056ae858cdbe3cb8b1))
* **plugins:** fixed naming of default exports ([b6b0447](https://github.com/andrewcourtice/harlem/commit/b6b0447143f7f6fc73f9977df9e0ad83ace48093))



## [1.0.15](https://github.com/andrewcourtice/harlem/compare/v1.0.14...v1.0.15) (2020-11-03)


### Bug Fixes

* **app:** fixed devtools in prod ([abfb58e](https://github.com/andrewcourtice/harlem/commit/abfb58ead472028848ec7df648b9dfcfb7b3ea1d))
* **docs:** minor convention change ([a10cfbe](https://github.com/andrewcourtice/harlem/commit/a10cfbe5647a251754a0ee481854359c735c1d13))



## [1.0.14](https://github.com/andrewcourtice/harlem/compare/v1.0.13...v1.0.14) (2020-10-16)



## [1.0.13](https://github.com/andrewcourtice/harlem/compare/v1.0.12...v1.0.13) (2020-10-14)



## [1.0.12](https://github.com/andrewcourtice/harlem/compare/v1.0.11...v1.0.12) (2020-10-11)


### Bug Fixes

* **storage:** fixed description in package.json ([0a2e2be](https://github.com/andrewcourtice/harlem/commit/0a2e2be09709d588ff2973b72aeb54eefe14cd9f))



## [1.0.11](https://github.com/andrewcourtice/harlem/compare/v1.0.10...v1.0.11) (2020-10-11)


### Bug Fixes

* **core:** fixed event emitter type reference ([523c589](https://github.com/andrewcourtice/harlem/commit/523c589bbfb297fd7dc77b047885f64279ca00a7))
* **core:** fixed type fro event handler ([cdc1f9c](https://github.com/andrewcourtice/harlem/commit/cdc1f9cfa57e661f45b5eff1add44520adaab62d))
* **lock:** fixed lock file breaking tests ([d601a8a](https://github.com/andrewcourtice/harlem/commit/d601a8a809b8a048da0951c43929be518818de83))
* **plugins:** update core peer dependency for plugins ([bfd8a1a](https://github.com/andrewcourtice/harlem/commit/bfd8a1ad3456c48113d7cab7666ede1676c6a32f))
* **vercel:** added vercel config to rewrite paths for spa ([56ad2e9](https://github.com/andrewcourtice/harlem/commit/56ad2e9407d987bdcd09e23e8ea710c923a0c672))



## [1.0.10](https://github.com/andrewcourtice/harlem/compare/v1.0.9...v1.0.10) (2020-10-10)



## [1.0.9](https://github.com/andrewcourtice/harlem/compare/v1.0.8...v1.0.9) (2020-10-09)



## [1.0.8](https://github.com/andrewcourtice/harlem/compare/v1.0.7...v1.0.8) (2020-10-08)


### Bug Fixes

* **readme:** fixed formatting ([fe4cc78](https://github.com/andrewcourtice/harlem/commit/fe4cc781e790fcf81715e4e9d32583c3cb5885be))
* **vercel:** added ignore for yarn.lock ([6042010](https://github.com/andrewcourtice/harlem/commit/6042010209d4123be8aec7b370c8b42e24591b3f))



## [1.0.6](https://github.com/andrewcourtice/harlem/compare/v1.0.5...v1.0.6) (2020-10-07)



## [1.0.7](https://github.com/andrewcourtice/harlem/compare/v1.0.6...v1.0.7) (2020-10-07)



## [1.0.6](https://github.com/andrewcourtice/harlem/compare/v1.0.5...v1.0.6) (2020-10-07)


### Bug Fixes

* **devtools:** fixed spread iterator returning wrong structure ([f7e6799](https://github.com/andrewcourtice/harlem/commit/f7e679949580541cb3baae6c448987301dc5e7ef))



## [1.0.5](https://github.com/andrewcourtice/harlem/compare/v1.0.4...v1.0.5) (2020-10-07)



## [1.0.4](https://github.com/andrewcourtice/harlem/compare/v1.0.2...v1.0.4) (2020-10-07)


### Bug Fixes

* **app:** changed output to suit vercel deployment ([9a9c7cb](https://github.com/andrewcourtice/harlem/commit/9a9c7cb6e216576ec32ba6fcbb6619b0bfc8d8be))
* **app:** fixed references to packages ([72c1d26](https://github.com/andrewcourtice/harlem/commit/72c1d26cfb2d986025ad4daa33dc30c0c50cb8a6))
* **packages:** added lerna ([1466e74](https://github.com/andrewcourtice/harlem/commit/1466e742ef9e4bf47dd058fb1f51d52dceafff94))
* **packages:** fixed version references ([d323337](https://github.com/andrewcourtice/harlem/commit/d3233379ac100670bdc8f9b0087ec3b2110207b5))



## [1.0.2](https://github.com/andrewcourtice/harlem/compare/v1.0.1...v1.0.2) (2020-10-05)



## 1.0.1 (2020-10-05)



