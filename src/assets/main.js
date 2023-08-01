
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCtkvPAcd2ltWlX0JA9sm1Yg&part=snippet%2Cid&order=viewCount&maxResults=9';

const YT = 'https://www.youtube.com/watch?v=';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c2def27411mshbad6c0dc48500e2p124e57jsn7e6db93d67ff',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData (urlApi) {
  try {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items.map(video => `
      <div style="background-color: #f7f7f7; border-radius: 8px;" class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:background-color-gray-900 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" style="width: 100%; height: 100%; -ms-transform: scale(1.7,1.7); -webkit-transform: scale(1.7,1.7); transform: scale(1.7,1.7)";>
        </div>
        <div style="padding: 18px 12px">
          <h3 onclick="window.open(href='${YT + video.id.videoId}', target='_blank')" class="text-sm text-gray-700 hover:text-darkslategrey hover:font-bold transition">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `).slice(0, 8).join('')}
    `;
    // let view = `
    // ${videos.items.map(video => `
    //   <div class="group relative">
    //     <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
    //         <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
    //       </div>
    //       <div class="mt-4 flex justify-between">
    //         <h3 class="text-sm text-gray-700">
    //             <span aria-hidden="true" class="absolute inset-0"></span>
    //             ${video.snippet.title}
    //         </h3>
    //       </div>
    //   </div>
    // `).slice(0,4).join('')}
    // `;
    content.innerHTML = view;

  } catch (error) {
    console.error(error);
  }
})();