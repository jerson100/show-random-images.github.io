import { Panel } from "././modules/appendImg.js";

(()=>{
    document.addEventListener('DOMContentLoaded',e=>{
        
        const paths = [];

        for(let i = 1; i <= 21; i++){

            paths.push(`imgs/yop${i}.jpg`);

        }

        const panel = new Panel(paths,'body',150,150);

        panel.generateImages();

    });
})();