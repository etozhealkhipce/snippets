interface Window {
  Tooltip: any;
}

(function () {
  class Tooltip {
    el: HTMLElement;

    constructor() {
      this.el = document.createElement("div");
      this.el.style.position = "absolute";

      this.el.classList.add(this.name);
      document.body.appendChild(this.el);

      this.onHide = this.onHide.bind(this);
    }

    get name() {
      return "tooltip";
    }

    get indent() {
      return 5;
    }

    delegate(
      eventName: string,
      element: HTMLElement,
      cssSelector: string,
      callback: Function
    ) {
      const fn = (event) => {
        if (!event.target.matches(cssSelector)) {
          return;
        }

        const domRect = event.target.getBoundingClientRect();

        callback(event, domRect);
      };

      element.addEventListener(eventName, fn);

      return this;
    }

    onShow = (
      event,
      domRect: {
        top: number;
        bottom: number;
      }
    ) => {
      const { bottom } = domRect;
      const text = event.target.dataset.tooltip;
      this.el.classList.add("tooltip_active");
      if (bottom < 100) {
        this.el.style.top = domRect.top + 20 + "px";
      } else {
        this.el.style.top = domRect.top - 40 + "px";
      }
      this.el.textContent = text;
    };

    onHide() {
      this.el.classList.remove("tooltip_active");
    }

    attach(root: HTMLElement) {
      this.delegate("mouseover", root, "[data-tooltip]", this.onShow);
      this.delegate("mouseout", root, "[data-tooltip]", this.onHide);
    }

    detach() {
      //Реализуйте этот метод
    }
  }

  window.Tooltip = Tooltip;
})();

const tooltip = new window.Tooltip();
tooltip.attach(document.body);
