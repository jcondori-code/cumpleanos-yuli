
/* ============================================================
   NAVEGACIÓN ENTRE ESCENAS
============================================================ */

const scenes = document.querySelectorAll(".scene");

function goToScene(number) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const nextScene =
        document.getElementById(`scene${number}`);

    if (nextScene) {

        setTimeout(() => {
            nextScene.classList.add("active");
        }, 100);
    }
}


/* ============================================================
   PARTÍCULAS
============================================================ */

const particlesContainer =
    document.getElementById("particles");

for (let i = 0; i < 70; i++) {

    const particle =
        document.createElement("div");

    particle.className = "particle";

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.animationDuration =
        `${5 + Math.random() * 10}s`;

    particle.style.animationDelay =
        `${Math.random() * 8}s`;

    const size =
        2 + Math.random() * 3;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particlesContainer.appendChild(particle);
}


/* ============================================================
   MÚSICA
============================================================ */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;


/*
    La música comienza cuando la persona
    pulsa "Entrar a la sorpresa".
*/

function startMusic() {

    if (!music) return;

    music.volume = 0;

    const playPromise =
        music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "🔊";

                fadeInMusic();

            })
            .catch(() => {

                console.log(
                    "El navegador bloqueó la reproducción automática."
                );

            });
    }
}


/*
    Entrada suave de la música
*/

function fadeInMusic() {

    let volume = 0;

    const interval =
        setInterval(() => {

            volume += 0.02;

            if (volume >= 0.35) {

                volume = 0.35;

                clearInterval(interval);
            }

            music.volume = volume;

        }, 100);
}


/*
    Botón para silenciar / activar
*/

musicButton.addEventListener("click", () => {

    if (!music) return;

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.textContent = "🔇";

    } else {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "🔊";

            })
            .catch(() => {});

    }
});


/* ============================================================
   ESCENA 1 → ESCENA 2
============================================================ */

const startButton =
    document.getElementById("startButton");

startButton.addEventListener("click", () => {

    /*
        Este toque del usuario permite
        iniciar la música en teléfonos.
    */

    startMusic();

    goToScene(2);
});


/* ============================================================
   ESCENA 2 — SOBRE
============================================================ */

const envelope =
    document.getElementById("envelope");

const openEnvelope =
    document.getElementById("openEnvelope");

openEnvelope.addEventListener("click", () => {

    envelope.classList.add("open");

    openEnvelope.style.opacity = "0";
    openEnvelope.style.pointerEvents = "none";

    setTimeout(() => {

        goToScene(3);

        startTyping();

    }, 1700);
});


/* ============================================================
   ESCENA 3 — TEXTO ESCRITO
============================================================ */

const typingText =
    document.getElementById("typingText");

const continueButton =
    document.getElementById("continueButton");

const message =
    "Algo que a veces se olvida con el tiempo,y es que eres especial, Yulissa,de esas personas que llegan sin ruido y se quedan en el pensamiento.Tienes una ternura que no se aprende,una sonrisa que parece pintada a mano,y unos ojos donde cualquiera se pierde sin darse cuenta No sé si algún día te lo diga de frente,ni si el momento llegue o no,pero quería que supieras, de repente,que hay alguien que te aprecia de corazón.No es un secreto grande ni una gran verdad,solo es un recordatorio sincero:eres especial, Yulissa, de verdad,y yo… solo quería que lo supieras primero";

let typingIndex = 0;

function startTyping() {

    typingText.textContent = "";

    typingIndex = 0;

    continueButton.classList.add("hidden");

    typeCharacter();
}

function typeCharacter() {

    if (typingIndex < message.length) {

        typingText.textContent +=
            message.charAt(typingIndex);

        typingIndex++;

        setTimeout(
            typeCharacter,
            45
        );

    } else {

        setTimeout(() => {

            continueButton.classList.remove(
                "hidden"
            );

            continueButton.style.animation =
                "fadeUp 1s ease both";

        }, 700);
    }
}


/* ============================================================
   ESCENA 3 → ESCENA 4
============================================================ */

continueButton.addEventListener("click", () => {

    goToScene(4);

});


/* ============================================================
   ESCENA 4 → ESCENA 5
============================================================ */

const letterButton =
    document.getElementById("letterButton");

letterButton.addEventListener("click", () => {

    goToScene(5);

});


/* ============================================================
   ESCENA 5 — CARTA LARGA
============================================================ */

const handwrittenText =
    document.getElementById("handwrittenText");

const paperSignature =
    document.getElementById("paperSignature");

