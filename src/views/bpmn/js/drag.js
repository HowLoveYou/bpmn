class Drags {
  constructor(el) {
    this.el = el;
    this.isDrag = false;
    this.dis = {};
    this.el.addEventListener('mousedown', this.start);
    document.addEventListener('mousemove', this.move);
    document.addEventListener('mouseup', this.end);
  }
  start = ev => {
    let {
      el
    } = this;
    this.isDrag = true;

    //这个disx每次都是一个固定值，包括拖动元素父元素的左、上边距离以及鼠标距离拖动元素的左、                                                  //    上边的距离
    this.dis = {
      x: ev.pageX - el.offsetLeft,
      y: ev.pageY - el.offsetTop
    };
    console.log(this.dis);
  };
  move = ev => {
    if (!this.isDrag) return false;
    let {
      el
    } = this;
    let left = ev.pageX - this.dis.x;
    let top = ev.pageY - this.dis.y;

    //边界
    left = left <= 0 ? 0 : left;
    left =
      left + el.offsetWidth > window.innerWidth ?
      window.innerWidth - el.offsetWidth :
      left;

    top = top <= 0 ? 0 : top;
    top =
      top + el.offsetHeight > window.innerHeight ?
      window.innerHeight - el.offsetHeight :
      top;

    el.style.left = left + 'px';
    el.style.top = top + 'px';
  };
  end = () => {
    if (!this.isDrag) return false;
    this.isDrag = false;
  };
}
export {
  Drags
}