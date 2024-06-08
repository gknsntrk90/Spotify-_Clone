import { renderSearchMusic, renderSongs } from "./ui.js";

//* Inputa girilen veriye göre aratacağımız apinin keyi
const options = { //*rapidapiden çektiğiz link
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'fbff61640amsh3a82a794ba39b76p19ec14jsnc12adb5a35bf',
		'x-rapidapi-host': 'shazam.p.rapidapi.com'
	}
};


//*Popüler müzikleri getireceğimiz api key.
const optionsTop = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'fbff61640amsh3a82a794ba39b76p19ec14jsnc12adb5a35bf',
		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
	}
};


//*bir class aç ve isim ver
//* içine kurucu metodomuzu tanımlayalım constructor(){}
export class API {
    constructor(){
        //*boş bir dizi oluşturuyoruz
        this.songs = [];
    }




//*INPUT'a girilen veriye göre API'den cevabı getirir
    //*this songa istek atmak için bir metot oluşturalım
    //*parametre olarak inputa girilen değeri veriyoruz
   async searchMusic(query){
    //*TRY-CATCH oluşturuyoruz
    try {
        //*main.js'den gönderilen api.searchMusic(query) değerine api'den istek atıyoruz
        //*fetch atıyoruz
        const res = await fetch(`https://shazam.p.rapidapi.com/search?term=${query}=&locale=tr-TR&limit=5`,
        options
    );
    //*data adında değişken yarat ve await ile res i jsonla
    const data = await res.json();
    //* yeni bir değişken açıyoruz track ve hitleri almak için
    let newData = data.tracks.hits; //* data içinde ki trackslerin içinde ki hitleri al
    //*newData'yı map'liyoruz yani döndürüyoruz song ile ve tekrardan newData ya aktarıyoruz
    newData = newData.map((song) => ({...song.track}));
    this.songs = newData;
    


    //*aratılan şarkıları ekrana bastıracağımız bir fonksyon yapıyoruz
    //* bir değişken açıyoruz herhangi bir isimde ve this.songs gönderiyoruz içine
    //* ekrana api'den gelen herbir şarkıyı yazdıracağımız metot!
    renderSearchMusic(this.songs);
    } catch (error) {
        
    }
        
    }

    //* Popüler müzikleri getireceğimiz müzikleri burada try-catch ile oluşturalım
    async topPopular(){
        //*apirapid sitesinden api linkimizi alıyoruz buraya
        const url = 'https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry';

        try {
            //*fetch bizden url istiyor onu girip apiden aldığımız optionsTop'ı giricez
            //* ve değişkenle birleştiricez ve asenkron işlem olduğu için await ile bekleyecek
            const response = await fetch(url,optionsTop)
            //*json a çevir ve değişkene tanımla await ile
           const result = await response.json()
           //*result'ı yukarıdaki this.songs a göndericez
           this.songs = result.tracks;
           //*fonksyon çalıştıracağız ve içine this.songs'u göndericez
           renderSongs(this.songs); //*bu fonksyonu ui.jsa oluştur
        } catch (error) {
           console.log(error) 
        }
    }
    
}