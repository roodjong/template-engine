class ImgWrapper {
    constructor(imgURL, blendingmode = "source-over") {
        this.blendingmode = blendingmode;

        this.img = new Image();
        this.img.src = imgURL;
    }

    draw(context) {
        let oldSetting = context.globalCompositeOperation;
        context.globalCompositeOperation = this.blendingmode;
        context.drawImage(this.img, 0, 0, this.img.width, this.img.height);
        context.globalCompositeOperation = oldSetting;
    }
}