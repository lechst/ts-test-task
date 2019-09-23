import { LoremIpsum } from "lorem-ipsum";

window.onload = function(){


    // create dummy content generator

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


    // create video and set its options

    let video = document.createElement("video");
    video.src = "https://cdn.yoc.com/ad/demo/airbnb.mp4";
    video.id = "video";
    video.setAttribute("controls","controls");
    video.setAttribute("preload", "auto");
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");


    // main container for website's text and video
    const mainContainer = document.getElementById("container");
    const maxHeight = mainContainer.clientHeight;

    // div for generated dummy content and video
    const innerContainer = document.getElementById("content");

    // check if the inner container height doesn't exceed the main container height
    let checkInnerContainerHeight = false;

    // check if the inner container height exceeds half of the main container height
    let checkVideoPosition = true;

    // video's position parameters
    let videoTopPosition;
    let videoOffsetHeight;
    let videoBottomPosition;


    // generate dummy content and append video in the middle

    do {
        if ( innerContainer.clientHeight < maxHeight ) {

            checkInnerContainerHeight = true;

            // use dummy content generator

            innerContainer.innerHTML += "<p>"+dummyContentGenerator.generateParagraphs(1)+"</p>";

            // append video in the middle

            if( ( innerContainer.clientHeight > maxHeight/2 ) && checkVideoPosition ){
                innerContainer.appendChild( video );
                checkVideoPosition = false;

                videoTopPosition = video.offsetTop;
                videoOffsetHeight = video.offsetHeight;
                videoBottomPosition = videoTopPosition + videoOffsetHeight;

            }

        } else {
            checkInnerContainerHeight = false;
        }
    } while ( checkInnerContainerHeight );


    // check if some fraction of the video is in the viewport and start/stop playing accordingly

    // what fraction of the video should be in the viewport in order to start playing it
    const videoVisibleFraction = 0.5;
    // video started playing
    let videoPlayedCheck = false;
    // video stopped playing
    let videoPausedCheck = true;
    // video current time once it started playing again
    let videoPlayTime = 0;
    // checks if viewability standards message was already displayed
    let videoViewabilityMessage = false;

    function videoScrollVisibility() {

        let videoVisibleHeight = Math.max(0, Math.min(videoOffsetHeight, window.pageYOffset + window.innerHeight - videoTopPosition, videoBottomPosition - window.pageYOffset));

        let videoVisibleHeightFraction = videoVisibleHeight / videoOffsetHeight;

        if ( videoVisibleHeightFraction > videoVisibleFraction && videoPausedCheck ) {
            document.getElementsByTagName("video")[0].play();
            videoPlayedCheck = true;
            videoPausedCheck = false;
            videoPlayTime = document.getElementsByTagName("video")[0].currentTime;
        } else if ( videoVisibleHeightFraction <= videoVisibleFraction && videoPlayedCheck ) {
            document.getElementsByTagName("video")[0].pause();
            videoPlayedCheck = false;
            videoPausedCheck = true;
        }

    }

    window.addEventListener('scroll', videoScrollVisibility, false);


    // check if the video has started or played through 25%, 50%, 75% and 100%

    let videoDuration0 = false;
    let videoDuration25 = false;
    let videoDuration50 = false;
    let videoDuration75 = false;
    let videoDuration100 = false;

    document.getElementsByTagName("video")[0].addEventListener("timeupdate", function(){

        if( this.currentTime >= 0 && !videoDuration0 ) {
            console.log("Video has started.");
            videoDuration0 = true;
        }
        if( this.currentTime >= 0.25*video.duration && !videoDuration25 ) {
            console.log("Video has played through 25% of the full video length.");
            videoDuration25 = true;
        }
        if( this.currentTime >= 0.50*video.duration && !videoDuration50 ) {
            console.log("Video has played through 50% of the full video length.");
            videoDuration50 = true;
        }
        if( this.currentTime >= 0.75*video.duration && !videoDuration75 ) {
            console.log("Video has played through 75% of the full video length.");
            videoDuration75 = true;
        }
        if( this.currentTime >= video.duration && !videoDuration100 ) {
            console.log("Video has played through 100% of the full video length.");
            videoDuration100 = true;
        }

        // check if 50 percent of a player is in view for at least two seconds

        if( !videoViewabilityMessage ){

            if( this.currentTime - videoPlayTime > 2 ){
                console.log("IAB/MRC viewability standards were met: 50 percent of a player was in view for at least two seconds!");
                videoViewabilityMessage = true;
            }

        }

    });

};
