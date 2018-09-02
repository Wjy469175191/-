function dragStart(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    if(flag)return;
    flag = 1;
    fire(this, 'myaddZIndex');
    this.startX = this.offsetLeft;
    this.startY = this.offsetTop;
    this.mStarX = e.pageX - this.startX;
    this.mStarY = e.pageY - this.startY;
    this.dragMove = dragMove.bind(this);
    this.dragEnd = dragEnd.bind(this);
    on(document, 'mousemove', this.dragMove);
    on(document, 'mouseup', this.dragEnd)
}

function dragMove(e) {
    e = e || window.event;
    this.style.left = e.pageX - this.mStarX + 'px';
    this.style.top = e.pageY - this.mStarY + 'px';
    fire(this, 'myGethit');

}

function dragEnd() {
    off(document, 'mousemove', this.dragMove);
    off(document, 'mouseup', this.dragEnd);
    fire(this, 'myChangePos');
}