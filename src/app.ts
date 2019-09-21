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

    do {
        if ( innerContainer.clientHeight < maxHeight ) {
            bool = true;
            innerContainer.innerHTML += "<p>"+dummyContentGenerator.generateParagraphs(1)+"</p>";
        } else {
            bool = false;
        }
    } while (bool);

};
