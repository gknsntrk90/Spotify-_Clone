import { elements } from "./helpers.js";

//*ok fnksyonu ile devam ediyoruz ve ekrana gönderilen müzikleri aktarır
export const renderSearchMusic = (songs) => {
elements.list.innerHTML = "";
    // console.log(elements.list);
    //*Şarkıları foreach ile döneceğiz
    songs.forEach((song) => {
        console.log(song);
        //*div oluşturucaz her şarkı için createElemen ile
        const div = document.createElement("div");
        

        //*cart'ın yapısına dataset ekleyeceğiz clgden bakıp ismini kendimiz belirlicez
        //*pop() dizinin son elemanını alır ve içinde ki uri alıcaz
        div.dataset.url = song.hub.actions.pop().uri; 
        div.dataset.title = song.title
        //*div içinde k dataset içinde img içinde song'un içinde resmin coverart alıyoruz
        div.dataset.img = song.images.coverart;
        div.className = "card"  //*div'e bir class veriyoruz carta ulaşacağı için.

        //*index.html içinde ki figure yapısını buraya alıyoruz div.innerHTML = `` ile
        //*dinamik yapı ile devam edicez ${} gibi bu sayede şarkıların gerçek adı ve resimleri gelecek api'den
        div.innerHTML = `
        <figure>
        <img src="${song.images.coverart}" alt="">
        <div class="play">
            <i class="bi bi-play-fill" id="play-btn"></i>
        </div>
    </figure>
    <h4>${song.subtitle}</h4>
    <h4>${song.title.slice(0,15) + "..."}</h4>
`;
//*oluşturduğumuz div'i ekleme işlemi yapıyoruz appenChild ile
        elements.list.appendChild(div);
    });
    
};

//*main.js içinde ki updateTitle'ı buraya tanımlıyoruz
export const updateTitle = (message) => {
    //*element içindeki title'ın içerisik kısmını değiştireceğiz innerText ile ve yeni tanımladığımız messagı vericez
    elements.title.innerText = message;
}

//*Popüler müzikleri ekrana yazdırır
//* api.js de oluşturduğumuz rendersong fonskyonunu burayada oluştur
export const renderSongs = (songs) => {
    elements.list.innerHTML = "";
    //*şarkıları foreach yapıyoruz.
    songs.forEach((song) => {
        //*div oluşturacağız değişkenle
        const div = document.createElement("div")
        

        //*url ekliyoruz dataset ile
        //*ve song'u preview_url ile bastırıcaz.
        div.dataset.url = song.preview_url;
        //*title alalım
        div.dataset.title = song.name;
        //*resim url alıcaz
        div.dataset.img = song.album.images[1].url;
      
        //*classname veriyoru card için
        div.className = "card";
        //*div içerisine işlem yapıcaz `` ile
        //* img işlem yapıcaz clgden bakıp ${} ile ve title güncellencek
        div.innerHTML = ` 
        <figure>
                        <img src="${song.album.images[1].url}" alt="">
                        <div class="play">
                            <i class="bi bi-play-fill" id="play-btn"></i>
                        </div>
                    </figure>
                    <h4>${song.album.artists[0].name}</h4>
                    <h4>${song.name.slice(0,15) + "..."}</h4>
        `;
        //*bu divi buraya aktarıcaz appendChild ile
        elements.list.appendChild(div);
    });
}

//*yeni değişken yaratıyoruz ok ile
export const renderPlayingInfo = (song) => {
    console.log(song);
    console.log(elements.playingInfo);
    //*index.htmlden elements playinginfo innerhtml içine img den h3 title a kadar alıcaz ve
    //* ${} işlemleri yapıcaz
    //*playingInfo kısmına resmi ve title'ı aktardık
    elements.playingInfo.innerHTML = `
    
    <img src="${song.img}" 
    class="animate" 
    id="info-img" 
    alt=""
    />
    <div>
        <p>Şu an oynatılıyor..</p>
        <h3>${song.title}</h3>
    </div>
    `
}