const scene5 =
    document.getElementById("scene5");


/*
    AQUÍ PUEDES CAMBIAR EL MENSAJE
    POR TU CARTA REAL.

    Cada elemento del array es un párrafo.
*/

const letterParagraphs = [

    "Y es recordarte cuando Te vi en ese colectivo, sin que me vieras. Solo podía mirarte a ti, y tu sonrisa se me quedó grabada. Pensé que no te volvería a ver, pero el destino te puso en mi camino otra vez. Y desde entonces, no he dejado de querer conocerte. .",

    "Había algo en ti que me llamaba la atención sin conocerte no se que era, paso el tiempo y te volvi a ver y creeme desde esa ves no podia olvidarte, pense que era algo especial, pero para estas cosas ni yo lo puedo explicar. Sentia que te conocia de toda la vida, hasta el recuerdo lo tengo perfectamente de ti ",

    "Y finalmente te conoci con un poco de miedo y tal ves un poco introvertido, pero lo volveria a decir, algo de ti me atraia, tal ves solo soy yo el que lo sienta, pero cuando ya te conoci perfectamente, eres la chica mas cool que conoci, eres de esas chicas que aparecen cada 100 años con sus metas claras y tan divertida que iliminarias cualquier sitio con tu chispa, de verdad eres demasiado especial, en tan poco tiempo descubri que fascinante persona eres y te lo decia siempre, espero no a verte molestado con todo esto. Solo pasaba a decirte toda la verdad y lo brillante que eres, por que aun las  palabras sobrarian para escribirte ;) "

];  


let letterWriting = false;

let letterTimer = null;


/*
    Escribir carta
*/

async function writeLetter() {

    if (letterWriting) return;

    letterWriting = true;

    handwrittenText.innerHTML = "";

    paperSignature.classList.remove("show");


    for (
        let p = 0;
        p < letterParagraphs.length;
        p++
    ) {

        const paragraph =
            document.createElement("p");

        handwrittenText.appendChild(
            paragraph
        );

        const text =
            letterParagraphs[p];


        for (
            let i = 0;
            i < text.length;
            i++
        ) {

            paragraph.textContent +=
                text.charAt(i);

            await new Promise(resolve =>
                setTimeout(resolve, 35)
            );
        }


        await new Promise(resolve =>
            setTimeout(resolve, 700)
        );
    }


    setTimeout(() => {

        paperSignature.classList.add("show");

        letterWriting = false;

    }, 400);
}


/*
    Detectar cuando aparece la escena 5
*/

const sceneObserver =
    new MutationObserver(() => {

        if (
            scene5.classList.contains("active")
        ) {

            clearTimeout(letterTimer);

            letterTimer = setTimeout(() => {

                writeLetter();

            }, 1800);
        }
    });


sceneObserver.observe(
    scene5,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);


/* ============================================================
   ESCENA 5 → ESCENA 6
============================================================ */

const finalButton =
    document.getElementById("finalButton");

finalButton.addEventListener("click", () => {

    goToScene(6);

    setTimeout(() => {

        launchConfetti();

    }, 1000);

});


/* ============================================================
   CONFETI
============================================================ */

const confettiContainer =
    document.getElementById("confetti");

function launchConfetti() {

    confettiContainer.innerHTML = "";

    for (let i = 0; i < 140; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";


        const colors = [
            "#ff8fab",
            "#ffd166",
            "#cdb4db",
            "#a2d2ff",
            "#bde0fe",
            "#ffc8dd",
            "#ffffff"
        ];

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.animationDuration =
            `${2.5 + Math.random() * 3}s`;


        piece.style.animationDelay =
            `${Math.random() * 1.5}s`;


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        confettiContainer.appendChild(piece);
    }
}


/* ============================================================
   REINICIAR
============================================================ */

const restartButton =
    document.getElementById("restartButton");

restartButton.addEventListener("click", () => {

    /*
        Limpiar confeti
    */

    confettiContainer.innerHTML = "";


    /*
        Reiniciar sobre
    */

    envelope.classList.remove("open");

    openEnvelope.style.opacity = "1";
    openEnvelope.style.pointerEvents = "auto";


    /*
        Reiniciar carta pequeña
    */

    continueButton.classList.add("hidden");

    typingText.textContent = "";


    /*
        Reiniciar carta grande
    */

    clearTimeout(letterTimer);

    handwrittenText.innerHTML = "";

    paperSignature.classList.remove("show");

    letterWriting = false;


    /*
        Volver al comienzo
    */

    goToScene(1);

});


