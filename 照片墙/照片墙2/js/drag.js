    function dragDown(e) {
        e = e || window.event;
        e.preventDefault();
        if(flag)return;
        flag = 1;
        fire(this, 'mySetZIndex');

        this.startX = this.offsetLeft;
        this.startY = this.offsetTop;
        this.mx = e.pageX - this.startX;
        this.my = e.pageY - this.startY;
        this.dragMove = dragMove.bind(this);
        this.dragEnd = dragEnd.bind(this);
        on(document, 'mousemove', this.dragMove);
        on(document, 'mouseup', this.dragEnd);

    }
    function dragMove(e) {
        e = e || window.event;
        this.style.left = e.pageX - this.mx + 'px';
        this.style.top = e.pageY - this.my + 'px';
        fire(this, 'myInHit');
    }

    function dragEnd() {
        off(document, 'mousemove', this.dragMove);
        off(document, 'mouseup', this.dragEnd);
        fire(this, 'myChangePos');
    }