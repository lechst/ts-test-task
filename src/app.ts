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

    }

    window.addEventListener('scroll', videoScrollVisibility, false);


    let videoDuration0 = false;
    let videoDuration25 = false;
    let videoDuration50 = false;
    let videoDuration75 = false;
    let videoDuration100 = false;

    document.getElementsByTagName("video")[0].addEventListener("timeupdate", function(){

        if(this.currentTime >= 0 && !videoDuration0) {
            console.log("Video has started.");
            videoDuration0 = true;
        }
        if(this.currentTime >= 0.25*video.duration && !videoDuration25) {
            console.log("Video has played through 25% of the full video length.");
            videoDuration25 = true;
        }
        if(this.currentTime >= 0.50*video.duration && !videoDuration50) {
            console.log("Video has played through 50% of the full video length.");
            videoDuration50 = true;
        }
        if(this.currentTime >= 0.75*video.duration && !videoDuration75) {
            console.log("Video has played through 75% of the full video length.");
            videoDuration75 = true;
        }
        if(this.currentTime >= video.duration && !videoDuration100) {
            console.log("Video has played through 100% of the full video length.");
            videoDuration100 = true;
        }
    });

};
