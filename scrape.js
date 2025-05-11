const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

// url Scraping proxy nya ganti aja kalo udah pada mati
const proxyUrls = [
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
'https://raw.githubusercontent.com/yemixzy/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/mheidari98/.proxy/main/all',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/yemixzy/proxy-list/main/proxies/unchecked.txt',
'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/https.txt',
'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/proxylist.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/refs/heads/master/http.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/refs/heads/master/https.txt',
'https://raw.githubusercontent.com/dpangestuw/Free-Proxy/refs/heads/main/http_proxies.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/Fathir95/Fathir95/refs/heads/main/proxy.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/http.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/http.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/all.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/all.txt', 
'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/https.txt',
'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/http.txt',
'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/all.txt',
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/http_proxies.txt',
'https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/proxy.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/free.txt',
'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/cnfree.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/http.txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/all.txt',
'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/http.txt',
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/RAW.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/old-data/Proxies.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/https.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/http.txt',
'https://raw.githubusercontent.com/mython-dev/free-proxy-4000/main/proxy-4000.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
'https://raw.githubusercontent.com/MrMarble/proxy-list/main/all.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt', 
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
'https://raw.githubusercontent.com/miyukii-chan/proxy-list/master/proxies/http.txt',
'https://raw.githubusercontent.com/mishakorzik/Free-Proxy/main/proxy.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
'https://raw.githubusercontent.com/j0rd1s3rr4n0/api/main/proxy/http.txt',
'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/https.txt',
'https://raw.githubusercontent.com/ItzRazvyy/ProxyList/main/http.txt',
'https://raw.githubusercontent.com/im-razvan/proxy_list/main/http.txt',
'https://raw.githubusercontent.com/hendrikbgr/Free-Proxy-Repo/master/proxy_list.txt',
'https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list',
'https://raw.githubusercontent.com/fahimscirex/proxybd/master/proxylist/http.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
'https://raw.githubusercontent.com/enseitankado/proxine/main/proxy/https.txt',
'https://raw.githubusercontent.com/enseitankado/proxine/main/proxy/http.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/mix_checked.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/http/global/http_checked.txt',
'https://raw.githubusercontent.com/crackmag/proxylist/proxy/proxy.list',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/https',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/http.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/all.txt',
'https://raw.githubusercontent.com/BlackCage/Proxy-Scraper-and-Verifier/main/Proxies/Not_Processed/proxies.txt',
'https://raw.githubusercontent.com/berkay-digital/Proxy-Scraper/main/proxies.txt',
'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/HTTP.txt',
'https://raw.githubusercontent.com/aslisk/proxyhttps/main/https.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt', 
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
'https://raw.githubusercontent.com/andigwandi/free-proxy/main/proxy_list.txt',
'https://raw.githubusercontent.com/almroot/proxylist/master/list.txt',
'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
'https://raw.githubusercontent.com/a2u/free-proxy-list/master/free-proxy-list.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
];

async function scrapeProxy() {
  const allProxies = new Set();
  const total = proxyUrls.length;

  const fetches = proxyUrls.map(async (url, index) => {
    try {
      console.log(`[#${index + 1}/${total}] Mengambil dari: ${url}`);
      const res = await axios.get(url, { timeout: 15000 });
      const lines = res.data.split('\n').map(l => l.trim()).filter(l => l && l.includes(':'));
      lines.forEach(proxy => allProxies.add(proxy));
    } catch (err) {
      console.warn(`[Gagal] ${url} - ${err.message}`);
    }
  });

  await Promise.all(fetches);

  const proxyList = Array.from(allProxies).join('\n');
  await writeFile('proxy.txt', proxyList);
  console.log(`\n[Done] Total proxy unik: ${allProxies.size}`);
}

  scrapeProxy()