/* ============================================================
   ESCAPE — VOLVER AL INICIO
============================================================ */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            goToScene(1);

        }

    }
);

/* ============================================================
   🕷️ LLUVIA DE ARAÑAS CON TELARAÑA
============================================================ */

const webCanvas = document.getElementById("webCanvas");
const webCtx = webCanvas.getContext("2d");

function resizeWebCanvas() {
    webCanvas.width = window.innerWidth;
    webCanvas.height = window.innerHeight;
}
resizeWebCanvas();
window.addEventListener("resize", resizeWebCanvas);

const SPIDER_COUNT = 14;
const spiders = [];

function createSpider() {
    return {
        x: Math.random() * webCanvas.width,
        y: -Math.random() * webCanvas.height,
        speed: 0.6 + Math.random() * 1.4,
        size: 5 + Math.random() * 6,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02
    };
}

for (let i = 0; i < SPIDER_COUNT; i++) {
    spiders.push(createSpider());
}

function createSpider() {
    return {
        x: Math.random() * webCanvas.width,
        y: -Math.random() * webCanvas.height,
        speed: 0.6 + Math.random() * 1.4,
        size: 9 + Math.random() * 10,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02
    };
}

function drawSpider(spider) {
    const { x, y, size } = spider;

    /* hilo de seda */
    webCtx.beginPath();
    webCtx.moveTo(x, 0);
    webCtx.lineTo(x, y);
    webCtx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    webCtx.lineWidth = 1;
    webCtx.stroke();

    webCtx.save();
    webCtx.translate(x, y);

    webCtx.shadowColor = "rgba(255, 255, 255, 0.55)";
    webCtx.shadowBlur = 5;

    webCtx.strokeStyle = "#f5f5f5";
    webCtx.fillStyle = "#f5f5f5";
    webCtx.lineWidth = 1.5;
    webCtx.lineCap = "round";

    /* -------- PATAS: 4 por lado, con "rodilla" -------- */
    const legOriginY = size * 0.15;
    const legSpreads = [-size * 0.9, -size * 0.3, size * 0.3, size * 0.9];

    [-1, 1].forEach(dir => {
        legSpreads.forEach(spread => {
            const kneeX = dir * size * 1.1;
            const kneeY = legOriginY + spread * 0.35;
            const footX = dir * size * 1.9;
            const footY = legOriginY + spread * 0.9;

            webCtx.beginPath();
            webCtx.moveTo(0, legOriginY);
            webCtx.quadraticCurveTo(kneeX, kneeY, footX, footY);
            webCtx.stroke();
        });
    });

    /* -------- PEDIPALPOS (patitas cortas junto a la cabeza) -------- */
    [-1, 1].forEach(dir => {
        webCtx.beginPath();
        webCtx.moveTo(0, -size * 0.25);
        webCtx.quadraticCurveTo(dir * size * 0.5, -size * 0.55, dir * size * 0.75, -size * 0.35);
        webCtx.stroke();
    });

    /* -------- ABDOMEN -------- */
    webCtx.beginPath();
    webCtx.ellipse(0, size * 0.55, size * 0.55, size * 0.85, 0, 0, Math.PI * 2);
    webCtx.fill();

    /* -------- CEFALOTÓRAX (cabeza) -------- */
    webCtx.beginPath();
    webCtx.arc(0, -size * 0.1, size * 0.42, 0, Math.PI * 2);
    webCtx.fill();

    webCtx.shadowBlur = 0;

    /* -------- OJOS ROJOS -------- */
    webCtx.beginPath();
    webCtx.fillStyle = "#ff1e4d";
    webCtx.arc(-size * 0.14, -size * 0.15, size * 0.1, 0, Math.PI * 2);
    webCtx.arc(size * 0.14, -size * 0.15, size * 0.1, 0, Math.PI * 2);
    webCtx.fill();

    webCtx.restore();
}

function renderWeb() {
    webCtx.clearRect(0, 0, webCanvas.width, webCanvas.height);

    spiders.forEach(spider => {
        spider.y += spider.speed;
        spider.sway += spider.swaySpeed;
        spider.x += Math.sin(spider.sway) * 0.4;

        if (spider.y > webCanvas.height + 20) {
            spider.y = -Math.random() * 200;
            spider.x = Math.random() * webCanvas.width;
            spider.speed = 0.6 + Math.random() * 1.4;
        }

        drawSpider(spider);
    });

    requestAnimationFrame(renderWeb);
}
renderWeb();