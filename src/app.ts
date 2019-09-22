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
    video.setAttribute("controls","controls");

    do {
        if ( innerContainer.clientHeight < maxHeight ) {
            bool = true;
            innerContainer.innerHTML += "<p>"+dummyContentGenerator.generateParagraphs(1)+"</p>";

            if( ( innerContainer.clientHeight > maxHeight/2 ) && check ){
                innerContainer.appendChild( video );
                check = false;
            }

        } else {
            bool = false;
        }
    } while (bool);

};
