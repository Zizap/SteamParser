var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import playwright
var playwright = require("playwright");
//ScrapeOps API key
var API_KEY = "e7437ecc-a3fc-498f-a4ae-8c9c451e9780";
//Класс
var App = /** @class */ (function () {
    // Конструктор для инициализации полей
    function App(appId, appType, developer, publisher, supportedSystems, technologies, lastChangeNumber, lastRecordUpdate, releaseDate) {
        this.appId = appId;
        this.appType = appType;
        this.developer = developer;
        this.publisher = publisher;
        this.supportedSystems = supportedSystems;
        this.technologies = technologies;
        this.lastChangeNumber = lastChangeNumber;
        this.lastRecordUpdate = lastRecordUpdate;
        this.releaseDate = releaseDate;
    }
    return App;
}());
//function to convert regular urls to proxied ScrapeOps urls
function getScrapeOpsUrl(url) {
    var payload = {
        "api_key": API_KEY,
        "url": url
    };
    var queryString = new URLSearchParams(payload).toString();
    var proxy_url = "https://proxy.scrapeops.io/v1/?".concat(queryString);
    return proxy_url;
}
//define async function to scrape the data
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, data, app, jsonApp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright.chromium.launch({
                        headless: true,
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    //go to the site
                    return [4 /*yield*/, page.goto(getScrapeOpsUrl("https://steamdb.info/app/730/charts/"))];
                case 3:
                    //go to the site
                    _a.sent();
                    //wait 4 seconds so we can view the screen
                    return [4 /*yield*/, page.waitForTimeout(4000)];
                case 4:
                    //wait 4 seconds so we can view the screen
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                            // Здесь пишем код для извлечения нужных данных
                            var appIdData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(1) > td:nth-child(2)');
                            var appTypeData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(2) > td:nth-child(2)');
                            var developerData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(3) > td:nth-child(2) > a');
                            var publisherData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(4) > td:nth-child(2) > a');
                            var supportedSystemsData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(5) > td.os-icons');
                            var technologiesData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(6) > td:nth-child(2) > a');
                            var lastChangeNumberData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(7) > td:nth-child(2) > a');
                            var lastRecordUpdateData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(8) > td:nth-child(2)');
                            var releaseDateData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(9) > td:nth-child(2)');
                            return {
                                appId: Number((_a = appIdData === null || appIdData === void 0 ? void 0 : appIdData.innerText) !== null && _a !== void 0 ? _a : '0'),
                                appType: (_b = appTypeData === null || appTypeData === void 0 ? void 0 : appTypeData.innerText) !== null && _b !== void 0 ? _b : 'Unknown',
                                developer: [(_c = developerData === null || developerData === void 0 ? void 0 : developerData.getAttribute('href')) !== null && _c !== void 0 ? _c : '', (_d = developerData === null || developerData === void 0 ? void 0 : developerData.getAttribute('content')) !== null && _d !== void 0 ? _d : ''],
                                publisher: [(_e = publisherData === null || publisherData === void 0 ? void 0 : publisherData.getAttribute('href')) !== null && _e !== void 0 ? _e : '', (_f = publisherData === null || publisherData === void 0 ? void 0 : publisherData.getAttribute('content')) !== null && _f !== void 0 ? _f : ''],
                                supportedSystems: (_g = supportedSystemsData === null || supportedSystemsData === void 0 ? void 0 : supportedSystemsData.innerText.trim().split(' ')) !== null && _g !== void 0 ? _g : [],
                                technologies: [(_h = technologiesData === null || technologiesData === void 0 ? void 0 : technologiesData.getAttribute('href')) !== null && _h !== void 0 ? _h : '', (_j = technologiesData === null || technologiesData === void 0 ? void 0 : technologiesData.innerText) !== null && _j !== void 0 ? _j : ''],
                                lastChangeNumber: [(_k = lastChangeNumberData === null || lastChangeNumberData === void 0 ? void 0 : lastChangeNumberData.getAttribute('href')) !== null && _k !== void 0 ? _k : '', Number((_l = lastChangeNumberData === null || lastChangeNumberData === void 0 ? void 0 : lastChangeNumberData.innerText) !== null && _l !== void 0 ? _l : '0')],
                                lastRecordUpdate: (_m = lastRecordUpdateData === null || lastRecordUpdateData === void 0 ? void 0 : lastRecordUpdateData.innerText) !== null && _m !== void 0 ? _m : 'Unknown',
                                releaseDate: (_o = releaseDateData === null || releaseDateData === void 0 ? void 0 : releaseDateData.innerText) !== null && _o !== void 0 ? _o : 'Unknown'
                            };
                        })];
                case 5:
                    data = _a.sent();
                    app = new App(data.appId, data.appType, data.developer, data.publisher, data.supportedSystems, data.technologies, data.lastChangeNumber, data.lastRecordUpdate, data.releaseDate);
                    jsonApp = JSON.stringify(app);
                    console.log(jsonApp);
                    //close the browser
                    return [4 /*yield*/, browser.close()];
                case 6:
                    //close the browser
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
// console.log(Array('dasd','asd','wqxZ'))
// new App(
//   Number(appIdData?.innerText ?? '0'),
//   appTypeData?.innerText ?? 'Unknown',
//   [developerData?.getAttribute('href') ?? '', developerData?.getAttribute('content') ?? ''],
//   [publisherData?.getAttribute('href') ?? '', publisherData?.getAttribute('content') ?? ''],
//   supportedSystemsData?.innerText.trim().split(' ') ?? [],
//   [technologiesData?.getAttribute('href') ?? '', technologiesData?.innerText ?? ''],
//   [lastChangeNumberData?.getAttribute('href') ?? '', Number(lastChangeNumberData?.innerText ?? '0') ],
//   lastRecordUpdateData?.innerText ?? 'Unknown',
//   releaseDateData?.innerText ?? 'Unknown'
// );
