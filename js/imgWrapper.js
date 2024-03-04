class ImgWrapper extends abstractLayer{
    constructor(imgURL, blendingmode = "source-over") {
        super();
        this.blendingmode = blendingmode;
        
        this.position = {x: 0, y: 0};
        this.img = new Image();
        this.img.addEventListener("load", drawTemplate)
        let temp = this.img;
        this.img.src = imgURL;
    }

    getPosition(){
        return this.position;
    }
    getVisibleSize(){
        return {x:this.position.x, y:this.position.y, width: this.img.width, height: this.img.height};
    }
    setPositionInternal(x, y){
        this.position = {x: x, y: y};
    }

    draw(context) {
        let oldSetting = context.globalCompositeOperation;
        context.globalCompositeOperation = this.blendingmode;
        context.drawImage(this.img, this.position.x, this.position.y, this.img.width, this.img.height);
        context.globalCompositeOperation = oldSetting;
    }
}