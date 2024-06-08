//* İMPORT
import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API()
//* Form gönderildiği anda api'ye istek at gelen cevabı ekrana yazdır
//*elemnts.form'a olay izleyicisi ekleyeceğiz yani gönderme submit olayı
//*yapı gönderildiği an yanında fonsyon çalıştıralım
elements.form.addEventListener("submit", (e) => {
    e.preventDefault() //*sayfanın yenilenmesini engeller
    //*değişken yaratıyoruz ve event ile targetla inputun değerine ulaşıyoruz
    const query = e.target[0].value;

    //*inputa girilen değer boş ise fonksyonu burada return ile durdur
    //*!query yoksa anlamına gelir
    if(!query){
        alert("Lütfen bir müzik ismi giriniz");
        return;
    }

//*fonksyon tanımla ismi fark etmez
updateTitle(`${query} için sonuçlar`);
    //*api classı içerisinde bulunan searchMusiic metodunuz çalıştıyoruz ve (query) değerini gönderiyorz
    api.searchMusic(query);

});
//*sayfa yüklendiliği anda api'ye istek atıp popüpler müzikleri getir.
document.addEventListener("DOMContentLoaded", async () => {
    await api.topPopular();
})

//*playMusic yapısı yapıcaz müzik çalışsın diye ve url veriyoruz parametresine
const playMusic = (url) => {
    //*müziğin url'ni html'e aktardık
    elements.audioSource.src=url;
    //*audio elementinin müziği yüklenmesini sağladık
    elements.audio.load();
    //* audio elementinin oynatmasını sağladık.
    elements.audio.play();
}

//* Listede tıklamalarda çalışır
const handlecClick = (e) => {
    console.log("tıklanıldı")
    console.log(e)
    if(e.target.id === "play-btn"){
        const parent = e.target.closest(".card"); //*parentElement yerine kullanırız en yakın ebeveyne götürür
        renderPlayingInfo(parent.dataset);
        //*Müziği çalar
        playMusic(parent.dataset.url);
    };
};



//* Liste alanındaki tıklamaları izler
document.addEventListener("click", handlecClick);


//*fotoğrafı döndürür
//*ok döngüsü hazırlıyoruz audio işlevi için değişkenle
const animatePhoto = () =>{
    //*değişken tanıtıp querySelector ile info img classını çağırıyoruz
   const img = document.querySelector(".info img")
    
   img.className = "animate";
};
//*img etiketine eklediğimiz animate classını kaldırır
const stopAnimation = () => {
    img.classList.remove("animate");
}

//*müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
//*dudurmak için stopAnimation adında bir değişken tanımla
elements.audio.addEventListener("pause", stopAnimation);