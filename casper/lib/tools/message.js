import { config } from "../config.js";

class Messages {
  constructor(element) {
    this.elementName = element;
    this.element = $(`#${element}`);
  }

  showToast = (text, timeout = 2500) => {
    this.element.html(text);
    this.element.removeClass("hidden");
    window.setTimeout(() => {
      this.element.addClass("hidden");
    }, timeout);
  };
}

export const message = new Messages(config.ui.toastId);
