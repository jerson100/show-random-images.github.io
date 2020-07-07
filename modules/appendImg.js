class Img{
    
    constructor(path, dimension = {w,h,x,y}){
        this.path = path;
        this.dimension = dimension;
        this.createImage();
    }

    createImage = () => {
        const img = document.createElement("img");
        img.src = this.path;
        this.element = img;
    }

}

export class Panel{

    constructor(paths = [], parentContainer, imagesCount = 300, time = 2000){
        this.elements = [];
        this.paths = paths;
        this.imagesCount = imagesCount;
        this.time = time;
        this.parentContainer = document.querySelector(parentContainer);
    }

    printImg = () => {

        return new Promise(resolve=>{

            const img = this.generateImage();

            this.elements.push(img);

            this.parentContainer.appendChild(img.element);

            setTimeout(()=>{

                img.element.style.animation = '';
                img.element.style.boxShadow = '';

                resolve(img);

            },this.time);

        });

    }

    generateImages = async () => {

        for (let index = 1; index <= this.imagesCount; index++) {
            
            await this.printImg();

        }

        await this.createFinalMessage("No sabía que hacer, jaja");

    }

    createFinalMessage = async function(message){

        const letters = message.split("");
        
        const containerMessage = document.createElement("div");

        const messageContent = document.createElement("div");

        containerMessage.classList.add("message");

        messageContent.classList.add("message__content");

        containerMessage.appendChild(messageContent);

        let ii = 0;

        letters.forEach(letter => {

            const span = document.createElement("span");

            span.classList.add("message__letter")

            span.textContent = letter;

            span.style.opacity = "0";

            span.style.transform = `translate(${this.generateNumber(-500,1000)}px,${this.generateNumber(-500,1000)}px)`;

            messageContent.appendChild(span);
            
            ii++;

        });

        this.parentContainer.appendChild(containerMessage);

        await this.movMessage(messageContent, 800);

        const children = Array.from(messageContent.children);
        
        for(let i = 0; i < children.length; i++){

            if(children[i].textContent != ''){

                await this.visibleLetter(children[i],200, i%2==0?1:-1);

            }

        }

        for(let i = 0; i < children.length; i++){

            children[i].style.textShadow = `0 0 10px red`;

        }

    }

    movMessage = async (messageConten,time) => {
        return new Promise(resolve=>{
            messageConten.style.animation = `movMessage 1 ${time}ms linear`;
            setTimeout(()=>{
                messageConten.style.animation = '';
                resolve();
            },time);
        });
    };

    visibleLetter = async (span,time, i) => {
        return new Promise(resolve=>{
            //span.style.opacity = "1";
            /*span.style.animation = `fromTopToBottom 1 ${time}ms linear`;*/
            setTimeout(()=>{
                span.style.transform = `translate(0,0)`;
                span.style.opacity = "1";
                //span.style.animation = '';
                resolve();
            },time);
        });
    };

    generateImage = () => {

        const dimensionsParent = this.parentContainer.getBoundingClientRect();

        const w = this.generateNumber(10,200);
        const x = this.generateNumber(0,dimensionsParent.width);
        const y = this.generateNumber(0,dimensionsParent.height);

        const path = this.paths[this.generateNumber(0,this.paths.length - 1)];

        const newImg = new Img(path,{
            w,
            h:w,
            x,
            y
        });

        newImg.element.style.borderRadius = "50%";
        newImg.element.style.position = 'absolute'; 
        newImg.element.style.left = `${x}px`;
        newImg.element.style.top = `${y}px`;
        newImg.element.style.width = `${w}px`;
        newImg.element.style.height = `${w}px`;
        newImg.element.style.animation = `animateImg 1 ${this.time}ms linear`;
        newImg.element.style.objectFit = "cover";
        newImg.element.style.objectPosition = "center"; 
        newImg.element.style.boxShadow = `0 0 200px 280px rgb(${this.generateNumber(0,255)},
                                                            ${this.generateNumber(0,255)},
                                                            ${this.generateNumber(0,255)})`;

        return newImg;

    }

    generateNumber = (min,max) => Math.trunc(Math.random() * (max - min + 1) + min);

}