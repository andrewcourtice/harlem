# Developer Experience

## TypeScript Support

Harlem is built on TypeScript which means you get a rich typing experience out-of-the-box. All of your stores state and methods are strongly typed so you have extra safety when building out your stores.

To get the best TypeScript experience with Harlem it is recommeded to enable `strict` mode in your `tsconfig.json` file (if you are able to do so):

```json
// tsconfig.json
{
    "strict": true
}
```


## Developer Tools

Harlem also comes with a [devtools plugin](/plugins/official/devtools) which allows you to view your stores, inspect & edit state, reset stores, and view events on the timeline in the Vue developer tools.

To get started make sure you have the Vue developer tools installed in your browser. The Vue devtools can be installed here:
- [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools)

Once the Vue devtools are installed, Harlem will show up as an option within them.