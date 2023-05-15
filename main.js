/*Aquí comprobamos que las APIs que vamos a usar funcionan.*/

if (window.File && window.FileReader && window.FileList) {
	console.log("La API es soportada por el navegador actual");

/*Aquí le decimos que solo vamos a querer abrir archivos tipo vídeo.
Por defecto no cogerá el resto.*/

    function handleFileSelect(evt) {
        let file = evt.target.files[0];
        if (!file.type.match('video.*')) {
            return;
        }
        let reader = new FileReader();
        reader.onload = (function (File) {

/*Si todo va bien, cargará la caja contenedera del vídeo en sí.*/

            return function (e) {
                let videoDiv = document.getElementsByClassName('video-container');
                if (videoDiv[0] != null) {
                    videoDiv[0].parentNode.removeChild(videoDiv[0]);
                }
                let div = document.createElement('div');
                div.id = "div-video";
                div.className = "video-container";
                div.innerHTML = '<video controls id="video" class="thumbnail" src="'
				+ e.target.result + '" title="' + escape(File.name) + '"/>';
                
/*Aquí metemos un alert para que se cargue el vídeo y obligamos a 'esperar'.*/

                document.getElementById('video-output').insertBefore(div, null);
				alert("El vídeo puede tardar unos segundos en verse...");

/*Después ya se cargan todos los controles.*/
                
                let botonReproducir = document.getElementById('botonReproducir');
                let botonPausar = document.getElementById('botonPausar');
                let botonSubirvolumen = document.getElementById('botonSubirvolumen');
                let botonBajarvolumen = document.getElementById('botonBajarvolumen');
                
                botonReproducir.addEventListener('click', () => {
                    document.getElementById('video').play();
                });
                
                botonPausar.addEventListener('click', () => {
                    document.getElementById('video').pause();
                })
                
                botonSubirvolumen.addEventListener('click', () => {
                    document.getElementById('video').volume += 0.1;
                })
                
                botonBajarvolumen.addEventListener('click', () => {
                    document.getElementById('video').volume -= 0.1;
                })
                
                document.getElementById('video').addEventListener('canplay', () => {
					document
                        .getElementById('video-output')
                    document
                        .getElementById('video')
                        .style.visibility = "visible";
                    botonReproducir
                        .style.visibility = "visible";
                    botonPausar
                        .style.visibility = "visible";
                    botonSubirvolumen
                        .style.visibility = "visible";
                    botonBajarvolumen 
                        .style.visibility = "visible";
                });
            }
        })(file);
        reader
            .readAsDataURL(file);
    }
    document
        .getElementById('file')
        .addEventListener('change', handleFileSelect, false);

/*Lo anterior era si las APIs que necesitamos están cargadas y funcionan.
Si no, saldrá el siguiente mensaje.*/

} else {
    alert("La API no es soportada en el navegador actual");
	console.log("La API no es soportada en el navegador actual");
}