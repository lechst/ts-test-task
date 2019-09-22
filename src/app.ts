import Msg from './Message';
import { LoremIpsum } from "lorem-ipsum";

window.onload = function(){

    const dummyContentGenerator = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });


    let o = new Msg();
    o.show();


    let mainContainer = document.getElementById("container");
    const maxHeight = mainContainer.clientHeight;

    let innerContainer = document.getElementById("content");

    let bool = false;
    let check = true;


    let video = document.createElement("video");
    video.src = "https://cdn.yoc.com/ad/demo/airbnb.mp4";
    video.id = "video";
    video.setAttribute("controls","controls");
    video.setAttribute("preload", "auto");
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");

    let videoTopPosition;
    let videoOffsetHeight;
    let videoBottomPosition;


    do {
        if ( innerContainer.clientHeight < maxHeight ) {
            bool = true;
            innerContainer.innerHTML += "<p>"+dummyContentGenerator.generateParagraphs(1)+"</p>";

            if( ( innerContainer.clientHeight > maxHeight/2 ) && check ){
                innerContainer.appendChild( video );
                check = false;

                videoTopPosition = video.offsetTop;
                videoOffsetHeight = video.offsetHeight;
                videoBottomPosition = videoTopPosition + videoOffsetHeight;

            }

        } else {
            bool = false;
        }
    } while (bool);


    let videoVisibleFraction = 0.5;

    function videoScrollVisibility() {

        let videoVisibleHeight = Math.max(0, Math.min(videoOffsetHeight, window.pageYOffset + window.innerHeight - videoTopPosition, videoBottomPosition - window.pageYOffset));

        let videoVisibleHeightFraction = videoVisibleHeight / videoOffsetHeight;

        if (videoVisibleHeightFraction > videoVisibleFraction) {
            document.getElementsByTagName("video")[0].play();
        } else {
            document.getElementsByTagName("video")[0].pause();
        }

        console.log(videoVisibleHeightFraction);

    }

    window.addEventListener('scroll', videoScrollVisibility, false);

};
